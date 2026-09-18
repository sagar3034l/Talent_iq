// Piston-backed code execution helper used by the browser pages.

import { codeExecute } from '../api/code';

const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "20.11.1" },
    python: { language: "python", version: "3.12.0" },
    java: { language: "java", version: "15.0.2" },
}
    
export async function executeCode(language, code) {
    try {
        const languageConfig = LANGUAGE_VERSIONS[language]
        if(!languageConfig) {
            return {
                success: false,
                error: `Unsupported language ${language}`
            } 
        }
        const fileName = language === "java"
            ? "Main.java"
            : `code.${getFileExtension(language)}`

        const files =  [{ name: fileName, content: code }]

        return await codeExecute(languageConfig.language, languageConfig.version, files)

    } catch (error) {
        return {
            success: false,
            error: `failed to execute code: ${error.message}`
        }
    }
}


function getFileExtension(language) {
    const extensions = {
        javascript: "js",
        python: "py",
        java: "java"
    }
    return extensions[language] || "txt"
}


