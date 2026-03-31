import {StreamChat} from "stream-chat";
import {ENV} from "../config/env.js";

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET)

export const upsertStreamUser = async (userData) => {
    try{
        await streamClient.upsertUser(userData);
        console.log("Stream User Upserted Succesfully", userData.name);
        return userData
    } catch (error){
        console.log("Error Upserting Stream User:", error);
    }
}

export const deleteStreamUser = async (userData) => {
    try{
        await streamClient.deleteUser(userData);
        console.log("Stream User Deleted Succesfully", userData.name);
    } catch (error){
        console.log("Error Upserting Stream User:", error);
    }
}

export const generateStreamToken = (userId) => {
    try{
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.log("Error Generating Stream Token:", error);
        return null;
    }
}

