import { UserButton } from '@clerk/clerk-react';
import { BookOpen, BookOpenIcon, LayoutDashboard, LayoutDashboardIcon, SparkleIcon } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router'

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (
        <nav className='bg-base/50 border-b border-primary/20 sticky top-0 backdrop-blur-md shadow-lg z-50'>
            <div className='group max-w-7xl p-4 flex items-center justify-between'>
                <Link to={"/"} className='flex gap-2 hover:scale-105 transition-transform'>
                    <div className='bg-gradient-to-r from-primary via-secondary to-accent p-2 rounded-xl'>
                        <SparkleIcon className='size-8' />
                    </div>
                    <div>
                        <h1 className='text-xl text-transparent tracking-tight font-mono bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text'>Talent Iq</h1>
                        <h1 className='text-sm text-base-content/50 -mt-1'>Code together</h1>
                    </div>
                </Link>
                <div className='flex items-center gap-1'>
                    <Link
                        to={"/problems"}
                        className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive("/problems")
                                ? "bg-primary text-primary-content"
                                : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                            }
              `}
                    >
                        <div className='flex items-center gap-x-1'>
                            <BookOpenIcon className='size-4' />
                            <span className='font-medium hidden sm:inline'>Problems</span>
                        </div>
                    </Link>
                     <Link   
                        to={"/dashboard"}
                        className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive("/dashboard")
                                ? "bg-primary text-primary-content"
                                : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                            }
              `}
                    >
                        <div className='flex items-center gap-x-1'>
                            <LayoutDashboardIcon className='size-4' />
                            <span className='font-medium hidden sm:inline'>Dashboard</span>
                        </div>
                    </Link>
                    <div className='ml-4 mt-2'>
                        <UserButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar