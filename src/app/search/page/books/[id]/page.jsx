"use client";
import Nav from "@/components/nav";
import Banner from "@/components/banner";
import Spec from "@/components/spec";
import Footer from "@/components/footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";

async function fetchData(id) {
  const res = await axios.get(`/api/v1/specs/books/${id}`).catch((error) => {
    if (error.response) {
    return error.response.data;
    }})

    return res.data;
}

function urlformat(url){
  if (!url){
    return "/placeholdbig.svg"
  }
  const array = String(url).split(",");
  if (!array){
    return `https://drive.usercontent.google.com/download?id=${url.slice(33)}`

  }
  return `https://drive.google.com/uc?export=download&id=${array[0].slice(33)}`
  
}


function Page({ params }) {
  const { id } = params;
  
  // Use useEffect to fetch data and store it in state
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    // file deepcode ignore PromiseNotCaughtGeneral: <please specify a reason of ignoring this>
    fetchData(id).then(data => {
      setItemData(data);
    });
  }, [id]);

  if (!itemData) {
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


  return (
    <>
      <Nav activeItem="Search"/>
      <Banner title={String(itemData.data['Book Name'])} breadcrumb={["Back to Search"]}/>
      <Spec imageurl={urlformat(itemData.data["Image of the Book"] || '')} desc={Object.entries(itemData.data).map(([key, value], index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<p key={index}>{`${key}: ${value}`}</p>
      ))} />
      <Footer />
    </>
  );
}

export default Page;
