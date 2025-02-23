'use client';

import React, { useState } from 'react'
import {Kanit,Rubik} from "next/font/google";
import { title } from 'process';
import Image from "next/image";
import ParticleHolder from '../components/particleBg';
import { getRandom } from '@tsparticles/engine';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,PieChart, Pie,Cell } from 'recharts';
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

const pie_chart_data = [
  { name: "Galvanised square steel", Earning: 23543.54},
  { name: "Iron Ores", Earning: 34543.54},
  { name: "Aluminium Frame", Earning: 54543.54},
  { name: "Platinum", Earning: 3543.54},
  { name: "Copper Sheets", Earning: 2068.50}
]

const product_list = [
  {
    "Item Name": "Stainless Steel Rod",
    "Price": "$120.45",
    "Stock": 42,
    "Weight": "2.5kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Copper Wire Roll",
    "Price": "$75.30",
    "Stock": 85,
    "Weight": "1.2kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Aluminium Sheet",
    "Price": "$45.99",
    "Stock": 60,
    "Weight": "3.0kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Brass Pipe",
    "Price": "$89.20",
    "Stock": 34,
    "Weight": "4.5kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Titanium Bar",
    "Price": "$320.80",
    "Stock": 15,
    "Weight": "1.8kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Carbon Steel Plate",
    "Price": "$150.55",
    "Stock": 22,
    "Weight": "6.5kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Nickel Alloy Coil",
    "Price": "$275.60",
    "Stock": 19,
    "Weight": "5.0kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Galvanized Iron Sheet",
    "Price": "$95.40",
    "Stock": 50,
    "Weight": "2.8kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Bronze Cast Plate",
    "Price": "$180.30",
    "Stock": 26,
    "Weight": "3.2kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Lead Ingot",
    "Price": "$215.90",
    "Stock": 30,
    "Weight": "7.8kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Silver Flakes",
    "Price": "$540.75",
    "Stock": 10,
    "Weight": "500g",
    "Type": "Precious Metal"
  },
  {
    "Item Name": "Gold Plated Strip",
    "Price": "$925.60",
    "Stock": 5,
    "Weight": "400g",
    "Type": "Precious Metal"
  },
  {
    "Item Name": "Platinum Rod",
    "Price": "$1120.90",
    "Stock": 7,
    "Weight": "600g",
    "Type": "Precious Metal"
  },
  {
    "Item Name": "Palladium Bar",
    "Price": "$1350.45",
    "Stock": 4,
    "Weight": "550g",
    "Type": "Precious Metal"
  },
  {
    "Item Name": "Zinc Sheet",
    "Price": "$40.25",
    "Stock": 70,
    "Weight": "1.5kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Magnesium Alloy",
    "Price": "$99.60",
    "Stock": 45,
    "Weight": "3.4kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Silicon Carbide Brick",
    "Price": "$38.40",
    "Stock": 80,
    "Weight": "2.2kg",
    "Type": "Industrial Material"
  },
  {
    "Item Name": "Tungsten Carbide Plate",
    "Price": "$289.75",
    "Stock": 14,
    "Weight": "5.6kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Graphite Electrode",
    "Price": "$145.90",
    "Stock": 28,
    "Weight": "4.2kg",
    "Type": "Industrial Material"
  },
  {
    "Item Name": "Beryllium Copper Sheet",
    "Price": "$195.80",
    "Stock": 20,
    "Weight": "3.8kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Cobalt Alloy Bar",
    "Price": "$310.55",
    "Stock": 12,
    "Weight": "2.9kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Lithium Battery Plate",
    "Price": "$120.75",
    "Stock": 35,
    "Weight": "1.7kg",
    "Type": "Industrial Material"
  },
  {
    "Item Name": "Rare Earth Oxide",
    "Price": "$530.30",
    "Stock": 9,
    "Weight": "600g",
    "Type": "Rare Material"
  },
  {
    "Item Name": "Molybdenum Sheet",
    "Price": "$245.60",
    "Stock": 17,
    "Weight": "4.0kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Silicon Steel Coil",
    "Price": "$85.90",
    "Stock": 55,
    "Weight": "2.1kg",
    "Type": "Metal"
  },
  {
    "Item Name": "High Strength Steel",
    "Price": "$205.70",
    "Stock": 24,
    "Weight": "6.2kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Superalloy Sheet",
    "Price": "$395.90",
    "Stock": 11,
    "Weight": "3.5kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Wrought Iron Rail",
    "Price": "$130.20",
    "Stock": 40,
    "Weight": "8.4kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Insulated Copper Wire",
    "Price": "$65.40",
    "Stock": 90,
    "Weight": "1.0kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Heavy Duty Titanium",
    "Price": "$515.80",
    "Stock": 13,
    "Weight": "2.3kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Pewter Alloy Sheet",
    "Price": "$135.25",
    "Stock": 48,
    "Weight": "4.1kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Neodymium Magnet",
    "Price": "$260.90",
    "Stock": 18,
    "Weight": "500g",
    "Type": "Rare Material"
  },
  {
    "Item Name": "Zirconium Tube",
    "Price": "$280.65",
    "Stock": 16,
    "Weight": "3.6kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Seamless Aluminium Pipe",
    "Price": "$78.90",
    "Stock": 58,
    "Weight": "2.7kg",
    "Type": "Metal"
  },
  {
    "Item Name": "Cast Iron Cylinder",
    "Price": "$165.40",
    "Stock": 32,
    "Weight": "7.0kg",
    "Type": "Metal"
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Employee = () => {
  const [nav_index,nav_SetIndex] = useState(0);
  console.log(nav_index);
  const [activeIndex, setActiveIndex] = useState(-1);
  const nav_elements = ["DASHBOARD","PRODUCTS","ORDERS","CUSTOMERS","STATISTICS"] 
  const onPieEnter = (_: unknown, index: number): void => {
    setActiveIndex(index);
  };
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
        <h1 className="text-xl font-bold m-4 p-4 font-content">Target reached - 30%</h1>
        <ProgressBar/>
        </div>
        </div>
      </div>
      </div>
      <div id="PRODUCTS" className='flex flex-row'>
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
      <div className={`${font_title.variable} ${body_font.variable} bg-[#ffffff]/10 w-[500px] backdrop-blur-md h-[515px] rounded-3xl ml-[30px] mb-[70px] justify-center items-center`}>
      <p className="font-title pt-7 pl-7 text-white text-2xl">Gross Product Chart</p>
      <div>
      <PieChart width={450} height={450} className='justify-center items-center'>
      <Pie
                activeIndex={activeIndex}
                data={pie_chart_data}
                dataKey="Earning"
                outerRadius={130}
                fill="green"
                onMouseEnter={onPieEnter}
                style={{ cursor: 'pointer', outline: 'none' }}
            >
                {pie_chart_data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
      </PieChart>
      </div>
      </div>
      </div>
      <div id="PRODUCT" className={`w-[95%] ${font_title.variable} ${body_font.variable}'`}>
      <table className={`w-[90%] m-10 border-collapse rounded-lg backdrop-blur-md bg-[#ffffff]/10`}>
    <thead>
      <tr className="font-title text-xl text-white border-b-2 border-white/30">
        <th className="p-4 text-center">ITEM NAME</th>
        <th className="p-4 text-center">PRICE</th>
        <th className="p-4 text-center">STOCK</th>
        <th className="p-4 text-center">VOLUME</th>
        <th className="p-4 text-center">TYPE</th>
      </tr>
    </thead>
    <tbody>
      {product_list.map((value, index) => (
        <tr key={index} className="font-title text-base text-white border-b border-white/20">
          <td className="p-4 text-right">{value["Item Name"]}</td>
          <td className="p-4 text-right">{value["Price"]}</td>
          <td className="p-4 text-right">{value["Stock"]}</td>
          <td className="p-4 text-right">{value["Weight"]}</td>
          <td className="p-4 text-right">{value["Type"]}</td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>
    </>
  )
}

export default Employee