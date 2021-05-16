import { Fragment, useEffect, useState, useContext } from "react";
import { APIContext } from "../utils/APIContext";

const CharacterDetails = (props) => {
  console.log(props);
  const { image, name, gender, species, status, origin } = props;
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
        tempEpisodes = [result.data].map((step) => {
          return (
            <div key={step.id} className="p-4 mx-5">
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
            </div>
          );
        });
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
              <span className="font-medium p-3">Origin: </span> {origin.name}
            </li>
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

        {episodesToRender}
      </div>
    </Fragment>
  );
};

export default CharacterDetails;
