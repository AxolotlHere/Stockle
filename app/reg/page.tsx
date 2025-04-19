'use client';

import Image from "next/image";
import { BackgroundLines } from "../components/BackgroundLines";
import ParticleHolder from "../components/particleBg";
import { initializeApp } from "firebase/app";
import { Kanit, Rubik } from "next/font/google";
import { useState, useMemo } from "react";
import { initializeUser, getData } from "../backend/firebase_"

const font_title = Kanit({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-title",
})

const body_font = Rubik({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-content",
  display: "swap",
});

const reg = () => {
  const particles = useMemo(() => <ParticleHolder />, [])
  const [email, setEmail] = useState("")
  const [usrname, setUsrname] = useState("")
  const [passwd, setPasswd] = useState("")
  return (
    <>

      <div className={`${font_title.variable} ${body_font.variable} flex flex-row items-center justify-center h-screen z-20`}>
        <div className="bg-[#1c1c1c] px-10 py-10 items-center justify-center rounded-r-[10px] z-20 relative w-[700px] h-[600px] bg-opacity-10 backdrop-blur-md">
          <div className="text-white m-10 text-[30px] text-center font-title">
            SIGN UP TO STOCKLE

          </div>
          <div className="flex grid-cols-2 gap-2 p-2 text-center">
            <div className="w-1/2 p-2">
              <label htmlFor="email" className="font-content text-white">Email:</label>
            </div>
            <div className="w-1/2">
              <input name="email" id="email" type="email" className="border-white border-[2px] p-[5px] rounded-lg bg-transparent font-content text-white" value={email} onChange={e => setEmail(e.target.value)}></input>
            </div>
          </div>
          <div className="flex grid-cols-2 gap-2 p-2 text-center">
            <div className="w-1/2 p-2">
              <label htmlFor="usrname" className="font-content text-white">Username</label>
            </div>
            <div className="w-1/2">
              <input name="usrname" id="usrname" className="border-white border-[2px] p-[5px] rounded-lg bg-transparent font-content text-white" value={usrname} onChange={e => setUsrname(e.target.value)}></input>
            </div>
          </div>
          <div className="flex grid-cols-2 gap-2 p-2 text-center">
            <div className="w-1/2 p-2">
              <label htmlFor="password" className="font-content text-white">Password:</label>
            </div>
            <div className="w-1/2">
              <input name="passwd" id="passwd" type="password" className="border-white border-[2px] p-[5px] rounded-lg bg-transparent font-content text-white" value={passwd} onChange={e => setPasswd(e.target.value)}></input>
            </div>
          </div>
          <div className="w-[100%] flex flex-row justify-center items-center">
            <button className="rounded-lg bg-[#1c1c1c] text-white font-content pr-5 pl-5 pt-1 border-white border-2 pb-1 m-4 hover:bg-black" onClick={
              () => {
                console.log("Hello")
                initializeUser(usrname, email, passwd);
                getData(email);
              }
            }>
              SIGN UP
            </button>
          </div>
          <br />
          <div className="font-title text-white text-sm text-center underline underline-offset-4"><a>ALREADY HAVE AN ACCOUNT ? SIGN IN</a></div>
          <div className="font-content text-center text-white pt-4">------OR-------</div>
          <div className="flex flex-row w-[100%] justify-center items-center p-4">
            <button className="font-content w-[30px] items-center self-center text-center justify-items-center h-[30px] mr-[15px] ml-[15px] rounded-[300px] bg-white p-[5px]"><Image alt="chrome" className="justify-center" width={20} height={20} src="/chrome.svg"></Image></button>
            <button className="font-content w-[30px] items-center self-center text-center justify-items-center h-[30px] ml-[15px] mr-[15px] rounded-[300px] bg-white p-[5px]"><Image alt="chrome" className="justify-center" width={20} height={20} src="/pngegg.png"></Image></button>
            <button className="font-content w-[30px] items-center self-center text-center justify-items-center h-[30px] ml-[15px] mr-[15px] rounded-[300px] bg-white p-[5px]"><Image alt="chrome" className="justify-center" width={20} height={20} src="/git.svg"></Image></button>
            <button className="font-content w-[30px] items-center self-center text-center justify-items-center h-[30px] ml-[15px] mr-[15px] rounded-[300px] bg-white p-[5px]"><Image alt="chrome" className="justify-center" width={20} height={20} src="/twitter.svg"></Image></button>
          </div>
        </div>
        <div className="bg-[url('/factory.jpg')] bg-cover bg-no-repeat bg-center w-[500px] h-[600px] rounded-l-[10px] z-20"></div>


      </div >
      {particles}
    </>
  )
}

export default reg


