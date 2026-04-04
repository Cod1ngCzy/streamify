import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

// Local Imports // 
import LoginPage from './pages/AuthPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CallPage from './pages/CallPage.jsx';
import Loader from "./components/StreamifyLoaderPage.jsx";
import { useAuthStore } from './store/useAuthStore.js';


const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  
  // Check if user is authenticated on app load.
  // This runs once on mount and verifies the session with the backend.
  // If the token/cookie is valid, authUser gets populated — otherwise it stays null.
  // All route guards below depend on authUser being set correctly here.
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <Loader />
  )

  return(
    <SentryRoutes>
      <Route path='/' element={<Navigate to={authUser ? "/homepage" : "/auth"} />} />
      <Route path='/auth' element={!authUser ? <LoginPage /> : <Navigate to="/homepage"/>} />
      <Route path='/homepage' element={authUser ? <HomePage /> : <Navigate to="/auth"/>} />
      <Route path='/call/:id' element={authUser ? <CallPage /> : <Navigate to="/auth"/>} />
    </SentryRoutes>
  )
}

export default App;