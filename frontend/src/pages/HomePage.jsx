import { SignInButton } from '@clerk/clerk-react'
import { Link } from 'react-router'
import { ArrowRightIcon, CheckIcon, Code2Icon, SparkleIcon, UserIcon, VideoIcon, Zap, ZapIcon } from 'lucide-react'

function HomePage() {
  return (
    <div className='bg-gradient-to-br from-base-100 to-base-200'>
      <nav className='bg-base-100/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50 shadow-lg'>
        <div className='max-w-7xl mx-auto p-4 flex items-center justify-between'>
          <Link className='flex items-center gap-3 hover:scheme-105 transition-transform duration-200'
            to={"/"}>
            <div className='size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex justify-center items-center shadow-lg'>
              <SparkleIcon className='ize-6 text-white' />
            </div>
            <div className='flex flex-col'>
              <span className='font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider'>Talent-iq</span>
              <span className='text-xs text-base-content/60 font-medium -mt-1'>Code together</span>
            </div>
          </Link>
          {/* Authbtn */}
          <SignInButton mode='modal'>
            <button className='group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex  items-center gap-2'>
              <span>Get Started</span>
              <ArrowRightIcon className='size-4 group-hover:translate-x-0.5 transition-transform ' />
            </button>
          </SignInButton>
        </div>
      </nav>
      <div className='max-w-7xl mx-auto px-4 py-20'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* left part */}
          <div className='space-y-8'>
            <div className='badge badge-primary badge-lg'>
              <ZapIcon className='size-4 text-black' />
              <h1 className='text-black'>Real-time-Collaboration</h1>
            </div>
            <h1 className='text-5xl lg:text-7xl font-black leading-tight'>
              <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
                Code together,
              </span>
              <br />
              <span className='text-based-content'>
                Learn together
              </span>
            </h1>
            <p className='text-xl text-base-content/70 leading-relaxed max-w-xl'>
              The ultimate platform for collaborative coding interviews and pair programming.
              Connect face-to-face, code in real-time, and ace your technical interviews.
            </p>
            {/* feature */}
            <div className='flex flex-wrap gap-3'>
              <div className='badge badge-lg badge-outline'>
                 <CheckIcon className='size-4 text-success' />
                 Live Video Chat
              </div>
              <div className='badge badge-lg badge-outline'>
                 <CheckIcon className='size-4 text-success' />
                 Code Editor
              </div>
              <div className='badge badge-lg badge-outline'>
                 <CheckIcon className='size-4 text-success' />
                 Multi-Language
              </div>
            </div>
            <div className='flex flex-wrap gap-4'>
                <SignInButton mode='modal'>
                  <button className='btn btn-primary btn-md'>
                    Start coding now
                    <ArrowRightIcon className='size-5' />
                  </button>
                </SignInButton>
                <button className='btn btn-outline btn-md'>
                    <VideoIcon className='size-5'/>
                    Watch Demo
                </button>
            </div>
            {/* Stats */}
            <div className='stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg'>
                <div className='stat'>
                  <div className='stat-value text-primary'>10k+</div>
                  <div>Active Users</div>
                </div>
                <div className='stat'>
                  <div className='stat-value text-secondary'>50k+</div>
                  <div>Sessions</div>
                </div>
                <div className='stat'>
                  <div className='stat-value text-accent'>99.9%</div>
                  <div>Uptime</div>
                </div>
            </div>
          </div>
           {/* Right image */}
        <img 
        src="/hero.jpg" 
        alt="CodeCollab Platform" 
        className='w-full h-auto rounded-3xl border-4 border-base-100 hover:scale-105 transition-transform duration-500'
        />
        </div>
      </div>
      {/* feature section */}
      <div className='max-w-7xl mx-auto px-4 py-20'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold mb-4'>
              Everything You need to <span className='text-primary font-mono'>Succed</span>
            </h2>
            <p className='text-lg text-base-content/70 max-w-xl mx-auto'>
               Powerful features designed to make your coding interviews seamless and productive
            </p>
          </div>
      {/* feature grid */}
           <div className='grid md:grid-cols-3 gap-8'>
              <div className='card bg-base-100 shadow-xl'>
                  <div className='card-body items-center text-center'>
                      <div className='size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4'>
                        <VideoIcon className='size-8 text-primary' />
                      </div>
                      <h3 className='card-title'>
                        HD Video call
                      </h3>
                      <p className='text-base-content/70'>Crystel clear video and audio for seamless communication</p>
                  </div>
              </div>
              <div className='card bg-base-100 shadow-xl'>
                  <div className='card-body items-center text-center'>
                      <div className='size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4'>
                        <Code2Icon className='size-8 text-primary' />
                      </div>
                      <h3 className='card-title'>
                        Live code editor
                      </h3>
                      <p className='text-base-content/70'>Collaboretors is real-time with syntax highliting and multiple language support</p>
                  </div>
              </div>
              <div className='card bg-base-100 shadow-lg'>
                <div className='card-body text-center items-center'>
                      <div className='size-18 bg-primary/10 rounded-2xl mx-auto flex justify-center items-center'>
                        <UserIcon className='size-8' />
                      </div>
                      <h3 className='card-title'>
                        Easy collaboration
                      </h3>
                      <p className='text-base-content/70'>Share your screen , discuss solutions , and learn from each other in real-time</p>
                </div>
              </div>
           </div>
      </div>
    </div>
  )
}

export default HomePage;