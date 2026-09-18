import { useMutation } from "@tanstack/react-query"
import { codeExecute } from "../api/code"


const LANGUAGE_VERSIONS = {
     javascript: { language: "javascript", version: "20.11.1" },
     python: { language: "python", version: "3.12.0" },
     java: { language: "java", version: "15.0.2" },
}

function getFileExtension(language) {
     const extensions = {
          javascript: "js",
          python: "py",
          java: "java"
     }
     return extensions[language] || "txt"
}

export const useCodeExecute = () => {
     const result = useMutation({
          mutationKey: ['code'],
          mutationFn: ({ language, code }) => {
               const config = LANGUAGE_VERSIONS[language];
               const fileName = language === "java" ? "Main.java" : `code.${getFileExtension(language)}`;
               const files = [{ name: fileName, content: code }];
               return codeExecute(config.language, config.version, files)
          }
     })
     return result;
}

