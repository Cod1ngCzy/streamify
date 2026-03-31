import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";
import { upsertStreamUser } from "../config/stream.js";

export const signUp = async (req, res) => {
    const {fullName, email, password} = req.body;

    try{
        if (!fullName || !email || !password) return res.status(400).json({message: "All fields are required"});
        
        if (password.length < 6) return res.status(400).json({message: "Password must be at least 6 characters long"});

        const user = await User.findOne({email});

        if (user) return res.status(400).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            // Upsert User to Stream-Chat Client
            await upsertStreamUser({
                id: newUser._id.toString(), // Stream requires a string, MongoDB _id is an ObjectId
                name: newUser.fullName,
                email: newUser.email,
                image: newUser.profilePic,
            });

            res.status(201).json({
                message: "User created successfully",
                user:{
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                }
            });


        } else{
            res.status(400).json({message: "Failed to create user: invalid data"});
        }

    } catch(error){
        console.log("Error during signup:", error.message || error);
        res.status(500).json({ message: "Error during signup", error: error.message });
    }
}

export const signIn = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid Data"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid Data"});

        const token = generateToken(user._id, res);

        res.status(200).json({
            message: `User ${user.fullName} logged in sucessfully`,
            userData: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
            },
            auth : token,
        });

    } catch (error){
        console.log("Error during Sign In:", error.message || error);
        res.status(500).send("Error during Sign In", error);
    }
}

export const signOut = (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "User signed out successfully"});
    } catch (error){
        console.log("Error during Sign Out:", error.message || error);
        res.status(500).send("Error during Sign Out", error);
    }
}

// TODO: DeleteUser ++ Delete User from Stream Client

