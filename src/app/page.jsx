"use client";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import { Globe } from "@/components/world";

function Home() {
  const breadcrumbs = ["Home"];
  return (
    <>
      <div className="md:h-[100vh] lg:h-[100vh]">
      <Nav activeItem={"Home"} />
      <Banner breadcrumb={breadcrumbs} />
      <div className="flex flex-col md:flex-row flex-grow w-full">
        <div className="md:flex-1 flex flex-col xl:gap-8 text-center mx-8 md:text-left py-10 md:justify-start">
          <h1 className="text-[46px] font-bold">
            The <span
            style={{WebkitBackgroundClip: 'text',backgroundClip: 'text',WebkitTextFillColor: 'transparent',textFillColor: 'transparent'}}className="bg-[radial-gradient(circle_at_center,#6AC573,#15D4FF)] font-bold">catalogue    </span>  of ancient Indian artefacts and scriptures.</h1>
          <p>
          Museums help teach, inspire, and connect communities. Visiting the museums benefits the Indian community residing in the USA to understand their culture, art, and history. 
          </p>
          <p>
            Libraries, being rich repositories of historically and culturally significant collections, are a gateway to knowledge. They play a significant role in preserving the culture and heritage for the future generations.
          </p>
          <p>
          We are pleased to share with you about many Seers Saints and Eminent Persons who are embodiment of ancient Indian culture, tradition and heritage. In this site you will find curated information and digital catalog and content pertinent to these great Seers, Saints and Eminent persons. In addition we have also curated a list of Indian Artefacts (Sculptures, Paintings, Manuscripts etc) that are available in various museums.  
          </p>
        </div>
            <Globe className="flex m-0 p-0" />


        
      </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;


