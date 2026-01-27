<Link
                className='card bg-base-100 hover:scale-[1.01] transition-transform'
                to={`/problems/${problem.id}`}
                key={problem.id}>
                    <div className='card-body '>
                        <div className='flex items-center justify-between gap-4'>
                            {/* left */}
                             <div className='flex-1'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <div className='size-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                                        <Code2Icon className='size-6 text-primary' />
                                    </div>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-2 mb-1'>
                                           <h2 className='text-xl font-bold'>{problem.title}</h2>
                                           <span className={`badge ${getDifficultybadgeClass(problem.difficulty)}`}>
                                             {problem.difficulty}
                                           </span>
                                        </div> 
                                        <p className='text-sm text-base-content/60'>
                                          {problem.category}
                                        </p>
                                    </div>
                                </div>
                             </div>
                            {/* right side */}
                        </div>
                    </div>
              </Link>