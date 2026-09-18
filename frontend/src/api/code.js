import { axiosInstance } from "../lib/axios"


export const codeExecute = async (language,version,files) => {
     const res = await axiosInstance.post("/code",{
        language,version, files
     })
     return res.data
}