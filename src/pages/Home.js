import { useContext, useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { APIContext } from "../utils/APIContext";

const Home = () => {
  const [apiResponse, setApiResponse, apiCaller] = useContext(APIContext);
  const [currentOption, setCurrentOption] = useState("character");
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsToRender, setItemsToRender] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      apiCaller
        .get(`/${currentOption}`, {
          params: {
            page,
          },
        })
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
      if (apiResponse && apiResponse.results) {
        prepareItemsToRender();
      }
    }
  }, [loading]);

  const handleChangeTab = (tabName) => {
    setCurrentOption(tabName);
    setItemsToRender(null);
    setPage(1);
    setLoading(true);
  };
  const handleShowMore = () => {
    setPage(page + 1);
    setLoading(true);
    console.log(page, loading);
  };

  const prepareItemsToRender = (customItems) => {
    const results = Array.isArray(apiResponse.results)
      ? apiResponse.results
      : [apiResponse.results];

    let tempItemsToRender = results.map((step) => {
      return (
        <Link
          to={`/details/${currentOption}/${step.id}`}
          key={step.id}
          className="container bg-green-600 p-10 mx-auto max-w-full flex items-center"
          style={{ width: "70%" }}
        >
          {step.image ? (
            <img
              className="rounded-full w-24 float-left"
              src={step.image}
              alt={step.name}
              loading="lazy"
            ></img>
          ) : null}
          <div className="w-full flex justify-center  float-left text-2xl font-medium">
            <span>{step.name}</span>
          </div>
        </Link>
      );
    });
    if (apiResponse.info.next !== null) {
      tempItemsToRender = [
        ...tempItemsToRender,
        <button
          className=" m-10 border-none shadow-lg rounded-3xl p-3 bg-green-800 hover:bg-green-900 focus:outline-none"
          onClick={() => handleShowMore()}
        >
          Show More
        </button>,
      ];
    }
    if (itemsToRender) itemsToRender.pop();
    setItemsToRender([
      itemsToRender ? [...itemsToRender] : [],
      ...tempItemsToRender,
    ]);
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
          className="text-xl font-bold uppercase border-white border-r-2 border-l-2 px-10 h-full flex items-center hover:bg-green-700 "
          onClick={() => handleChangeTab("character")}
        >
          Characters
        </button>
        <button
          className="text-xl font-bold uppercase border-white border-r-2 border-l-2 px-10 h-full flex items-center hover:bg-green-700 "
          onClick={() => handleChangeTab("location")}
        >
          Locations
        </button>
        <button
          className="text-xl font-bold uppercase border-white border-r-2 border-l-2 px-10 h-full flex items-center hover:bg-green-700 "
          onClick={() => handleChangeTab("episode")}
        >
          Episodes
        </button>
      </nav>
      <span className="text-5xl uppercase font-bold tracking-widest p-10">
        {currentOption + "s"}
      </span>
      <div className="container bg-green-600 m-10 p-0 mx-auto flex justify-evenly items-center rounded-3xl flex-col divide-y-2">
        {itemsToRender ? itemsToRender : <span>Loading</span>}
      </div>
    </Fragment>
  );
};

export default Home;
