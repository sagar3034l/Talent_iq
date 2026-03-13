import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useEndSession, useJoinSession, useSessionById } from '../hooks/useSessions';
import { PROBLEMS } from '../Data/problems';
import { executeCode } from '../lib/piston';
import Navbar from '../components/Navbar';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { getDifficultybadgeClass } from '../lib/utils';
import { LoaderIcon } from 'react-hot-toast';
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from 'lucide-react';
import CodeEditor from "../components/CodeEditor"
import OutPutPanel from "../components/OutPutPanel"
import useStreamClient from '../hooks/useStreamClient';
import { StreamCall, StreamVideo } from '@stream-io/video-react-sdk';
import VideoCallUI from '../components/VideoCallUI';


const SessionPage = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const { user } = useUser();
   const [output, setOutput] = useState(null);
   const [isRunning, setIsRunning] = useState(false);

   const { data: sessiondata, isLoading: loadingSession, refetch } = useSessionById(id);

   // redirect the participant to dashboard if session ended

   const joinSessionMutation = useJoinSession();
   const endSessionMutation = useEndSession();

   const session = sessiondata?.session;

   const isHost = session?.host?.clerkId === user?.id;
   const isParticipant = session?.participant?.clerkId === user?.id;

   const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(session, loadingSession, isHost, isParticipant)

   

   const problemData = session?.problemTitle ? Object.values(PROBLEMS).find(p => p.title === session?.problemTitle) : null;

   const [selectedlanguage, setSelectedLanguage] = useState("javascript");
   const [code, setCode] = useState(problemData?.starterCode?.[selectedlanguage] || "")

   // auto join session
   useEffect(() => {
      if (!session || !user || loadingSession) return;
      if (isHost || isParticipant) return;
      joinSessionMutation.mutate(id, { onSuccess: refetch })
   }, [session, user, loadingSession, isHost, isParticipant, id])

   useEffect(() => {
      if (problemData?.starterCode?.[selectedlanguage]) {
         setCode(problemData?.starterCode?.[selectedlanguage])
      }
   }, [problemData, selectedlanguage])

   const handlelanguageChange = (e) => {
      const newLang = e.target.value;
      setSelectedLanguage(newLang);
      const starterCode = problemData?.starterCode?.[newLang] || "";
      setCode(starterCode);
      setOutput(null);
   }

   const handleRunCode = async () => {
      setIsRunning(true);
      setOutput(null);
      const result = await executeCode(selectedlanguage, code);
      setOutput(result);
      setIsRunning(false);
   }

   const handleEndSession = async () => {
      if (confirm("Are you sure you want to end the session?")) {
         endSessionMutation.mutate(id,{onSuccess:()=> navigate("/dashboard")});
         navigate('/dashboard');
      }
   }

   
   useEffect(() => {
      if (!session || loadingSession) return;
      if (session.status === "completed") {
         navigate('/dashboard');
      }
   }, [session, loadingSession, navigate]);

   return (
      <div className='h-screen bg-base-100 flex flex-col'>
         <Navbar />
         <div className='flex-1'>
            <PanelGroup direction='horizontal'>
               {/* left code editor and prolem detail */}
               <Panel defaultSize={50} minSize={30}>
                  <PanelGroup direction='vertical'>
                     {/* Problem description */}
                     <Panel defaultSize={50} minSize={20}>
                        <div className='h-full overflow-y-auto bg-base-200'>
                           {/* HEADER SECTION */}
                           <div className='p-6 bg-base-100 border-b border-base-300'>
                              <div className='flex items-start justify-between mb-3'>
                                 <div>
                                    <h1 className='text-3xl font-bold text-base-content'>
                                       {session?.problemTitle || "Loading..."}
                                    </h1>
                                    {problemData?.category && (
                                       <p className='text-base-content/60 mt-1'>{problemData.category}</p>
                                    )}
                                    <p className='text-base-content/60 mt-2'>
                                       Host: {session?.host?.name || "Loading..."} {" "}
                                       {session?.participant ? 2 : 1}/2 participants
                                    </p>
                                 </div>
                                 <div className='flex items-center gap-3'>
                                    <span className={`badge badge-lg ${getDifficultybadgeClass(session?.difficulty)}`}>
                                       {session?.difficulty}
                                    </span>
                                    {
                                       isHost && session?.status === "active" && (
                                          <button
                                             onClick={handleEndSession}
                                             disabled={endSessionMutation.isPending}
                                             className='btn btn-error btn-sm'>
                                             {
                                                endSessionMutation.isPending ? (
                                                   <Loader2Icon className='w-4 h-4 animate-spin' />
                                                ) : (
                                                   <LogOutIcon className='w-4 h-4' />
                                                )
                                             }
                                             End session
                                          </button>
                                       )
                                    }
                                    {
                                       session?.status === "completed" && (
                                          <span className='badge badge-ghost badge-lg'>Completed</span>
                                       )
                                    }
                                 </div>
                              </div>

                           </div>
                           <div className='p-6 space-y-6'>
                              {
                                 problemData?.description && (
                                    <div className='bg-base-100 rounded-xl shaodw-sm p-5 border border-base-300'>
                                       <h2 className='text-xl font-bold mb-4 text-base-content'>Description</h2>
                                       <div className='space-y-3 text-base leading-relaxed'>
                                          <p className='text-base-content/90'>{problemData.description.text}</p>
                                          {
                                             problemData.description.notes?.map((note, idx) => (
                                                <p key={idx} className='text-base-content/90'>
                                                   {note}
                                                </p>
                                             ))
                                          }
                                    </div>
                              </div>
                                 )
                              }
                              {/* example section */}
                              {
                                 problemData?.description && problemData.examples.length > 0 && (
                                    <div className='bg-base-100 rounded-xl shadow-sm p-5 border border-base-300'>
                                       <h2 className='text-xl font-bold mb-4 text-base-content'>Example</h2>
                                       <div className='space-y-4'>
                                          {problemData.examples.map((example, idx) => (
                                             <div key={idx}>
                                                <div className='flex items-center gap-2 mb-2'>
                                                   <span className='badge badge-sm'>{idx + 1}</span>
                                                   <p className='font font-semibold text-base-content'>Example {idx + 1}</p>
                                                </div>
                                                <div className='bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5'>
                                                   <div className='flex gap-2'>
                                                      <span className='text-primary font-bold min-w-[70px]'>
                                                         Input:
                                                      </span>
                                                      <span>{example.input}</span>
                                                   </div>
                                                   <div className='flex gap-2'>
                                                      <span className='text-secondary font-bold min-w-[70px]'>
                                                         Output:
                                                      </span>
                                                      <span>{example.output}</span>
                                                   </div>
                                                   {
                                                      example?.explanation && (
                                                         <div className='pt-2 border-t border-base-300 mt-2'>
                                                            <span className='text-base-content/60 font-sans text-xs'>
                                                               <span className='font font-semibold'>Explanation:</span>
                                                               {example.explanation}
                                                            </span>
                                                         </div>
                                                      )
                                                   }
                                                </div>
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 )
                              }
                              {/* constraints */}
                              {
                                 problemData?.constraints && problemData.constraints.length > 0 && (
                                    <div className='bg-base-100 rounded-xl shadow-xl p-5 border border-base-300'>
                                       <h2 className='text-xl font-bold mb-4 text-base-content'>Constraint</h2>
                                       <ul className='space-y-2 text-base-content/90'>
                                          {
                                             problemData.constraints.map((constraint, idx) => {
                                                return <li key={idx}
                                                   className='flex gap-2'>
                                                   <span className='text-primary'>*</span>
                                                   <code className='text-sm'>{constraint}</code>
                                                </li>
                                             })
                                          }
                                       </ul>
                                    </div>
                                 )
                              }
                           </div>
                        </div>
                     </Panel>
                     <PanelResizeHandle className='h-2 bg-base-300 hover:bg-primary translate-colors cursor-row-resize' />
                     <Panel defaultSize={50} minSize={20}>
                        <PanelGroup direction='vertical'>
                           <Panel defaultSize={70} minSize={30}>
                              <CodeEditor
                                 selectedLanguage={selectedlanguage}
                                 code={code}
                                 isRunning={isRunning}
                                 onLanguageChange={handlelanguageChange}
                                 onCodeChange={setCode}
                                 onRunCode={handleRunCode}
                              />
                           </Panel>
                           <PanelResizeHandle className='h-2 bg-base-300 hover:bg-primary translate-colors cursor-row-resize' />
                           <Panel defaultSize={30} minSize={15}>
                              <OutPutPanel output={output} />
                           </Panel>
                        </PanelGroup>
                     </Panel>

                  </PanelGroup>
               </Panel>
               {/* right panel video calls and chat */}
               <PanelResizeHandle className='w-2 bg-base-300 hover:bg-primary transition-colors' />
               <Panel defaultSize={50} minSize={30}>
                  <div className='h-full bg-base-200 p-4 overflow-auto'>
                     {isInitializingCall ? (
                        <div className='h-full flex items-center justify-center'>
                           <div className='text-center'>
                              <LoaderIcon className='w-12 h-12 mx-auto animate-spin text-primary mb-4' />
                              <p className='text-lg'>Connecting to video call...</p>
                           </div>
                        </div>
                     ) : !streamClient || !call ? (
                          <div className='h-full flex items-center justify-center'>
                              <div className='card bg-base-100 shadow-xl max-w-md'>
                                  <div className='card-body items-center text-center'>
                                       <div className='size-24 bg-error/10 rounded-full flex items-center justify-center mb-4'>
                                             <PhoneOffIcon className='w-12 h-12 text-error'/>
                                       </div>
                                       <h2 className='card-title text-2xl'>Connection Failed</h2>
                                       <p className='text-base-content/70'>Unable to connect to the video call</p>
                                  </div>
                              </div>
                          </div> 
                     ): (
                        <div className='h-full'>
                           <StreamVideo client={streamClient}>
                               <StreamCall call={call}>
                                    <VideoCallUI chatClient={chatClient} channel={channel} />
                               </StreamCall>
                           </StreamVideo>   
                        </div>
                     )}
                  </div>
               </Panel>
            </PanelGroup>
         </div>
      </div>
   )
}

export default SessionPage