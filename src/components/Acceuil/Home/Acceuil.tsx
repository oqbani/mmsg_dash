import React from "react";
import Blogs from "./Blogs";
import Medecins from "./Medecins";
import HomeChart from "../Charts/HomeChart";
import Presc from "./Presc";
import Rdv from "./Rdv";

const Acceuil: React.FC = () => {
  return (
    <div className="Blog home">
      <div className="Blog-content home-content">
        <div style={{borderBottom: ".1rem solid grey"}}>
          <h3>Welcome to the Admin Dashboard</h3>
        </div>
        <div className="cards">
          <Blogs />
          <Medecins />
          <Rdv />
          <Presc />
        </div>
        <div>
          <HomeChart />
        </div>
      </div>
    </div>
  );
};

export default Acceuil;
