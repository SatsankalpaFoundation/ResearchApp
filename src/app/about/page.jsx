"use client";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Banner from "@/components/banner";

function Page() {

  const breadcrumbs = ["Home", "About"];
  return (
    <>
      <div className="flex flex-col items-center">
      <Nav activeItem={"About"} />
      <Banner title="About" breadcrumb={breadcrumbs} />
      <pre className="text-center w-[70%] text-wrap my-6">Satsankalpa Foundation through its research caters not only to the Indian American community but to the rest of the population at large. It helps the current and future generations of the Asian Indian community to establish a connection to their roots by visiting the museums. It brings in awareness to understand the culture, traditions, history, art, science, etc., through these Asian Indian Artifacts exhibited in the museums. Scriptures from the libraries will allow us to gain knowledge on various subjects and understand the contributions made by ancient and contemporary Saints and Sages, in the fields of Literature, Science, Arts, History, Medicine, Engineering, Astronomy, Astrology and much more. The rest of the world can understand more about the Indian subcontinent, its culture, heritage, and values. This research can help academicians, researchers, and students to utilize the knowledge for educational and research purposes.


The research app is an attempt to bring books, scriptures, sculptures, paintings, artefacts related to ancient Indian culture, heritage and traditions that are available in libraries and museums across the United States in the from of a searchable catalog. The research app can be used to browse information or also directly search for a specific information using the Search function.

We are continuously working hard to bring as much of information as possible and would love to have your help and engagement for the same. If you are interested to contribute, please send and email to reserach@satsankalpa.org.</pre>
      </div>

      <Footer />
    </>
  );
}

export default Page;


