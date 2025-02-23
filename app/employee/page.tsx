'use client';

import React, { useState } from 'react'
import {Kanit,Rubik} from "next/font/google";
import { title } from 'process';
import Image from "next/image";
import ParticleHolder from '../components/particleBg';
import { getRandom } from '@tsparticles/engine';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,PieChart } from 'recharts';
import NextNProgress from 'nextjs-progressbar';
import ProgressBar from '../components/ProgressBar';

const data = [
  {
    "year": "2016",
    "Raw": 4000,
    "Final Product": 2400
  },
  {
    "year": "2017",
    "Raw": 3000,
    "Final Product": 1398
  },
  {
    "year": "2018",
    "Raw": 2000,
    "Final Product": 9800
  },
  {
    "year": "2019",
    "Raw": 2780,
    "Final Product": 3908
  },
  {
    "year": "2020",
    "Raw": 1890,
    "Final Product": 4800
  },
  {
    "year": "2021",
    "Raw": 2390,
    "Final Product": 3800
  },
  {
    "year": "2022",
    "Raw": 3490,
    "Final Product": 4300
  }
]

const prod = [
  {
    "Id":"#23434",
    "Name":"Galvanised square steel",
    "Sales":32,
    "Price":"$122.23",
    "Earning":"$23,543.54"
  },
  {
    "Id":"#23435",
    "Name":"Iron Ores",
    "Sales":34,
    "Price":"$145.23",
    "Earning":"$34,543.54"
  },
  {
    "Id":"#23436",
    "Name":"Aluminium Frame",
    "Sales":16,
    "Price":"$2.23",
    "Earning":"$54,543.54"
  },
  {
    "Id":"#23437",
    "Name":"Platinum",
    "Sales":56,
    "Price":"$142.23",
    "Earning":"$3,543.54"
  },
  {
    "Id": "#23438",
    "Name": "Copper Sheets",
    "Sales": 21,
    "Price": "$98.50",
    "Earning": "$2,068.50"
  },
  
]

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

const order_statistics = [[false]];
for(var i=0;i<6;i++){
  order_statistics[i] = []
  for(var j=0;j<4;j++){
    order_statistics[i][j] = Math.random()*2>=1?true:false;
  }
}

