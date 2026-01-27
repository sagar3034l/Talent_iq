import React from 'react'

function OutPutPanel({output}) {
  return (
    <div className='h-full bg-base-100 flex flex-col'>
        <div className='flex-1 overflow-auto p-4'>
           {output === null ? (
             <p className='text-base-content/50 text-sm'>
              Click "Run code" to see the output here...
             </p>
           ): output.success ? (
              <pre className='text-sm font-mono text-success whitespace-pre-wrap'>
                  {output.output}
              </pre>
           ) : (
            <div>
              {
                output.output && (
                  <pre className='text-sm font-mono text-base-content whitespace-pre-wrap mb-2'>
                      {output.output}
                  </pre>
                )
              }
              <pre className='text-sm font-mono text-error whitespace-pre-wrap'>{output.error}</pre>
            </div>
           )
          }
        </div>
    </div>
  )
}

export default OutPutPanel