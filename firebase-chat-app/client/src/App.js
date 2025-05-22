import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import Login from './components/Login';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/chat" /> : <Login />} 
          />
          <Route 
            path="/chat" 
            element={user ? <Chat /> : <Navigate to="/" />} 
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App; 