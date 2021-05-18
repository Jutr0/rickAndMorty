import { useContext, useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { APIContext } from "../utils/APIContext";

const Home = () => {
  const [apiResponse, setApiResponse, apiCaller] = useContext(APIContext);
  const [currentOption, setCurrentOption] = useState("character");
  const [filters, setFilters] = useState(null);
  const [itemsToRender, setItemsToRender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      apiCaller
        .get(`/${currentOption}`)
        .then((response) => {
          console.log(response);
          setApiResponse(response.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      prepareItemsToRender();
    }
  }, [loading]);

  const handleChangeTab = (tabName) => {
    setCurrentOption(tabName);
    setLoading(true);
  };

  const prepareItemsToRender = () => {
    console.log("apiResponse.response: " + apiResponse.response !== undefined);
    if (apiResponse) {
      if (apiResponse.results === undefined) return;
      const results = Array.isArray(apiResponse.results)
        ? apiResponse.results
        : [apiResponse.results];

      const tempItemsToRender = results.map((step) => {
        return (
          <div
            key={step.id}
            className="container bg-green-600 p-10 mx-auto flex justify-evenly items-center max-w-full"
            style={{ width: "70%" }}
          >
            {step.name}
          </div>
        );
      });
      setItemsToRender(tempItemsToRender);
    }
  };

  return (
    <Fragment>
      <div className="container bg-green-600 m-10 p-0 mx-auto flex justify-evenly items-center rounded-3xl">
        <div className="p-10 text-4xl">
          This is the page, which contains all of the RickAndMortyAPI content
        </div>
      </div>
      <nav className="container bg-green-600 m-10 p-0 mx-auto flex justify-evenly items-stretch rounded-3xl h-14">
        <button
          className="text-xl font-bold uppercase border-white border-r-2 border-l-2 px-10 h-full flex items-center hover:bg-green-700 cursor-pointer"
          onClick={() => handleChangeTab("character")}
        >
          Characters
        </button>
        <button
          className="text-xl font-bold uppercase border-white border-r-2 border-l-2 px-10 h-full flex items-center hover:bg-green-700 cursor-pointer"
          onClick={() => handleChangeTab("location")}
        >
          Locations
        </button>
        <button
          className="text-xl font-bold uppercase border-white border-r-2 border-l-2 px-10 h-full flex items-center hover:bg-green-700 cursor-pointer"
          onClick={() => handleChangeTab("episode")}
        >
          Episodes
        </button>
      </nav>
      <span className="text-5xl uppercase font-bold tracking-widest p-10">
        {currentOption + "s"}
      </span>
      <div className="container bg-green-600 m-10 p-0 mx-auto flex justify-evenly items-center rounded-3xl flex-col divide-y-2">
        {itemsToRender}
      </div>
    </Fragment>
  );
};

export default Home;
