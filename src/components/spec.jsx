"use client";
import { Button } from "./ui/button";
import Image from "next/image";

function Spec({imageurl, desc}){
    return(
        <div className="flex justify-center h-full">
        <main className="mt-12 w-[96%] max-w-[1276px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <aside className="flex flex-col w-[38%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col justify-start py-8 w-full text-lg rounded-lg border border-solid shadow-sm bg-zinc-950 border-zinc-800 text-zinc-900 max-md:mt-10 max-md:max-w-full">
                <Image
                  src={imageurl}
                  alt="Agastya Maharishi"
                  className="self-center max-w-full aspect-[0.66] w-[290px]"
                />
              </div>
            </aside>
            <article className="flex flex-col ml-5 w-[62%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow pb-5 w-[100vh] text-xl font-semibold rounded-lg border border-solid shadow-sm bg-zinc-950 border-zinc-800 text-neutral-50 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col justify-center p-8 max-md:px-5 max-md:max-w-[100vh]">
                  <p className="justify-center max-md:max-w-[100vh] text-wrap overflow-hidden">
                    {desc}</p>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>
    )
}

export default Spec;