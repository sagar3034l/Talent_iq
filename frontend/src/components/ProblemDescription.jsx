import React from 'react'
import { getDifficultybadgeClass } from '../lib/utils'

function ProblemDescription({ problem, onProblemChange, allProblems, currentProblemId }) {
    return (
        <div className='h-full overflow-y-auto bg-base-200'>
            {/* header */}
            <div className='p-6 bg-base-100 border-b border-base-300'>
                <div className='flex items-start justify-between mb-3'>
                    <h1 className='text-3xl font-bold text-base-content'>{problem.title}</h1>
                    <span className={`badge ${getDifficultybadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
                </div>
                <p className='text-base-content/60'>{problem.category}</p>
                {/* problem selector */}
                <div className='mt-4'>
                    <select
                        className='select select-sm w-full'
                        value={currentProblemId}
                        onChange={(e) => onProblemChange(e.target.value)}
                    >
                        {allProblems.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.title}-{p.difficulty}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='p-6 space-y-6'>
                <div className='bg-base-100 rounded-xl shadow-sm p-5 border border-base-300'>
                    {/* problem discription */}
                    <h2 className='text-xl mb-2 font-bold text-base-content'>Description</h2>
                    <div className='space-y-2 leading-relaxed'>
                        <p className='text-base-content/90'>{problem.description.text}</p>
                        {
                            problem.description.notes.map((note, idx) => {
                                return <p key={idx}
                                    className='text-base-content/90'>
                                    {note}
                                </p>
                            })
                        }
                    </div>
                </div>
                <div className='bg-base-100 rounded-lg'>
                    <div className='p-4'>
                        <h1 className='text-base-content font-bold mb-3'>Examples</h1>
                        <div className='mx-auto'>
                            {
                                problem.examples.map((eg, idx) => {
                                    return <div key={idx} className='space-y-1'>
                                        <div className='flex gap-3'>
                                            <h1>{idx + 1}.</h1>
                                            <h1>{`Example ${idx + 1}`}</h1>
                                        </div>
                                        <div className='bg-base-200 rounded-sm'>
                                            <div className='flex gap-4 p-4'>
                                                <div className='flex flex-col'>
                                                    <span className='text-primary'>input:</span>
                                                    <span className='text-primary'>output:</span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <p>{eg.input}</p>
                                                    <p>{eg.output}</p>
                                                </div>
                                            </div>
                                            {
                                                eg.explanation && (<p className='text-base-content/70 text-sm p-2'>{eg.explanation}</p>)
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
                        <ul className="space-y-2 text-base-content/90">
                            {problem.constraints.map((constraint, idx) => (
                                <li key={idx} className="flex gap-2">
                                    <span className="text-primary -mt-1">•</span>
                                    <code className="text-sm">{constraint}</code>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>
        </div>
    )
}

export default ProblemDescription