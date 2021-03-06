import { useContext, useEffect, useState, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";
import EpisodeDetails from "../components/EpisodeDetails";
import LocationDetails from "../components/LocationDetails";
import { APIContext } from "../utils/APIContext";

const Details = (props) => {
  const [apiResponse, setApiResponse, apiCaller] = useContext(APIContext);
  const { type, detailsID } = props.match.params;
  const [loading, setLoading] = useState(true);
  const [pageToRender, setPageToRender] = useState("");

  const loadPage = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      apiCaller
        .get(`/${type}/${detailsID}`)
        .then((response) => {
          setApiResponse(response);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else {
      switch (type) {
        case "character": {
          setPageToRender(
            <CharacterDetails {...apiResponse.data} load={loadPage} />
          );
          break;
        }
        case "location": {
          setPageToRender(
            <LocationDetails {...apiResponse.data} load={loadPage} />
          );
          break;
        }
        case "episode": {
          setPageToRender(
            <EpisodeDetails {...apiResponse.data} load={loadPage} />
          );
          break;
        }
        default:
          setPageToRender(<span>Not Found</span>);
      }
    }
  }, [loading]);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <Fragment>
      <Link to="/" className="container text-4xl font-semibold m-10">
        HOME
      </Link>
      {pageToRender}
    </Fragment>
  );
};

export default withRouter(Details);
