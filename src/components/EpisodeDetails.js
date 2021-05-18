import { Fragment, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { APIContext } from "../utils/APIContext";

const EpisodeDetails = (props) => {
  console.log(props);

  const { name, episode, characters } = props;
  const [, , apiCaller] = useContext(APIContext);
  const [charactersToRender, setCharactersToRender] = useState(null);
  const charactersCall = characters
    .map((step) => {
      return step.replace("https://rickandmortyapi.com/api/character/", "");
    })
    .join(", ");

  useEffect(() => {
    let tempCharacters;
    apiCaller
      .get(`/character/${charactersCall}`)
      .then((result) => {
        const data = result.data;
        console.log("result: ", data);
        if (data.length !== undefined)
          tempCharacters = result.data.map((step, index) => {
            return (
              <Link
                to={`/details/${step.url.replace(
                  "https://rickandmortyapi.com/api/",
                  ""
                )}`}
                onClick={() => props.load()}
                key={step.id}
                className="p-8 flex mx-3 max-w-full items-center "
                style={
                  index ? { width: "70%" } : { borderTop: "none", width: "70%" }
                }
              >
                <img
                  src={step.image}
                  alt={step.name}
                  className="w-40 rounded-full"
                />
                <div className=" text-3xl ml-10">{step.name}</div>
              </Link>
            );
          });
        else
          tempCharacters = (
            <Link
              to={`/details/${data.url.replace(
                "https://rickandmortyapi.com/api/",
                ""
              )}`}
              onClick={() => props.load()}
              key={data.id}
              className="p-8 flex mx-3 max-w-full items-center "
              style={{ borderTop: "none", width: "70%" }}
            >
              <img
                src={data.image}
                alt={data.name}
                className="w-40 rounded-full"
              />
              <div className=" text-3xl ml-10">{data.name}</div>
            </Link>
          );
      })
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        setCharactersToRender(tempCharacters);
      });
  }, [charactersCall]);

  return (
    <Fragment>
      <div className="container bg-green-600 m-10 p-0 mx-auto flex flex-col justify-evenly items-center rounded-3xl">
        <div className="p-10 pb-0 font-extrabold text-7xl">{name}</div>
        <div className="p-5 text-3xl">{episode}</div>
      </div>
      <div className="container bg-green-600 m-10 p-0 mx-auto flex justify-evenly items-center rounded-3xl flex-col divide-y-2 divide-dashed">
        <span className=" font-bold uppercase text-2xl">Characters:</span>
        {charactersToRender}
      </div>
    </Fragment>
  );
};

export default EpisodeDetails;
