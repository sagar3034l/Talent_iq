import { clerkClient, requireAuth } from '@clerk/express'
import User from '../models/User.js'
import { upsertStreamUser } from '../lib/Stream.js'

export const protectRoute = [
    requireAuth(),
    async (req,res,next) =>{
        try {
            const auth = req.auth?.();
            const clerkId = auth?.userId;
            if(!clerkId){
                return res.status(401).json({msg: "Unauthorized - invalid token"})
            }
            // find user in db by clerk id;
            let user = await User.findOne({clerkId})
            if(!user){
                const clerkUser = await clerkClient.users.getUser(clerkId);
                const email = clerkUser.emailAddresses[0]?.emailAddress || `${clerkId}@no-email.local`;
                const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || clerkUser.username || "Unknown User";
                const profileImage = clerkUser.imageUrl || "";

                user = await User.findOneAndUpdate(
                    { $or: [{ clerkId }, { email }] },
                    {
                        $set: {
                            clerkId,
                            email,
                            name,
                            profileImage
                        }
                    },
                    { new: true, upsert: true, runValidators: true }
                );

                await upsertStreamUser({
                    id: user.clerkId.toString(),
                    name: user.name,
                    image: user.profileImage
                });
            }

            req.user = user
            next();
        } catch (error) {
            console.log("Error in protect route middleware",error);
            res.status(500).json({msg:"Internal Server error"})
        }
    }
]