const Employee = () => {
  const [nav_index,nav_SetIndex] = useState(0);
  console.log(nav_index);
  const nav_elements = ["DASHBOARD","PRODUCTS","ORDERS","CUSTOMERS","STATISTICS"] 
  return (
    <>
    <ParticleHolder/>
    <div></div>
    <div className='flex relative justify-center items-center z-10'>
      <div className={`${font_title.variable} ${body_font.variable} flex flex-row text-white p-[5px] bg-[#1c1c1c] w-[100%] mt-[50px] ml-[50px] mr-[50px] mb-[20px] rounded-lg justify-between items-center`}>
        <div className='font-title text-center text-2xl pl-10'><a href="/">STOCKLE</a></div>
        <div>
          <ul className="list-none flex flex-row">
              {nav_elements.map((element,index)=><li key={index}>
                <div className={nav_index==index?'font-content pl-[30px] pr-[30px] pt-[15px] pb-[15px] rounded-xl text-black text-xl text-center bg-emerald-500 cursor-pointer':'font-content pl-[30px] pr-[30px] pt-[15px] pb-[15px] rounded-xl text-white text-xl text-center bg-transparent cursor-pointer'} onClick={()=>nav_SetIndex(index)}><a href={`#${element}`}>{element}</a></div>
              </li>)}
          </ul>
        </div>
        <div className='flex flex-row p-5 justify-center items-center'>
          <div className='ml-5 rounded-xl border-emerald-500'><Image src="/message.png" width={25} height={25} alt='not found' color='white'></Image></div>
          <div className='ml-5 rounded-xl border-emerald-500'><Image src="/notif.png" width={25} height={25} alt='not found' color='white'></Image></div>
          <div className='ml-5'><Image src="/senku.jpg" width={40} height={40} alt='not found' color='white' className='rounded-full'></Image></div>
        </div>
      </div>

      </div>
      
      <div id='DASHBOARD' className="block">
      <div className={`${font_title.variable} ${body_font.variable} flex flex-row text-white p-[5px] w-[100%] ml-[50px] rounded-lg justify-start items-start`}>
        <div className='block'>
        <div className='flex flex-row'>
        <div className='bg-[#ffffff]/10 w-[500px] h-[200px] backdrop-blur-md rounded-3xl m-3'>
        <div className='justify-between flex flex-row'>
          <p className='pt-10 pl-[30px] text-xl font-content'>TOTAL SALES</p>
          <p className='mt-10 mr-[30px] p-[2px] text-xl font-content rounded-md bg-emerald-500 '>+12.5%</p>
        </div>
        <p className='text-5xl text-white font-title pl-[30px] pt-[30px]'>$192,000.21</p>
        </div>
        <div className='bg-[#ffffff]/10 w-[500px] h-[200px] backdrop-blur-md rounded-3xl m-3'>
        <div className='justify-between flex flex-row'>
          <p className='pt-10 pl-[30px] text-xl font-content'>TOTAL ORDERS</p>
          <p className='mt-10 mr-[30px] p-[2px] text-xl font-content rounded-md bg-[#f54248]'>-7.5%</p>
        </div>
        <p className='text-5xl text-white font-title pl-[30px] pt-[30px]'>$85,000.82</p></div>
        <div className='bg-[#ffffff]/10 w-[500px] h-[200px] backdrop-blur-md rounded-3xl m-3'>
        <div className='justify-between flex flex-row'>
          <p className='pt-10 pl-[30px] text-xl font-content'>TOTAL REVENUE</p>
          <p className='mt-10 mr-[30px] p-[2px] text-xl font-content rounded-md bg-emerald-500'>+7.2%</p>
        </div>
        <p className='text-5xl text-white font-title pl-[30px] pt-[30px]'>$59,482.82</p>
        </div>
        </div>
        <div className='bg-[#ffffff]/10 w-[1548px] backdrop-blur-md h-[550px] m-3 rounded-lg'>
        <ResponsiveContainer width="100%" height="100%" >
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Raw" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="Final Product" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </ResponsiveContainer>
        </div>
        </div>
        <div className='block'>
        <div className='bg-[#ffffff]/10 w-[500px] backdrop-blur-md h-[650px] rounded-3xl m-3'>
        <p className='pt-10 pl-[30px] text-4xl font-content text-left'>ORDER STATISTICS</p>
        {order_statistics.map((row,index)=><div key={`r_${index}`} className='flex flex-row pl-[30px] pt-[5px]'>
          <div className="font-content text-white text-xl text-center m-[20px]">{`${index+3}:00 PM`}</div>
            {row.map((value,value_index)=><div key={`c_${index}_${value_index}`} className={`${value==true?'w-[50px] h-[50px] bg-emerald-500/90 m-[10px] rounded-lg':'w-[50px] h-[50px] bg-emerald-500/30 m-[10px] rounded-lg'}`}></div>)}
          </div>)}
        </div>
        <div className='bg-[#ffffff]/10 w-[500px] backdrop-blur-md h-[115px] rounded-3xl m-3 justify-center items-center'>
        <h1 className="text-xl font-bold m-4 p-4">Progress Bar</h1>
        <ProgressBar/>
        </div>
        </div>
      </div>
      </div>
      <div id="PRODUCTS">
      <div className={`${font_title.variable} ${body_font.variable} bg-[#ffffff]/10 w-[1548px] backdrop-blur-md h-[515px] rounded-3xl ml-[70px] mb-[70px] justify-center items-center`}>
        <p className="font-title mt-1 p-10 text-white text-2xl">Top Selling Products</p>
        <div className="w-[90%] bg-black/10 rounded-lg h-[300px] overflow-y-auto p-4">
  <table className="w-full border-collapse">
    <thead>
      <tr className="font-title text-xl text-white border-b-2 border-white/30">
        <th className="p-4 text-center">ID</th>
        <th className="p-4 text-center">NAME</th>
        <th className="p-4 text-center">SALES</th>
        <th className="p-4 text-center">PRICE</th>
        <th className="p-4 text-center">EARNING</th>
      </tr>
    </thead>
    <tbody>
      {prod.map((value, index) => (
        <tr key={index} className="font-content text-base text-white border-b border-white/20">
          <td className="p-4 text-right">{value["Id"]}</td>
          <td className="p-4 text-right">{value["Name"]}</td>
          <td className="p-4 text-right">{value["Sales"]}</td>
          <td className="p-4 text-right">{value["Price"]}</td>
          <td className="p-4 text-right">{value["Earning"]}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
      </div>
    </>
  )
}

export default Employee