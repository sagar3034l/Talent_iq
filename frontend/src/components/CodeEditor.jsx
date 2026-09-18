import React from 'react'
import { Loader2Icon, PlayIcon } from 'lucide-react'
import { LANGUAGE_CONFIG } from '../Data/problems'
import { Editor } from '@monaco-editor/react'

function CodeEditor({ isRunning, selectedLanguage, code, onRunCode, onCodeChange,onLanguageChange }) {
  return (
    <div className='h-full bg-base-300 flex flex-col'>
      <div className='flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300'>
        <div className='flex items-center gap-3'>
          <img src={LANGUAGE_CONFIG[selectedLanguage]?.icon} alt={LANGUAGE_CONFIG[selectedLanguage]?.name} className='size-6' />
          <select
            value={selectedLanguage}
            className='select select-sm'
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button className='btn btn-primary btn-sm gap-2' disabled={isRunning} onClick={onRunCode}>
          {isRunning ? (
            <>
              <Loader2Icon className='size-5 animate-spin mr-2' />
              Running...
            </>
          ) : (
            <PlayIcon className='size-5 mr-2' />
          )}
         <h1>Run Code</h1>
        </button>
      </div>
      <div className='flex-1 min-h-0'>
        <Editor
          language={LANGUAGE_CONFIG[selectedLanguage]?.monacoLang}
          value={code}
          onChange={onCodeChange}
          theme='vs-dark'
          options={{
            fontSize:14,
            lineNumbers:"on",
            scrollBeyondLastLine:false,
            automaticLayout: true,
            minimap: { enabled: false }
          }}
        />
      </div>
    </div>
  )
}

export default CodeEditor
