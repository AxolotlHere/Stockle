'use client';

import React, { useEffect, useMemo, useState, Suspense } from 'react'
import ParticleHolder from '../components/particleBg';
import Image from "next/image";
import { Kanit, Rubik } from "next/font/google";
import { getData, getItemData, placeOrder, getOrderUser, removeOrder } from '../backend/firebase_';
import { useSearchParams } from 'next/navigation';

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

const Customer = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Cust/>
    </Suspense>
  )
}


const Cust = () => {
  const [itemData, setItemData] = useState<any[]>([])
  const [orderData, setOrderData] = useState<any[]>([])
  const [search_, setSearch] = useState("");
  const [qtyArr, setQtyArr] = useState(Array(35).fill(0));
  const particles = useMemo(() => <ParticleHolder />, [])
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  console.log("it is", email);
  var data = getData(email ? email : "");
  console.log(data)

  const order_ = async () => {
    await getOrderUser(email ?? "").then((onValue) => {
      setOrderData(onValue);
    })
  }

  const item_ = async () => {
    await getItemData().then(
      (onValue) => {
        setItemData(onValue);
      }
    )
  }
  const handleAddToCart = async (itemName: string, qty: number) => {
    if (qty) {
      if (!isNaN(qty)) {
        await placeOrder(email ?? "", itemName, qty);
      } else {
        alert("Invalid number");
      }
    }
  };

  useEffect(() => {
    item_(); order_()
  }, [])


  return (
    <>
      {particles}
      <div className='flex relative justify-center items-center z-10'>
        <div className={`${font_title.variable} ${body_font.variable} flex flex-row text-white p-[5px] bg-[#1c1c1c] w-[100%] mt-[50px] ml-[50px] mr-[50px] mb-[20px] rounded-lg justify-between items-center`}>
          <div className='font-title text-center text-2xl pl-10'><a href="/">STOCKLE</a></div>
          <div className="flex flex-row w-[100%] ml-[50px] mr-[75px]">
            <input value={search_} onChange={(e) => {
              setSearch(e.target.value)
              console.log(e.target.value);
            }} placeholder="⌕  Enter the product" className="bg-transparent border-emerald-500 font-content text-white p-2 w-[100%] rounded-lg" />
          </div>
          <div className='flex flex-row p-5 justify-center items-center'>
            <div className='ml-5 rounded-xl border-emerald-500'><Image src="/message.png" width={25} height={25} alt='not found' color='white'></Image></div>
            <div className='ml-5 rounded-xl border-emerald-500'><Image src="/notif.png" width={25} height={25} alt='not found' color='white'></Image></div>
            <div className='ml-5'><Image src="/senku.jpg" width={40} height={40} alt='not found' color='white' className='rounded-full'></Image></div>
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
                <th className="p-4 text-center">Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {
                itemData.map((value, index) => (
                  value["Item Name"].toString().toLowerCase().includes(search_.toString().toLowerCase()) ? <tr key={index} className="font-content text-base text-white border-b border-white/20">
                    <td className="p-4 text-right">{index + 1}</td>
                    <td className="p-4 text-right">{value["Item Name"]}</td>
                    <td className="p-4 text-right">{value["Price"]}</td>
                    <td className="p-4 text-right">{value["Stock"]}</td>
                    <td className="p-4 text-right">{value["Type"]}</td>
                    <td className="p-4 text-right">{value["Weight"]}</td>
                    <td className="p-4 text-center">
                      <input
                        placeholder="ADD"
                        type="text"
                        className="font-content pl-2 rounded-md bg-[#1c1c1c] text-white w-[90px]"
                        onChange={(e) => {
                          console.log("CH VALUE", e.target.value)
                          var val_ = qtyArr;
                          val_[index] = parseInt(e.target.value);
                          setQtyArr(val_);
                          console.log(val_);
                        }} />
                      <input
                        value="+"
                        type="button"
                        className="font-bold text-white bg-[#1c1c1c]/80 font-content ml-3 p-1 pl-3 pr-3 rounded-full border-2 hover:border-emerald-500 hover:bg-white hover:text-black transition"
                        onClick={() => {
                          handleAddToCart(value["Item Name"], qtyArr[index]).then((e) => {
                            item_(); order_();
                            alert("Order placed successfully")
                          })
                        }
                        }
                      />
                    </td>
                  </tr> : null
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${font_title.variable} ${body_font.variable} backdrop-blur-md  rounded-3xl m-[30px] min-h-[...]`}>
        <p className="text-3xl text-white font-title text-center p-10">ORDER LIST </p>
        <div className="w-[100%] h-[900px] rounded-3xl overflow-y-auto p-4 bg-[#1c1c1c]/40">
          <table className="w-full border-collapse rounded-xl">
            <thead>
              <tr className="font-title text-xl text-white border-b-2 border-white/30">
                <th className="p-4 text-center">ID</th>
                <th className="p-4 text-center">Item Name</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Quantity</th>
                <th className="p-4 text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {
                orderData.map((value, index) => (
                  !value["Item Name"].toString().toLowerCase().includes("nil") ? <tr key={index} className="font-content text-base text-white border-b border-white/20">
                    <td className="p-4 text-right">{index}</td>
                    <td className="p-4 text-right">{value["Item Name"]}</td>
                    <td className="p-4 text-right">{value["Price"]}</td>
                    <td className="p-4 text-right">{value["Qty"]}</td>
                    <td className="p-4 text-center">
                      <input
                        className="font-bold text-white bg-[#1c1c1c]/80 font-content ml-3 p-1 pl-3 pr-3 text-[30px] rounded-full border-2 hover:border-emerald-500 hover:bg-white hover:text-black transition"
                        value="-"
                        type="button"
                        onClick={() => {
                          const myMap = new Map<string, any>();
myMap.set("Item Name", value["Item Name"]);
myMap.set("Price", value["Price"]);
myMap.set("Qty", value["Qty"]);
myMap.set("User", email ? email.replaceAll(".", ",") : "");
                          removeOrder(email ?? "", index, myMap).then(
                            (e) => {
                              alert("Removed successfully");
                              item_(); order_();
                            }
                          )

                        }}
                      />
                    </td>
                  </tr> : null
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}


export default Customer
