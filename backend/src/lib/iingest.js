import {Inngest} from 'inngest';
import { connectDB } from './db.js';
import User from '../models/User.js';
import { deleteStreamUser, upsertStreamUser } from './Stream.js';

export const inngest = new Inngest({id: "talent-iq"});

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event})=>{
        await connectDB();
        
        const {id,email_addresses,first_name,last_name,image_url} = event.data
        const email = email_addresses[0]?.email_address || `${id}@no-email.local`;
        const name = `${first_name || ""} ${last_name || ""}`.trim() || "Unknown User";
        const newUser = {
            clerkId:id,
            email,
            name,
            profileImage: image_url
        }
       await User.findOneAndUpdate(
        { $or: [{ clerkId: newUser.clerkId }, { email: newUser.email }] },
        { $set: newUser },
        { new: true, upsert: true, runValidators: true }
       );
       
       await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profileImage
       });
    }
)

const deleteUser = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async ({event})=>{
       await connectDB();

       const {id} = event.data
       await User.deleteOne({clerkId: id})        
       await deleteStreamUser(id.toString())
    }
)

export const functions = [syncUser,deleteUser]



// https://inn.gs/e/UD5V47NN-CQbyIyPwcQyT7EnBJKvWi0fnNdTjl5TvDXMzmM5KRQjSz2CpGoIdHBM2XfAZLYYG7gnp0nD4lAo9Q


// https://inn.gs/e/VRu9PyVIFpJzU_b0JmyPjlGh0Bu2-1sszYw-SXVq-eOzf_nOyEuers75ODU7szuiXUG770lsB9n3oPIy_nPBuA
