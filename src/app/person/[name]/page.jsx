"use client";
import Nav from "@/components/nav";
import Banner from "@/components/banner";
import Person from "@/components/person";
import Footer from "@/components/footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";


async function fetchData(name) {
  const res = await axios.get(`/api/v1/person/${name}`).catch((error) => {
    if (error.response) {
    return error.response.data;
    }})

    return res.data;
}

function Page({ params }) {
  const { name } = params;
  
  // Use useEffect to fetch data and store it in state
  const [personData, setPersonData] = useState(null);

  useEffect(() => {
    fetchData(name).then(data => {
      setPersonData(data);
    });
  }, [name]);

  if (!personData) {
    return <div>          <h1 className="text-center text-2xl font-bold">Loading</h1><HashLoader 
    color="ffffff"
    cssOverride={{
      'margin-left': 'auto',
      'margin-right': 'auto'
    }}
    loading={true}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
    /></div>;  
  }

  const { _id, Name, imageurl, desc, catergory } = personData;

  return (
    <>
      <Nav activeItem="People"/>
      {/* file deepcode ignore GlobalReplacementRegex: <please specify a reason of ignoring this> */}
      <Banner title={Name.replace("_", " ").replace("_", " ")} breadcrumb={["Home", "People", catergory, Name.replace("_", " ")]}/>
      <Person imageurl={imageurl} desc={desc} />
      <Footer />
    </>
  );
}

export default Page;
