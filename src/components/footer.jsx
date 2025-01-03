import React, { useState, useEffect } from "react";
import Image from "next/image";
function useMediaQuery(query){
    const [matches, setMatches] = useState(false);
  
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);
  
    return matches;
  }
  const NavItem = ({ text }) => (
    <nav className="mt-8">
      <a href="/" className="text-white hover:underline">
        {text}
      </a>
    </nav>
  );
  
  const navItems = ["Home", "About", "People", "Artefacts", "Search"];
 
function Footer(){
    const isDesktop = useMediaQuery('(min-width: 960px)')
    if (isDesktop) {
        return(<footer className="flex justify-center items-center self-stretch px-16 py-7 mt-40 w-full text-base font-medium whitespace-nowrap bg-zinc-950 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col w-full max-w-[1110px] max-md:max-w-full">
                <div className="flex gap-5 justify-between w-full text-white leading-[140%] max-md:flex-wrap max-md:max-w-full">
                <Image src="/logo.png" alt="Logo" className="h-[50px] w-[50px]"                     width={100}
                    height={100}/>
                <nav className="flex gap-5 justify-between my-auto">
                    <a href="#a">A 403C Registered Non-Profit</a>
                </nav>
                </div>
                < div className="border-t mt-5 border-solid border-white max-w-full" />
                <div className="flex gap-5 justify-between mt-14 w-full text-white leading-[150%] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                <div className="justify-center">satsankalpa.org</div>
                <div className="flex gap-3 border border-black border-solid">
                    <a href="mailto:info@satsankalpa.org">info@satsankalpa.org</a>
                </div>
                </div>
            </div>
        </footer>

        )
    }

    return(

          
              <div className="flex flex-col justify-center items-center px-20 py-8 text-base font-medium leading-6 text-white whitespace-nowrap bg-zinc-950 max-w-[430px]">
                <header>
                  <Image
                    src="/logo.png"
                    alt="Company logo"
                    className="w-[100px] h-[100px] my-auto"
                    width={100}
                    height={100}
                  />
                </header>
                <main className="flex flex-col items-center">
                  <section className="mt-12 text-white leading-[150%]">
                    <a href="https://satsankalpa.org" className="hover:underline">
                      satsankalpa.org
                    </a>
                  </section>
                  <section className="justify-center mt-3 text-white border border-black border-solid leading-[150%]">
                    <a href="mailto:info@satsankalpa.org" className="hover:underline">
                      info@satsankalpa.org
                    </a>
                  </section>
                  <section className="justify-center mt-3 text-white border border-black border-solid leading-[150%]">
                    <a href="#a">A 403C Registered Non-Profit</a>
                  </section>
                </main>
              </div>
    )
}

export default Footer;