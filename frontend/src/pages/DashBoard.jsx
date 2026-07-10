import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useActiveSessions, useCreateSession, useMyRecentSessions } from '../hooks/useSessions';
import Navbar from '../components/Navbar';
import WelcomeSection from '../components/WelcomeSection';
import RecentSessions from '../components/RecentSessions';
import ActiveSessions from '../components/ActiveSessions ';
import StatsCards from '../components/StatsCards';
import CreateSessionModal from '../components/CreateSessionModal';

const DashBoard = () => {

  const navigate = useNavigate();
  const user = useUser();
  const [showCreateModel, setShowCreateModel] = useState(null);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });


  const createSessionMutation = useCreateSession();
  const { data: activeSessionsData, isLoading: LoadingActivesession } = useActiveSessions();
  const { data: recentSessionData, isLoading: loadingRecentSessions } = useMyRecentSessions();



  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate({
      problem: roomConfig.problem, difficulty: roomConfig.difficulty.toLowerCase()
    },
      {
        onSuccess: (data) => {
          setShowCreateModel(false);
          navigate(`/session/${data.sessions._id}`)
        }
      }
    )
  }

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionData?.sessions || [];

  console.log(activeSessions)

  const isUserInSession = (session) => {
    if (!user.id) return false
    return session.host.clerkId === user.id || session.participant?.clerkId === user.id
  }

  return (
    <>
      <div className='min-h-screen bg-base-300'>
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModel(true)} />
        <div className='conatiner mx-auto px-6 pb-16'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <StatsCards activeSessionsCount={activeSessions.length} recentSessionsCount={recentSessions.length} />
            <ActiveSessions sessions={activeSessions} isLoading={LoadingActivesession} isUserInSession={isUserInSession} />
          </div>
          <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
        </div>
      </div>
      <CreateSessionModal
        isOpen={showCreateModel}
        onClose={() => setShowCreateModel(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
      />
    </>
  )
}

export default DashBoard