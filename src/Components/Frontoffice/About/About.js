import "./About.css";
import { useState, useEffect } from "react";
import  { Get }  from "../../../Services/publicApiService";
import MembersAbout from "../Members/MembersAbout";
import Spinner from "../../Spinner/Spinner";
import Alert from "../../Alerts/Alerts";

const About = () => {

  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    await Get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ORGANIZATION).then(
      (res) => {
        setText(res.data.data.long_description);
      }
    ).catch( (erro)=>{
      Alert('Error', 'Hubo un error en la llamada a la API', 'error');
    });
    setTimeout(() => {setIsLoading(false)}, 800);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      {isLoading ? (<Spinner/>):(
        <>
          <div className="container-about">
            <div className="section-container-about">
                <div className="main-text">
                    <h1 className="about-title">Nosotros</h1>
                    <div className="about-text">{text}</div>
                </div>
                <img src='./images/hands.png' className="about-img"/>
            </div>
          </div>
          <MembersAbout/>
        </>
      )}
    </>
  );
};

export default About;
