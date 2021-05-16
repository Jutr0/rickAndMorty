import { useContext } from "react";

import { APIContext } from "../utils/APIContext";

const Home = (props) => {
  const [apiResponse, setApiResponse] = useContext(APIContext);
  console.log(apiResponse);
  return (
    <div>
      <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
    </div>
  );
};

export default Home;
