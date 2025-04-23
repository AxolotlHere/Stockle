'use client'

import React from "react";
import { Rubik, Kanit } from "next/font/google";
import ParticleHolder from "./components/particleBg";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useRouter } from "next/navigation";

const title = Kanit({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-title",
  display: "swap",
});

const body_font = Rubik({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-content",
  display: "swap",
});

const MainPage = () => {
  const router = useRouter()
  return (
    <>
      <ParticleHolder />
      <div className={`${title.variable} ${body_font.variable}  bg-black w-screen justify-center items-center overflow-hidden`}>
        <div className="w-screen h-min flex flex-row justify-center items-center mt-[50px]">
          <img src="/bg_1.png" width="125px" height="125px" />
        </div>
        <div className="items-center w-screen h-min justify-center bg-center bg-no-repeat p-[10px]">
          <h1 className="font-title place-content-center text-9xl text-white fontc-extrabold tracking-wide text-center">
            STOCKLE</h1>
          <pre className="font-title place-content-right text-xl  text-white font-extrabold pt-10 text-center">
            REVOLUTIONIZE INVENTORY MANAGEMENT—PREDICT, AUTOMATE, AND OUTPACE THE
            <br />
            COMPETITION BEFORE THEY CATCH UP!
          </pre>
        </div>
        <div className="flex flex-row items-center justify-center w-screen">
          <CardContainer className="inter-var">
            <CardBody className="bg-[url('/factory.jpg')] bg-cover relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="font-content text-xl font-bold text-white dark:text-white text-center"
              >
                TOUR TO THE FORGE
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="font-content text-white text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                VISIT OUR FORGE WHERE WE SMELT OUR DREAMS AND HOPE, MOLD OUR PASSION AND DESIRE INTO A SINGLE BLADE THAT CROSSES PATH WITH THE OBSTACLES IN THE WAY OF REVOLUTIONISING THE FUTURE
              </CardItem>
              <div className="flex justify-end items-center mt-20">
                <a href="https://maps.app.goo.gl/GjErEAxyHryryF4K9" target="_blank">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    VISIT THE FORGE
                  </CardItem>
                </a>
              </div>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var p-10 w-200 h-200">
            <CardBody className="bg-[url('/factory_1.jpg')] bg-cover w-400 h-300 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="font-content text-xl font-bold text-white dark:text-white text-center"
              >
                OPTIMIZE. FOCUS. ACHIEVE. REPEAT.
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="font-content text-white text-sm max-w-sm mt-2 dark:text-neutral-300 "
              >
                JOIN US TO INNOVATE, GROW, AND SHAPE THE FUTURE—WHERE PASSION MEETS PURPOSE, AND EVERY IDEA DRIVES REAL-WORLD IMPACT AND SUCCESS!<br />
                LOOK FOR  OPPOURTUNITIES IN OUR COMPANY
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  onClick={() => {
                    router.push("/login")
                  }}
                >
                  LOGIN
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  onClick={
                    () => {
                      router.push("/reg")
                    }
                  }
                >
                  SIGN UP
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var">
            <CardBody className="bg-[url('/factory_2.jpg')] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="font-content text-xl font-bold text-white dark:text-white"
              >
                READ OURS BLOGS
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="font-content text-white text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                "EXPLORE OUR INSIGHTFUL BLOGS FOR EXPERT KNOWLEDGE, INDUSTRY TRENDS, AND INNOVATIVE IDEAS THAT INSPIRE GROWTH, CREATIVITY, AND SUCCESS EVERY DAY!"
              </CardItem>
              <div className="flex justify-end items-center mt-20">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  READ NOW
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </>
  );
};

export default MainPage;
