
import { ENV } from "../lib/envfile.js";

const PISTON_URL = ENV.PISTON_URL || "http://localhost:2000/api/v2/execute";

export async function executeCode(req,res){
   try {
       const {language, version, files} = req.body;

    if(!language || !version || !Array.isArray(files) || files.length === 0){
        return res.status(400).json({
            message: "language, version and files are required"
        })
    }

    const response = await fetch(PISTON_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language,
                version,
                files
            })
    })

    const data = await response.json();

    if(!response.ok){
        return res.status(200).json({
            success: false,
            message: data.message || data.run?.message || "Code execution failed",
            error: data.error || data.stderr || data.run?.stderr || data.run?.output || "",
            output: data.run?.output || "",
        });
    }

    if(data.compile && data.compile.code !== 0){
        return res.status(200).json({
            success: false,
            message: "Code execution failed",
            error: data.compile.stderr || data.compile.output || "Compilation failed",
            output: data.compile.output || ""
        })
    }

    const output = data.run?.output || data.run?.stdout || ""
    const stderr = data.run?.stderr || ""

    if (stderr) {
          return res.status(200).json({ success: false, output, error: stderr })
    }
    return res.json({
         success: true,
         output: output || ""
    })
   } catch (error) {
      console.log("Error in exectuion code", error);
      res.status(500).json({ message: "Error occured" })
   }
}
