// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import BackgroundGradient from "@/components/ui/background-gradient";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
import { Button } from './ui/button';

// Function to fetch data based on query
async function fetchData(query) {
  try {
    const res = await axios.get(`/api/v1/search/${query}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array or a suitable fallback value
  }
}

function urlformat(url){
  if (!url){
    return "/placehold.svg"
  }
  const array = String(url).split(",");
  if (!array){
    return `https://drive.usercontent.google.com/download?id=${url.slice(33)}`
  }
  return `https://drive.google.com/uc?export=download&id=${array[0].slice(33)}`
}

// Embeddable Search Component
const EmbeddedSearch = ({ query }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAndSetData = async () => {
      setIsLoading(true);
      const fetchedData = await fetchData(query);
      let combinedData = [];

      if (Array.isArray(fetchedData.results) && fetchedData.results.length >= 2) {
        const booksHits = fetchedData.results[0]?.hits || [];
        const artefactsHits = fetchedData.results[1]?.hits || [];

        combinedData = [...booksHits, ...artefactsHits];
        combinedData.sort((a, b) => b._rankingScore - a._rankingScore);
      }
      
      setData(combinedData);
      setIsLoading(false);
    };

    fetchAndSetData();
  }, [query]);

  return (
    <>
      {isLoading ? (
        <div className="text-center mx-auto">
            <p>Loading</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 mt-2">
          {data.length > 0 ? (
            data.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="rounded-lg border w-[96%] ml-[2%] md:w-[80%] md:ml-[10%]">
                <div className="flex flex-row justify-between items-start px-10 py-5">
                  <div className="w-[50%]">
                    <h1 className="whitespace-nowrap text-ellipsis overflow-x-hidden font-bold text-2xl">
                      {item["Artefact Title"] || item["Book Name"]}
                    </h1>
                    <h2 className="whitespace-nowrap text-ellipsis overflow-x-hidden">
                      {item["Artefact Description"] || item["Description of Book"]}
                    </h2>
                    <Button>
                    <Link href={`/search/page/${item["Artefact Title"] ? "museum" : "books"}/${item._id.$oid}`} passHref legacyBehavior>
                      {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
<a target="_blank" rel="noopener noreferrer">View Details</a>
                    </Link></Button>
                  </div>
                  <div>
                    <Image
                      src={urlformat(item["Image of the Book"] || item.Multimedia)}
                      alt={`${item["Artefact Title"] || item["Book Name"]}`}
                      width={82}
                      height={95}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-2xl font-bold">No results found</h1>
          )}
        </div>
      )}
    </>
  );
};

export default EmbeddedSearch;
