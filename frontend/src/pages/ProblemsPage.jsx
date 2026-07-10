import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { PROBLEMS } from '../Data/problems.js'
import { Link } from 'react-router';
import { ChevronRightIcon, Code2Icon, CodeIcon } from 'lucide-react';
import { getDifficultybadgeClass } from '../lib/utils.js';

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);
  const easyProblemsCount = problems.filter(p=> p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter(p=> p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter(p=> p.difficulty === "Hard").length;

  return (
    <div className='min-h-screen bg-base-300'>
      {/* problem list and details */}
      <Navbar />
      <div className='max-w-6xl mx-auto py-12 px-4'>
        <div className='mb-8 bg-primary max-w-md p-4 rounded-xl'>
          <h1 className='text-3xl font-bold'>Practice Problems</h1>
          <p className='text-base-content/50'> 
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        <div className='space-y-4'>
          {
            problems.map(problem =>
              <Link to={`/problem/${problem.id}`}
               key={problem.id}
               className='card bg-base-100 hover:scale-[1.01]'>
                <div className='card-body'>
                  <div className='flex gap-2 justify-between'>
                    <div className='flex gap-2'>
                      <div className='rounded-lg bg-primary/20 p-3'>
                        <CodeIcon className='size-6' />
                      </div>
                      <div>
                        <h1 className='text-lg font-bold'>{problem.title} <span className={`text-sm badge ${getDifficultybadgeClass(problem.difficulty)}`}>{problem.difficulty}</span></h1>
                        <h3 className='text-sm text-base-content/70'>{problem.category}</h3>
                      </div>
                    </div>
                    <div className='flex items-center text-primary'>
                        <span className='-mt-1'>solve</span><ChevronRightIcon className='size-5' />
                    </div>
                  </div>
                  <div>
                    <p className='text-base-content/80'>{problem.description.text}</p>
                  </div>
                </div>
              </Link>
            )
          }
        </div>
        <div className='card mt-12 bg-base-100'>
            <div className='card-body'>
                <div className='stats stats-horizontal'>
                    <div className='stat'>
                        <div className='stat-title'>problems</div>
                        <div className='stat-value'>{problems.length}</div>
                    </div>
                    <div className='stat'>
                        <div className='stat-title'>Easy problems</div>
                        <div className='stat-value text-success'>{easyProblemsCount}</div>
                    </div>
                    <div className='stat'>
                        <div className='stat-title'>Medium problems</div>
                        <div className='stat-value text-warning'>{mediumProblemsCount}</div>
                    </div>
                    <div className='stat'>
                        <div className='stat-title'>Hard problems</div>
                        <div className='stat-value text-error'>{hardProblemsCount}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemsPage




