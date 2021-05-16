import {Fragment,useEffect,useState,useContext} from 'react';
import { APIContext } from "../utils/APIContext";

const LocationDetails = (props) => {
    console.log(props);
    const {dimension,id,name,type,residents} = props;
    const [, , apiCaller] = useContext(APIContext);
    const [residentsToRender,setResidentsToRender] = useState(null)
    const residentsCall = residents
    .map((step) => {
      return step.replace("https://rickandmortyapi.com/api/character/", "");
    }).join(", ");


    useEffect(() => {
        let tempResidents;
        apiCaller
          .get(`/character/${residentsCall}`)
          .then((result) => {
              const data = result.data;
              console.log("result: ",data);
            if(data.length !== undefined)
            tempResidents = result.data.map((step,index) => {
              return (
                <div key={step.id} className="p-8 flex mx-3 max-w-full items-center "  style={index?{width:"70%"}:{borderTop:'none', width:"70%"}}>
                    <img src={step.image} alt={step.name} className="w-40 rounded-full"/>
                    <div className=" text-3xl ml-10">{step.name}</div>

                </div>
              );
            });
            else tempResidents =  (
                <div key={data.id} className="p-8 flex mx-3 max-w-full items-center "  style={{borderTop:'none', width:"70%"}}>
                <img src={data.image} alt={data.name} className="w-40 rounded-full"/>
                <div className=" text-3xl ml-10">{data.name}</div>

            </div>);
            
          })
          .catch((err) => {
            console.error(err);
          })
          .then(() => {
            setResidentsToRender(tempResidents);
          });
      }, [residentsCall]);


  return (
      <Fragment>
      <div className="container bg-green-600 m-10 p-0 mx-auto flex justify-evenly items-center rounded-3xl flex-col">
          <div className="text-6xl font-bold p-10 pb-0">{name}</div>
          <div className="text-3xl font-medium text-gray-400 pb-9">{dimension} <br/>{type}</div>
      </div>
      <div className="container bg-green-600 m-10 p-0 mx-auto flex justify-evenly items-center rounded-3xl flex-col divide-y-2 divide-dashed">
        <span className=" font-bold uppercase text-3xl p-10 ">Residents: </span>
        {residents.length?residentsToRender:<span className="p-8 flex mx-3 max-w-full items-center justify-center pb-20 text-6xl font-bold uppercase"style={{borderTop:'none', width:"70%"}}>Not Found</span>}
      </div>
    </Fragment>
  );
};

export default LocationDetails;
