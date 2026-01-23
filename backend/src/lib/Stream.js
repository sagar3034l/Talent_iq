import {StreamChat} from 'stream-chat';
import { ENV } from './envfile.js';
import {StreamClient} from '@stream-io/node-sdk'

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    throw new Error("Stream api key or api secret is missing");
}
// this will be used for video calls
export const streamClient = new StreamClient(apiKey,apiSecret);

// used for chat-messaging
export const chatClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async(userData) => {
    try {
        await chatClient.upsertUsers(userData);
        return userData;
    } catch (error) {
        console.log("Error upserting Stream-user");
    }
}



export const deleteStreamUser = async(userId) => {
    try {
        await chatClient.deleteUser(userId  );
        console.log("Stream user deleted Successfully for",userId);
        return userId;
    } catch (error) {
        console.log("Error upserting Stream-user");
    }
}