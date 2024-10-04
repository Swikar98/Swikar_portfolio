"use client";
import Image from "next/image";
import { socialMediaLinks } from "@/data/herosection/data";
import Heroimage from "@/data/image/swikar.png";
import ReadMorePopup from "@/components/ReadMorePopup";
import { popupData } from "@/data/herosection/data";

export default function Home() {
  return (
    <div className="relative lg:h-[90vh] h-[100vh] flex flex-col items-center justify-center lg:px-20">
      <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-0 lg:gap-52">
        <div className="w-full lg:w-1/2 lg:p-4 p-6 lg:text-left text-center ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Passionate
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
            Frontend Developer
          </h1>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2">
            Elevating User Experiences with Creative Frontend Development.
          </h3>
          <div className="text-sm sm:text-base md:text-lg flex flex-wrap gap-4 lg:text-xl ">
          Hello, it&apos;s me, Swikar! I recently completed my BCA and am passionate about building web applications.
            <ReadMorePopup className="mt-5"
              title={popupData.title}
              shortText={popupData.shortText}
              fullText={popupData.fullText}
            /> <button className="bg-blue-900 text-white p-2 rounded-xl boder-4 border-black"> Hire Me  </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <Image
              src={Heroimage}
              alt="Swikar"
              width={700} 
              height={300} 
              className="rounded-full border-blue-900 
                  border-[15px] w-[42%] 
                  sm:border-[15px] sm:w-[42%] 
                  md:border-[25px] md:w-[50%] 
                  lg:border-[36px] lg:w-[80%] 
                  xl:border-[38px] xl:w-[90%%] h-auto"
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="flex space-x-4 mt-4">
              {socialMediaLinks.map(({ name, icon, url }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-5 flex space-x-6">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <div key={i} className="w-5 h-4 bg-blue-800 
            md:h-4 sm:h-2 lg:h-6 transition-all duration-300 ease-in-out"></div>
          ))}
      </div>
      <div className="absolute top-6 right-0 space-y-6 flex flex-col items-center">
        {Array(6)
          .fill("")
          .map((_, i) => (
            <div key={i} className="w-4 h-5 bg-blue-800 
            md:w-4 sm:w-2 lg:w-6 transition-all duration-300 ease-in-out"></div>
          ))}
      </div>
    </div>
  );
}
