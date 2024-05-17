import React from 'react';
import Login from '../component/Login'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import DisplayData from '../component/DisplayData';

const PrivateRoute = ({children }) => {
  const isAuthenticated = localStorage.getItem("token") ?? ""
  return isAuthenticated ? children : <Navigate to="/login" />;
};
function App() {
  const token = localStorage.getItem("token")
  return (
    <BrowserRouter>
    <Routes> 
        <Route path="/" element={<Login />} />
        < Route  element={
               <PrivateRoute>
                 <DisplayData />
               </PrivateRoute>
      }
      />
    </Routes>
  </BrowserRouter>
  );
}

export default Home;
