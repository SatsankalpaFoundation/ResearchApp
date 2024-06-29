"use client";
import Image from 'next/image'
import { cva } from "class-variance-authority"

import { ChevronDown, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import PropTypes from 'prop-types'
import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { ScrolllArea } from "@/components/ui/scroll-area"


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionItemTrigger,
} from "@/components/ui/accordion"

import { Label } from "@/components/ui/label";
import Link from "next/link";

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

export default function Nav({ activeItem = "Home" }) {
  const navigationMenuTriggerStyle = cva(
    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
  );
  const logo =
    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium";

  const item =
    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent select-none";
  const active = "bg-accent/50";
  const isDesktop = useMediaQuery('(min-width: 960px)')
  if (isDesktop) {
    return (
      <div className="flex justify-center p-3">
        <NavigationMenu className="">
          <NavigationMenuList className="flex flex-row gap-3">
            <NavigationMenuItem className={cn(logo)}><Image src={"/logo.png"} alt="Satsankalpa Research Logo" width="50" height="50" /></NavigationMenuItem>
            <NavigationMenuItem className={cn(item, activeItem === "Home" && active)}><Link href="/">Home</Link></NavigationMenuItem>
            <NavigationMenuItem className={cn(item, activeItem === "About" && active)}><Link href="/about">About</Link></NavigationMenuItem>
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(navigationMenuTriggerStyle(), "group", activeItem === "People" && active)}
                >
                  People{" "}
                  <ChevronDown
                    className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Seers</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem><Link href="/person/Agastya_Maharshi">Agastya Maharshi</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Atri_Maharshi">Atri Maharshi</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Bhrigu_Mahrshi">Bhrigu Mahrshi</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Bharadwaja_Maharshi">Bharadwaja Maharshi</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Garga_Maharshi">Garga Maharshi</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Kasyapa_Maharshi">Kasyapa Maharshi</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Vedavyasa_Maharshi">Vedavyasa Maharshi</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Saints</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem><Link href="/person/Sri_AdiShankaracharya">Sri AdiShankaracharya</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Sri_Ramanujarcharya">Sri Ramanujarcharya</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Sri_Madvacharya">Sri Madvacharya</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Sri_Chaithanya_Mahaprabhu">Sri Chaithanya Mahaprabhu</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Sri_Sundarar">Sri Sundarar</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Eminent Contributors</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem><Link href="/person/Sri_Sivananda_Murthy">Sri Sivananda Murthy</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Sri_Krishnadevaraya">Sri Krishnadevaraya</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Sri_Shivaji_Maharaj">Sri Shivaji Maharaj</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Sri_Tallapaka_Annamacharya">Sri Tallapaka Annamacharya</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Sri_Thyagaraja">Sri Thyagaraja</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/person/Sri_Prathaparudra">Sri Prathaparudra</Link></DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(navigationMenuTriggerStyle(), "group", activeItem === "Artefacts" && active)}
                >
                  Artefacts{" "}
                  <ChevronDown
                    className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem><Link href="/search?q=sculptures">Sculptures</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/search?q=paintings">Paintings</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/search?q=manuscripts">Manuscripts</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/search?q=other">Other</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            <NavigationMenuItem
              className={cn(item, activeItem === "Search" && active)}>
              <Link href="/search">Search</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center p-3">
        <Sheet>
          <NavigationMenu className="">
            <NavigationMenuList className="flex flex-row gap-3">
              <NavigationMenuItem className={cn(item)}><SheetTrigger><Menu /></SheetTrigger></NavigationMenuItem>
              <NavigationMenuItem className={cn(logo)}><Image src={"/logo.png"} alt="Satsankalpa Research Logo" width="50" height="50" /></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <SheetContent side='left'>
            <ScrolllArea className="h-full w-full ">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <SheetDescription>
                <Accordion type='multiple' collapsible className='w-full'>
                  <AccordionItem value="01" className={cn(activeItem === "Home" && active)}><AccordionItemTrigger><Link href="/">Home</Link></AccordionItemTrigger></AccordionItem>
                  <AccordionItem value="02" className={cn(activeItem === "About" && active)}><AccordionItemTrigger><Link href="/about">About</Link></AccordionItemTrigger></AccordionItem>
                  <AccordionItem value="1" className={cn(activeItem === "People" && active)}>
                    <AccordionTrigger>People</AccordionTrigger>
                    <AccordionContent>
                      <Accordion type='multiple' collapsible>
                        <AccordionItem value="11">
                          <AccordionTrigger>Seers</AccordionTrigger>
                          <AccordionContent>
                            <Accordion type='multiple' collapsible className='w-full'>
                              <AccordionItem value="01">
                                  <AccordionItemTrigger><Link href="/person/Agastya_Maharshi">Agastya Maharshi</Link></AccordionItemTrigger>
                              </AccordionItem>
                              <AccordionItem value="02">
                                  <AccordionItemTrigger><Link href="/person/Atri_Maharshi">Atri Maharshi</Link></AccordionItemTrigger>
                              </AccordionItem>
                              <AccordionItem value="03">
                                  <AccordionItemTrigger><Link href="/person/Bhrigu_Mahrshi">Bhrigu Mahrshi</Link></AccordionItemTrigger>
                              </AccordionItem>
                              <AccordionItem value="04">
                                  <AccordionItemTrigger><Link href="/person/Bharadwaja_Maharshi">Bharadwaja Maharshi</Link></AccordionItemTrigger>
                              </AccordionItem>
                              <AccordionItem value="05">
                                  <AccordionItemTrigger><Link href="/person/Garga_Maharshi">Garga Maharshi</Link></AccordionItemTrigger>
                              </AccordionItem>
                              <AccordionItem value="06">
                                  <AccordionItemTrigger><Link href="/person/Kasyapa_Maharshi">Kasyapa Maharshi</Link></AccordionItemTrigger>
                              </AccordionItem>
                              <AccordionItem value="07">
                                  <AccordionItemTrigger><Link href="/person/Vedavyasa_Maharshi">Vedavyasa Maharshi</Link></AccordionItemTrigger>
                              </AccordionItem>
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="12">
                        <AccordionTrigger>Saints</AccordionTrigger>
                          <AccordionContent>
                            <Accordion type='multiple' collapsible className='w-full'>
                            <AccordionItem value="01">
                                <AccordionItemTrigger><Link href="/person/Sri_AdiShankaracharya">Sri AdiShankaracharya</Link></AccordionItemTrigger>
                            </AccordionItem>
                            <AccordionItem value="02">
                                <AccordionItemTrigger><Link href="/person/Sri_Ramanujarcharya">Sri Ramanujarcharya</Link></AccordionItemTrigger>
                            </AccordionItem>
                            <AccordionItem value="03">
                                <AccordionItemTrigger><Link href="/person/Sri_Madvacharya">Sri Madvacharya</Link></AccordionItemTrigger>
                            </AccordionItem>
                            <AccordionItem value="04">
                                <AccordionItemTrigger><Link href="/person/Sri_Chaithanya_Mahaprabhu">Sri Chaithanya Mahaprabhu</Link></AccordionItemTrigger>
                            </AccordionItem>
                            <AccordionItem value="05">
                                <AccordionItemTrigger><Link href="/person/Sri_Sundarar">Sri Sundarar</Link></AccordionItemTrigger>
                            </AccordionItem>
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="13">
                        <AccordionTrigger>Eminent Contributors</AccordionTrigger>
                          <AccordionContent>
                            <Accordion type='multiple' collapsible className='w-full'>
                            <AccordionItem value="01">
                                <AccordionItemTrigger><Link href="/person/Sri_Sivananda_Murthy">Sri Sivananda Murthy</Link></AccordionItemTrigger>
                            </AccordionItem>
                            <AccordionItem value="02">
                                <AccordionItemTrigger><Link href="/person/Sri_Krishnadevaraya">Sri Krishnadevaraya</Link></AccordionItemTrigger>
                            </AccordionItem>
                            <AccordionItem value="03">
                                <AccordionItemTrigger><Link href="/person/Sri_Shivaji_Maharaj">Sri Shivaji Maharaj</Link></AccordionItemTrigger>
                            </AccordionItem>
                            <AccordionItem value="04">
                            <AccordionItemTrigger><Link href="/person/Sri_Tallapaka_Annamacharya">Sri Tallapaka Annamacharya</Link></AccordionItemTrigger>
                              </AccordionItem>
                              <AccordionItem value="05">
                                  <AccordionItemTrigger><Link href="/person/Sri_Thyagaraja">Sri Thyagaraja</Link></AccordionItemTrigger>
                              </AccordionItem>
                              <AccordionItem value="06">
                                  <AccordionItemTrigger><Link href="/person/Sri_Prathaparudra">Sri Prathaparudra</Link></AccordionItemTrigger>
                              </AccordionItem>
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2" className={cn(activeItem === "Artefacts" && active)}><AccordionTrigger>Artefacts</AccordionTrigger>
                          <AccordionContent>
                            <Accordion type='multiple' collapsible className='w-full'>
                            <AccordionItem value="02"><AccordionItemTrigger><Link href="/search?q=sculptures">Sculptures</Link></AccordionItemTrigger></AccordionItem>
                            <AccordionItem value="03"><AccordionItemTrigger><Link href="/search?q=paintings">Paintings</Link></AccordionItemTrigger></AccordionItem>
                            <AccordionItem value="04"><AccordionItemTrigger><Link href="/search?q=manuscripts">Manuscripts</Link></AccordionItemTrigger></AccordionItem>
                            <AccordionItem value="05"><AccordionItemTrigger><Link href="/search?q=other">Other</Link></AccordionItemTrigger></AccordionItem>
                            </Accordion>
                          </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="03" className={cn(activeItem === "Search" && active)}><AccordionItemTrigger><Link href="/search">Search</Link>                  </AccordionItemTrigger></AccordionItem>
                </Accordion>
              </SheetDescription>
            </ScrolllArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );


};

Nav.propTypes = {
  activeItem: PropTypes.string.isRequired
}