"use client";
import styles from "@/components/featureSection/feature.module.css";
import Navbar from "../navbar/navbar";
import { useEffect, useRef } from "react";

export default function Feature() {
  const aniRef = useRef(null)
  function bgStyle() {
    const heading = document.getElementById("landing-heading");
    if (heading) {
      heading.style.opacity = 1 - window.pageYOffset / 900;
      heading.style.backgroundSize = 160 - window.pageYOffset / 12 + "%";
    }
  }
  
  function loadingAnimation(){
    const text  = "FUEL YOUR PASSION IGNITE THE GAME"
    const text2  = "Get the info on the latest sports events, players, and blogs on various sports."
    const textArray = text.split("")
    const textArray2 = text2.split("")
    const heading = document.getElementById('landing-heading')
    const para = document.getElementById('landing-paragraph')
      let i = 0;
      let j = 0
      if(aniRef.current){
        clearInterval(aniRef.current)
      }
      
      aniRef.current = setInterval(() => {
        if(i < textArray.length){
          heading.innerHTML += textArray[i]
          i++
        }
        else if( j < textArray2.length){
          para.innerHTML += textArray2[j]
          j++
        }
        else {
          clearInterval(aniRef.current)
          
        }
      }, 100);
       
    
   }

  
    useEffect(() => {
       loadingAnimation()
    },[])
  
  return (
    <div className={`${styles.features}`}>
      <div className={`${styles.right} w-full overflow-hidden h-full`}>
        <div className="feature_box h-full px-5 py-20 sm:px-10 lg:px-20 lg:py-40 xl:px-40 2xl:px-60 flex flex-col items-start  gap-4">
          <h1
            id="landing-heading"
            className={`${styles.heading} font-extraBold tracking-normal text-[3.5rem] text-wrap md:text-[6rem] xl:text-[8rem] leading-none  text-slate-100`}
          >
           
          </h1>

          <p  id="landing-paragraph" className="text-xs sm:text-sm xl:text-xl tracking-wider">
             </p>
          <button className="py-2 font-bold text-xs sm:text-sm xl:text-xl hover:bg-white hover:text-black px-4 sm:px-6 border-2 border-white">
            READ MORE
          </button>
        </div>
      </div>
    </div>
  );
}
