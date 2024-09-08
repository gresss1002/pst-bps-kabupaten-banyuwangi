// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Route, Routes } from 'react-router-dom';
import HeaderNavbar from './component/layout/HeaderNavbar';
import LandingPages from './pages/LandingPages';
import UserPages from './pages/UserPages';
import Footer from './component/layout/Footer';
import DoneLoginHeaderNavbar from './component/layout/DoneHeaderNavbar';
import LoginHeaderNavbar from './component/layout/LoginHeaderNavbar';
import Login from './component/fragment/Login';
import KonsultanPages from './pages/KonsultanPages';
import AdminPages from './pages/AdminPages';
import { FloatButton } from 'antd';
import { FaArrowUp } from 'react-icons/fa';
import GoogleAuthCallback from './component/GoogleAuthCallback';
import Welcome from './component/Welcome';
import axiosInstance from './utils/axiosInstance';

function App() {
  const [activeSection, setActiveSection] = useState(window.location.hash || '#beranda');
  const userLocal = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
     // Memanggil fetchUserData
     const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/google/${userLocal.googleId}`);
        setUserData(response.data.user);
        console.log('User data:', response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <NextUIProvider>
      {/* <BrowserRouter> */}
      <Routes>

        <Route
          path="/"
          element={
            <>
              <HeaderNavbar activeSection={activeSection} />
              <LandingPages setActiveSection={setActiveSection} />
              <FloatButton.BackTop icon={<FaArrowUp className='text-blueSecondary'/>}/>
            </>
          }
        />
        <Route path="/konsumen" element={
          <>
            <DoneLoginHeaderNavbar userData={userData} />
            <UserPages userData={userData} />
            <Footer />
            <FloatButton.BackTop icon={<FaArrowUp className='text-blueSecondary'/>}/>
          </>
        } />
        <Route path="/konsultan" element={
          <>
            <DoneLoginHeaderNavbar userData={userData}/>
            <KonsultanPages userData={userData}/>
            <Footer />
            <FloatButton.BackTop icon={<FaArrowUp className='text-blueSecondary'/>}/>
          </>
        } />
        <Route path="/admin" element={
          <>
            <DoneLoginHeaderNavbar userData={userData}/>
            <AdminPages userData={userData}/>
            <Footer />
            <FloatButton.BackTop icon={<FaArrowUp className='text-blueSecondary'/>}/>
          </>
        } />
        <Route path="/login" element={
          <>
            <LoginHeaderNavbar  />
            <Login />
            <Footer />
            <FloatButton.BackTop icon={<FaArrowUp className='text-blueSecondary'/>}/>
          </>
        } />
        <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
        <Route path="/welcome" element={<Welcome />} />
        {/* <Route path="/login" element={
          <>
            <LoginHeaderNavbar />
            <Login />
            <Footer />
          </>
        } />
        <Route path="/register" element={
          <>
            <LoginHeaderNavbar />
            <Register />
            <Footer />
          </>
        } />
        <Route path="/user" element={
          <>
            <DoneLoginHeaderNavbar />
            <UserLayanan />
            <Footer />
          </>
        } />
        <Route path="/konsultan" element={
          <>
            <DoneLoginHeaderNavbar />
            <KosultanLayanan />
            <Footer />
          </>
        } />
        <Route path="/admin" element={
          <>
            <DoneLoginHeaderNavbar />
            <AdminLayanan />
            <Footer />
          </>
        } /> */}
      </Routes>
      {/* </BrowserRouter> */}
    </NextUIProvider>
  );
}

export default App;
