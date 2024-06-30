"use client";
import Nav from "@/components/nav";
import Banner from "@/components/banner";
import Spec from "@/components/spec";
import Footer from "@/components/footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";


async function fetchData(id) {
  const res = await axios.get(`/api/v1/specs/museum/${id}`).catch((error) => {
    if (error.response) {
    return error.response.data;
    }})

    return res.data;
}

function Page({ params }) {
  const { id } = params;
  
  // Use useEffect to fetch data and store it in state
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    fetchData(id).then(data => {
      setItemData(data);
    });
  }, [id]);

  if (!itemData) {
    return <div>          
      <h1 className="text-center text-2xl font-bold">Loading</h1><HashLoader 
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


  return (
    <>
      <Nav activeItem="Search"/>
      <Banner title={String(itemData.data['Artefact Title'])} breadcrumb={["Back to Search"]}/>
      <Spec imageurl="/placeholdbig.svg" desc={Object.entries(itemData.data).map(([key, value], index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<p key={index}>{`${key}: ${value}`}</p>
      ))} />
      <Footer />
    </>
  );
}

export default Page;
