"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import EmbeddedSearch from "./embed";
import { useState } from "react";
function Person({imageurl, desc, name}){
   const [show, setShow] = useState(false);
    return(
        <><div className="flex justify-center h-full">
        <main className="mt-12 w-[96%] max-w-[1276px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <aside className="flex flex-col w-[38%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col justify-start py-8 w-full text-lg rounded-lg border border-solid shadow-sm border-zinc-800 text-zinc-900 max-md:mt-10 max-md:max-w-full">
                <Image
                  src={imageurl}
                  alt="Maharishi"
                  width={290}
                  height={439}
                  className="self-center max-w-full aspect-[0.66] w-[290px]" />
                <div className="flex flex-col justify-between px-8 pb-8 mt-6 max-md:px-5 max-md:max-w-full">
                  <Button className="flex justify-center items-center px-5 py-2.5" onClick={() => setShow(!show)}>                    Browse Catalouge items
                  </Button>
                </div>
              </div>
            </aside>
            <article className="flex flex-col ml-5 w-[62%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow pb-5 w-full text-xl font-semibold rounded-lg border border-solid shadow-sm  border-zinc-800  max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col justify-center p-8 max-md:px-5 max-md:max-w-full">
                  <p className="justify-center max-md:max-w-full">
                    {desc}</p>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>{show && <EmbeddedSearch query={name}/>}</>
    )
}

export default Person;