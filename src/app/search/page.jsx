"use client";
import Nav from "@/components/nav";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import axios from "axios";
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import BackgroundGradient from "@/components/ui/background-gradient";
import { Input } from "@/components/ui/input";
import { HashLoader} from "react-spinners";
import { Button } from "@/components/ui/button";
import  Link  from "next/link";
async function fetchData(query) {
  if (!query) {
    return []; // Returning an empty array as a safe default
  }

  try {
    const res = await axios.get(`/api/v1/search/${query}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array or a suitable fallback value
  }
}

function Page() {
  const [log, setLog] = useState([]);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchAndSetData = async () => {
      const query = searchParams.get("q");
      setIsLoading(!!query);
      const data = await fetchData(query);
      setLog(query);
      let combinedData = [];

      if (Array.isArray(data.results) && data.results.length >= 2) {
        const booksHits = data.results[0]?.hits || [];
        const artefactsHits = data.results[1]?.hits || [];

        combinedData = [...booksHits, ...artefactsHits];
        combinedData.sort((a, b) => b._rankingScore - a._rankingScore);
      }
      setData([])
      if (query === log) {
        setData(combinedData);
      } else {
        setData([]);
      }
      setIsLoading(false);
    };

    fetchAndSetData();
  }, [searchParams, log]);

  const handleInputChange = (e) => {
    router.push(`/search?q=${e.target.value}`, {
      scroll: false,
      shallow: true,
    });
  };

  return (
    <>
      <div className="min-h-[100vh]">
        <Nav activeItem="Search" />
        <Banner title="Search" breadcrumb={["Home", "Search"]} />
        <div className="sticky m-4 w-[90%] left-[5%] top-2  md:w-[50%] md:left-[25%]">
          <BackgroundGradient className="">
            <Input
              type="text"
              defaultValue={searchParams.get("q")}
              placeholder="Search..."
              onChange={handleInputChange}
            />
          </BackgroundGradient>
        </div>
        <div className="flex flex-col gap-1">
          {isLoading ? (
            <>
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
            />
            </>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={index} className="rounded-lg border w-[96%] ml-[2%] md:w-[80%] md:ml-[10%]">
                <div className="flex flex-row justify-between items-start px-10 py-5">
                  <div className="w-[50%]">
                    <h1 className=" whitespace-nowrap  text-ellipsis overflow-x-hidden font-bold text-2xl">
                      {item["Artefact Title"] || item["Book Name"]}
                    </h1>
                    <h2 className="whitespace-nowrap  text-ellipsis overflow-x-hidden">
                      {item["Artefact Description"] || item["Description of Book"]}
                    </h2>
                    <Button><Link href={`/search/page/${item["Artefact Title"] ? "museum" : "books"}/${item._id.$oid}`}>View Details</Link></Button>
                  </div>
                  <div>
                    <img
                      className="w-[82px]"
                      src="https://placeholder.co/82x95"
                      alt={item["Artefact Title"] || item["Book Name"]}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (searchParams.get("q") ? <><h1 className="text-center text-2xl font-bold">No results found</h1><HashLoader 
          color="ffffff"
          loading={true}
          size={150}
          cssOverride={{
            'margin-left': 'auto',
            'margin-right': 'auto'
          }}
          aria-label="Loading Spinner"
          data-testid="loader"
          /></> : <h1 className="text-center text-2xl font-bold">What's on your mind today?</h1>)}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
