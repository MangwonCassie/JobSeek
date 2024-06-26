import { useContext, useEffect, useState } from 'react'
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import './App.css'
import { Context } from "./main";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from './components/Layout/Navbar';
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJobs from "./components/Job/PostJobs";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";


const App = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/api/v1/user/getuser",
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.log("App에서 user 가져왔나요?", user);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]); //이거때문에 로그인 해도 user 안 가져옴 그리고 로그아웃이 안됨


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
