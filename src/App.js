import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Routing from './Components/Routing';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Adminheader from './Components/Adminheader';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { login } from './slices/authslice';
import { useDispatch, useSelector } from 'react-redux';
const cobj = new Cookies();

function App()
 {
  const {isLoggedIn,utype} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const [uid,setuid]=useState("");

useEffect(()=>
{
    if(sessionStorage.getItem(`udata`)!==null)
    {
      dispatch(login(JSON.parse(sessionStorage.getItem("udata"))))
    }

    if(cobj.get('ucookie'))
    {
      setuid(cobj.get('ucookie'));
    }
},[])

useEffect(()=>
{
  if(uid!=="")
  {
    fethudetails();
  }
},[uid])

async function fethudetails()
{
const apires= await axios.get(`http://localhost:9000/api/fetchudetailsbyid?id=${uid}`)
if(apires.status===200)
 {
      if(apires.data.code===1)
  {
    dispatch(login(apires.data.membdata))
    sessionStorage.setItem(`udata`,JSON.stringify(apires.data.membdata))
    sessionStorage.setItem("jtoken",apires.data.jstoken)
  }
 }
}

  return (
    <>
      <ToastContainer theme='colored'/>  
      {
         isLoggedIn===false?<Header/>
        :utype===`admin`?<Adminheader/>
        :utype===`normal`?<Header/>
        :null
      }
      <Routing/>
      <Footer/>
    </>
  );
}
export default App;
