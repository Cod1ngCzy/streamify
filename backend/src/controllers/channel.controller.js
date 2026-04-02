import Channel from "../models/channel.model.js";

export const createChannel = async (req, res) => {
  const { name, type, members = [] } = req.body;
  const userId = req.user.id;

  try {
    if (!name || !type) return res.status(400).json({ message: "Channel Name and Channel Type is required" });

    const uniqueMembers = [...new Set(members)].filter(
        id => id !== userId
    );

    const formattedMembers = uniqueMembers
      .map(id => ({
        user: id,
        role: "member",
      }));

    const channel = await Channel.create({
      name,
      type,
      members: [
        { user: userId, role: "owner" },
        ...formattedMembers,
      ],
    });

    res.status(201).json(channel);

  } catch (error) {
    console.log("Error creating channel:", error.message || error);
    res.status(500).json({ message: "Error creating channel" });
  }
};

export const addMember = async (req,res) => {
    const [channelId] = req.params;
    const {members = []} = req.body;
    const currentUserId = req.user.id;
    try{
        // Check Permissions
        const channel = await Channel.findOne({
            _id: channelId,
            members: {
                $elemMatch:{
                    user: currentUserId,
                    role: {$in: ["owner", "admin"]},
                },
            },
        });

        if (!channel) return res.status(403).json({message: "Not Authorized"});

        const uniqueIds = [...new Set(members)].filter(
            id => id !== currentUserId
        );

        if (uniqueIds.length === 0) return res.status(400).json({message: "No Valid Members To Add"});

            // ➕ Add members efficiently
        await Channel.updateOne(
            { _id: channelId },
            {
                $addToSet: {
                members: {
                    $each: uniqueIds.map(id => ({
                    user: id,
                    role: "member",
                    })),
                },
                },
            }
        );

        res.json({ message: "Members added successfully" });

    } catch (error){
        console.log("Error adding member:", error.message || error);
        res.status(500).json({ message: "Error creating channel" });
    }
};

export const getChannels = async (req,res) => {
    const userId = req.user.id;

    try{
        const channels = await Channel.find({
            "members.user": userId
        });

        res.status(200).json(channels);

    } catch (error){
        console.log("Error Getting channels:", error.message || error);
        res.status(500).json({ message: "Error creating channel" });
    }
}