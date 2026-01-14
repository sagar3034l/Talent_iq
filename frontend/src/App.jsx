import './App.css'
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton } from '@clerk/clerk-react'

function App() {
  return (
    <>
     <h1>Welcome to the app</h1>
    <SignedOut>
       <SignInButton>
         Sign in Here
       </SignInButton>
    </SignedOut>

    <SignedIn>
      <SignOutButton />
    </SignedIn>
    </>
  )
}

export default App
