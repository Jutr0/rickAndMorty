import { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { APIContext } from "../utils/APIContext";

const CharacterDetails = (props) => {
  console.log(props);
  const { image, name, gender, species, status, origin, location } = props;
  const [episodesToRender, setEpisodesToRender] = useState(null);
  const [, , apiCaller] = useContext(APIContext);
  const episodes = props.episode
    .map((step) => {
      return step.replace("https://rickandmortyapi.com/api/episode/", "");
    })
    .join(",");

  useEffect(() => {
    let tempEpisodes;
    apiCaller
      .get(`/episode/${episodes}`)
      .then((result) => {
        console.log(result);
        if (result.data.length !== undefined) {
          tempEpisodes = result.data.map((step) => {
            return (
              <Link
                to={`/details/${step.url.replace(
                  "https://rickandmortyapi.com/api/",
                  ""
                )}`}
                onClick={() => props.load()}
                key={step.id}
                className="p-4 mx-5 block"
              >
                <span>
                  <span className="font-medium text-lg">Title: </span>
                  {step.name}
                </span>
                <br />
                <span className="mx-3">{step.episode}</span>
                <span>{step.air_date}</span>
                <br />
                <br />
                <hr />
              </Link>
            );
          });
        } else {
          tempEpisodes = (
            <Link
              to={`/details/${result.data.url.replace(
                "https://rickandmortyapi.com/api/",
                ""
              )}`}
              onClick={() => props.load()}
              key={result.data.id}
              className="p-4 mx-5 block"
            >
              <span>
                <span className="font-medium text-lg">Title: </span>
                {result.data.name}
              </span>
              <br />
              <span className="mx-3">{result.data.episode}</span>
              <span>{result.data.air_date}</span>
              <br />
              <br />
              <hr />
            </Link>
          );
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        setEpisodesToRender(tempEpisodes);
      });
  }, [episodes]);

  return (
    <Fragment>
      <div className="container bg-green-600 m-10 p-0 mx-auto flex justify-evenly items-center rounded-3xl">
        <img src={image} alt={name} className="rounded-3xl m-9" />
        <div className="text-6xl font-bold ">{name}</div>
      </div>
      <div className="container bg-green-600 m-10 p-0 mx-auto rounded-3xl">
        <div className="p-9">
          <span className="font-bold text-2xl uppercase ">Info:</span>
          <ul>
            <li>
              <span className="font-medium p-3">Name: </span> {name}
            </li>
            <li>
              <span className="font-medium p-3">Gender: </span> {gender}
            </li>
            <li>
              <span className="font-medium p-3">Origin: </span>{" "}
              <Link
                to={`/details${origin.url.replace(
                  "https://rickandmortyapi.com/api",
                  ""
                )}`}
                onClick={() => props.load()}
              >
                {origin.name}
              </Link>
            </li>
            {location ? (
              <li>
                <span className="font-medium p-3">Location: </span>{" "}
                <Link
                  to={`/details${location.url.replace(
                    "https://rickandmortyapi.com/api",
                    ""
                  )}`}
                  onClick={() => props.load()}
                >
                  {location.name}
                </Link>
              </li>
            ) : null}

            <li>
              <span className="font-medium p-3">Species: </span> {species}
            </li>
            <li>
              <span className="font-medium p-3">Status: </span> {status}
            </li>
          </ul>
        </div>
      </div>
      <div className="container bg-green-600 m-10 p-9 mx-auto rounded-3xl">
        <span className=" font-bold uppercase text-2xl">Episodes:</span>

        {props.episode.length ? (
          episodesToRender
        ) : (
          <span className="p-8 flex mx-3 max-w-full items-center justify-center pb-20 text-6xl font-bold uppercase">
            Not Found
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default CharacterDetails;
