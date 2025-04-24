'use client';

import React, { useEffect, useState } from 'react'
import { Kanit, Rubik } from "next/font/google";
import { title } from 'process';
import Image from "next/image";
import ParticleHolder from '../components/particleBg';
import { getRandom } from '@tsparticles/engine';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import NextNProgress from 'nextjs-progressbar';
import ProgressBar from '../components/ProgressBar';
import { salesChange, getItemData, getGraphData, getSalesData, getEarningData, getOrderEmp, getUsers } from "../backend/firebase_"


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
for (var i = 0; i < 6; i++) {
  order_statistics[i] = []
  for (var j = 0; j < 4; j++) {
    order_statistics[i][j] = Math.random() * 2 >= 1 ? true : false;
  }
}
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];



const Employee = () => {
  salesChange();
  const [itemList, setItemList] = useState([])
  const [nav_index, nav_SetIndex] = useState(0)
  const [graphData_, setGraphData] = useState([{ "Raw": 0, "final_pdt": 0 }])
  const [activeIndex, setActiveIndex] = useState(-1);
  const [salesSum, setSalesSum] = useState(0);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [salesData_, setSalesData] = useState();
  const [earning, setEarning] = useState([]);
  const [usrData, setUserData] = useState<Map<string, any>>(new Map<string, any>())
  const nav_elements = ["DASHBOARD", "PRODUCTS", "ORDERS", "CUSTOMERS"]
  const onPieEnter = (_: unknown, index: number): void => {
    setActiveIndex(index);
  };

  const earn_ = async () => {
    await getEarningData().then((onValue) => {
      setEarning(onValue)
      console.log("huh", onValue)
    })
  }
  const order_ = async () => {
    await getOrderEmp().then((onValue) => {
      setOrderList(onValue)
    })
  }
  const data = async () => {
    await getItemData().then((onValue) => {
      setItemList(onValue)
      console.log("Worksss", onValue)
    })
  }

  const users_ = async () => {
    await getUsers().then((onValue) => {
      console.log("it is", onValue)
      setUserData(onValue)
    })
  }

  const data_graph = async () => {
    await getGraphData().then((onValue) => {
      var Change_val = [];
      console.log(onValue)
      console.log(typeof (onValue))
      for (var i = 0; i < onValue["Raw"].length; i++) {
        Change_val.push({ "Raw": onValue["Raw"][i], "final_pdt": onValue["final_pdt"][i] })
      }
      setGraphData(Change_val);
      console.log(Change_val, "works")
    })
  }

  const sales_data = async () => {
    await getSalesData().then((onValue) => {
      var sum = 0;
      for (var i = 0; i < onValue["sales_list"]["Raw"].length; i++) {
        sum += onValue["sales_list"]["Raw"][i] + onValue["sales_list"]["final_pdt"][i]
      }
      setSalesSum(sum);
      setSalesData(onValue);
    })
  }

  useEffect(() => {
    data();
    data_graph();
    sales_data();
    earn_();
    order_();
    users_();
  }, []);

  return (
    <>
      <ParticleHolder />
      <div className='flex relative justify-center items-center z-10'>
        <div className={`${font_title.variable} ${body_font.variable} flex flex-row text-white p-[5px] bg-[#1c1c1c] w-[100%] mt-[50px] ml-[50px] mr-[50px] mb-[20px] rounded-lg justify-between items-center`}>
          <div className='font-title text-center text-2xl pl-10'><a href="/">STOCKLE</a></div>
          <div>
            <ul className="list-none flex flex-row">
              {nav_elements.map((element, index) => <li key={index}>
                <div className={nav_index == index ? 'font-content pl-[30px] pr-[30px] pt-[15px] pb-[15px] rounded-xl text-black text-xl text-center bg-emerald-500 cursor-pointer' : 'font-content pl-[30px] pr-[30px] pt-[15px] pb-[15px] rounded-xl text-white text-xl text-center bg-transparent cursor-pointer'} onClick={() => nav_SetIndex(index)}><a href={`#${element}`}>{element}</a></div>
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
      <div className='flex relative justify-center items-center z-10'>
        <div id='DASHBOARD' className="${font_title.variable} ${body_font.variable} flex flex-row text-white p-[5px] w-[100%] mt-[50px] ml-[50px] mr-[50px] mb-[20px] rounded-lg justify-center">
          <div className={`${font_title.variable} ${body_font.variable} flex flex-row text-white p-[5px] w-screen ml-[50px] rounded-lg justify-start items-start`}>
            <div className='block justify-center items-center w-[100%]'>
              <div className='flex flex-row justify-center w-[100%]'>
                <div className='bg-[#ffffff]/10 w-[500px] h-[200px] backdrop-blur-md rounded-3xl m-3'>
                  <div className='w-[500px] flex flex-row justify-between'>
                    <p className='pt-10 pl-[30px] text-xl font-content'>TOTAL SALES</p>
                    <p className='mt-10 mr-[30px] p-[2px] text-xl font-content rounded-md bg-emerald-500 '>+12.5%</p>
                  </div>
                  <p className='text-5xl text-white font-title pl-[30px] pt-[30px]'>${salesSum}</p>
                </div>
                <div className='bg-[#ffffff]/10 w-[500px] h-[200px] backdrop-blur-md rounded-3xl m-3'>
                  <div className='justify-between flex flex-row'>
                    <p className='pt-10 pl-[30px] text-xl font-content'>TOTAL ORDERS</p>
                    <p className='mt-10 mr-[30px] p-[2px] text-xl font-content rounded-md bg-[#f54248]'>-7.5%</p>
                  </div>
                  <p className='text-5xl text-white font-title pl-[30px] pt-[30px]'>{salesData_ ? salesData_["orders"]["amount"] : 0}</p>
                </div>
                <div className='bg-[#ffffff]/10 w-[500px] h-[200px] backdrop-blur-md rounded-3xl m-3'>
                  <div className='justify-between flex flex-row'>
                    <p className='pt-10 pl-[30px] text-xl font-content'>TOTAL REVENUE</p>
                    <p className='mt-10 mr-[30px] p-[2px] text-xl font-content rounded-md bg-emerald-500'>+7.2%</p>
                  </div>
                  <p className='text-5xl text-white font-title pl-[30px] pt-[30px]'>$ {(salesData_ ? salesData_["Raw"] + salesData_["final_pdt"] : 0)}</p>
                </div>
              </div>
              <div className="w-[100%] justify-center flex flex-row">
                <div className='bg-[#ffffff]/10 w-[1550px] justify-center backdrop-blur-md h-[550px] m-3 rounded-lg'>
                  <ResponsiveContainer width="100%" height="100%" >
                    <AreaChart width={730} height={250} data={graphData_}
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
                      <XAxis />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="Raw" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                      <Area type="monotone" dataKey="final_pdt" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-[100%]">
              <div className='block'>
                <div className='bg-[#ffffff]/10 w-[500px] backdrop-blur-md h-[650px] rounded-3xl m-3'>
                  <p className='pt-10 pl-[30px] text-4xl font-content text-left'>ORDER STATISTICS</p>
                  {order_statistics.map((row, index) => <div key={`r_${index}`} className='flex flex-row pl-[30px] pt-[5px]'>
                    <div className="font-content text-white text-xl text-center m-[20px]">{`${index + 3}:00 PM`}</div>
                    {row.map((value, value_index) => <div key={`c_${index}_${value_index}`} className={`${value == true ? 'w-[50px] h-[50px] bg-emerald-500/90 m-[10px] rounded-lg' : 'w-[50px] h-[50px] bg-emerald-500/30 m-[10px] rounded-lg'}`}></div>)}
                  </div>)}
                </div>
                <div className='bg-[#ffffff]/10 w-[500px] backdrop-blur-md h-[115px] rounded-3xl m-3 justify-center items-center'>
                  <h1 className="text-xl font-bold m-4 p-4 font-content">Target reached - 30%</h1>
                  <ProgressBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="PRODUCTS" className='flex flex-row relative ml-10'>
        <div className={`${font_title.variable} ${body_font.variable} bg-[#ffffff]/10 w-[1548px] backdrop-blur-md h-[515px] rounded-3xl ml-[30px] mb-[70px] justify-center items-center`}>
          <p className="font-title mt-1 p-10 text-white text-2xl">Top Selling Products</p>
          <div className="w-[100%] bg-black/10 rounded-lg h-[300px] overflow-y-auto p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="font-title text-xl text-white border-b-2 border-white/30">
                  <th className="p-4 text-center">ID</th>
                  <th className="p-4 text-center">NAME</th>
                  <th className="p-4 text-center">EARNING</th>
                </tr>
              </thead>
              <tbody>
                {earning.slice(0, 5).map((value, index) => (
                  <tr key={index} className="font-content text-base text-white border-b border-white/20">
                    <td className="p-4 text-right">{index + 1}</td>
                    <td className="p-4 text-right">{value["Item Name"]}</td>
                    <td className="p-4 text-right">{value["Earnings"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={`${font_title.variable} ${body_font.variable} bg-[#ffffff]/10 w-[500px] backdrop-blur-md h-[515px] rounded-3xl ml-[30px] mb-[70px] justify-center items-center`}>
          <p className="font-title pt-7 pl-7 text-white text-2xl">Gross Product Chart</p>
          <div>
            <PieChart width={450} height={450} className='justify-center items-center'>
              <Pie
                activeIndex={activeIndex}
                data={earning.slice(0, 5)}
                dataKey="Earnings"
                outerRadius={130}
                fill="green"
                onMouseEnter={onPieEnter}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                {earning.slice(0, 5).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
      <div className={`${font_title.variable} ${body_font.variable} backdrop-blur-md min-h-[...] rounded-3xl ml-[30px] mr-[30px] justify-center items-center`}>
        <p className="text-3xl text-white font-title text-center p-10">PRODUCTS</p>
        <div className="w-[100%] rounded-3xl h-[900px] overflow-y-auto p-4 bg-[#1c1c1c]/40">
          <table className="w-full border-collapse rounded-xl">
            <thead>
              <tr className="font-title text-xl text-white border-b-2 border-white/30">
                <th className="p-4 text-center">ID</th>
                <th className="p-4 text-center">Item Name</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Type</th>
                <th className="p-4 text-center">Weight</th>
              </tr>
            </thead>
            <tbody>
              {
                itemList.map((value, index) => (
                  <tr key={index} className="font-content text-base text-white border-b border-white/20">
                    <td className="p-4 text-right">{index + 1}</td>
                    <td className="p-4 text-right">{value["Item Name"]}</td>
                    <td className="p-4 text-right">{value["Price"]}</td>
                    <td className="p-4 text-right">{value["Stock"]}</td>
                    <td className="p-4 text-right">{value["Type"]}</td>
                    <td className="p-4 text-right">{value["Weight"]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${font_title.variable} ${body_font.variable} backdrop-blur-md min-h-[...] rounded-3xl ml-[30px] mr-[30px] justify-center items-center`}>
        <p className="text-3xl text-white font-title text-center p-10">ORDERS</p>
        <div className="w-[100%] rounded-3xl h-[450px] overflow-y-auto p-4 bg-[#1c1c1c]/40">
          <table className="w-full border-collapse rounded-xl">
            <thead>
              <tr className="font-title text-xl text-white border-b-2 border-white/30">
                <th className="p-4 text-center">ID</th>
                <th className="p-4 text-center">Item Name</th>
                <th className="p-4 text-center">Username</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {
                orderList.map((value, index) => (
                  !value["Item Name"].toString().includes("NIL") ? <tr key={index} className="font-content text-base text-white border-b border-white/20">
                    <td className="p-4 text-right">{index}</td>
                    <td className="p-4 text-right">{value["Item Name"]}</td>
                    <td className="p-4 text-right">{value["User"]}</td>
                    <td className="p-4 text-right">{value["Price"]}</td>
                    <td className="p-4 text-right">{value["Qty"]}</td>
                  </tr> : null
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${font_title.variable} ${body_font.variable} backdrop-blur-md min-h-[...] rounded-3xl ml-[30px] mr-[30px] justify-center items-center`}>
        <p className="text-3xl text-white font-title text-center p-10">USERS</p>
        <div className="w-[100%] rounded-3xl h-[450px] overflow-y-auto p-4 bg-[#1c1c1c]/40">
          <table className="w-full border-collapse rounded-xl">
            <thead>
              <tr className="font-title text-xl text-white border-b-2 border-white/30">
                <th className="p-4 text-white text-center">ID</th>
                <th className="p-4 text-center">EMAIL</th>
                <th className="p-4 text-center">USERNAME</th>
                <th className="p-4 text-center">ORDERS</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(usrData).map((value, index) => {
                  return (!value.includes("vitstudent") ? <tr key={value} className="font-content text-base text-white border-b border-white/20">
                    <td className="p-4 text-center">{index + 1}</td>
                    <td className="p-4 text-center">{value.toString().replaceAll(",", ".")}</td>
                    <td className="p-4 text-center">{usrData.get(value).get("username")}</td>
                    <td className="p-4 text-center">{usrData.get(value).get("orders").map((value:Map<string,any>, index:number) => value.get("Item Name") != "NIL" ? (<p className=" p-1 text-center" key={index}>{`${value.get("Item Name")} x ${value.get("Qty")}`}</p>) : null)}</td>
                  </tr> : null)
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Employee
