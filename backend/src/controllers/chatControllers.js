import { chatClient } from "../lib/Stream.js";


export async function getStreamToken(req,res){
    try {
        const clerkId = req.user?.clerkId;
        if (!clerkId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = chatClient.createToken(clerkId);
        return res.status(200).json({
            token,
            userId: clerkId,
            userName: req.user?.name || "Unknown User",
            userImage: req.user?.profileImage || ""
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}


