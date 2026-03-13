import React from 'react'
import { PROBLEMS } from '../Data/problems'
import { Code2Icon, PlusIcon } from 'lucide-react';
import { LoaderIcon } from 'react-hot-toast';

const CreateSessionModal = ({ isOpen, onClose, roomConfig, setRoomConfig, onCreateRoom, isCreating }) => {

  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className='modal modal-open'>
      <div className='modal-box max-w-2xl'>
        <h3 className='font-bold text-2xl mb-6'>Create a new session</h3>
        <div className='space-y-8'>
          <div className='space-y-2 '>
            <label className='label'>
              <span className='label-text font-semibold'>
                Select Problems
              </span>
              <span className='label-text font-semibold'>
                *
              </span>
            </label>
            <select className='select w-full' value={roomConfig.problem} onChange={(e) => {
              const selectedProblem = problems.find(p => p.title === e.target.value)
              setRoomConfig(
                { difficulty: selectedProblem.difficulty, problem: e.target.value }
              )
            }}>
              <option value="" disabled>Choose a coding problem</option>
              {
                problems.map((problem) => (
                  <option value={problem.title} key={problem.id}>
                    {problem.title} ({problem.difficulty})
                  </option>
                ))
              }
            </select>
          </div>
          {/* room summary */}
          {
            roomConfig.problem && (
              <div className='alert alert-success'>
                <Code2Icon className='size-5' />
                <div>
                  <p className='font-semibold'>Room summary</p>
                  <p>
                    Problem: <span className='font-semibold'>{roomConfig.problem}</span>
                  </p>
                  <p>
                    Max Participant: <span>(1-on-1 session)</span>
                  </p>
                </div>
              </div>
            )
          }
        </div>
        <div className='modal-action'>
          <button className='btn btn-ghost' onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
            className='btn btn-primary gap-2'>
            {
              isCreating ? (
                <LoaderIcon className='size-5 animate-spin' />
              ) : (
                <PlusIcon className='size-5' />
              )
            }
            {
              isCreating ? "Creating..." : "Create"
            }
          </button>
        </div>
      </div>
      <div className='modal-backdrop' onClick={onClose}></div>
    </div>
  )
}

export default CreateSessionModal