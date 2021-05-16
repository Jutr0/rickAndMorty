import { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";
import EpisodeDetails from "../components/EpisodeDetails";
import LocationDetails from "../components/LocationDetails";
import { APIContext } from "../utils/APIContext";

const Details = (props) => {
  const [apiResponse, setApiResponse, apiCaller] = useContext(APIContext);
  const { type, detailsID } = props.match.params;
  const [loading, setLoading] = useState(true);
  const [pageToRender, setPageToRender] = useState("");

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
          setPageToRender(<CharacterDetails {...apiResponse.data} />);
          break;
        }
        case 'location':{
          setPageToRender(<LocationDetails {...apiResponse.data} />)
          break;
        }
        case "episode":{
          setPageToRender(<EpisodeDetails {...apiResponse.data} />)
        }
        default:
      }
    }
  }, [loading]);

  return loading ? <h1>Loading</h1> : pageToRender;
};

export default withRouter(Details);
