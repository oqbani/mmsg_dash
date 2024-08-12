import React, { useEffect, useState } from "react";
import {
  RecepMedecins,
  getDataMedecins,
} from "../../Pages/Medecins/HelpMedecins";
import { FaUserDoctor } from "react-icons/fa6";

const Medecins: React.FC = () => {
  const [medecins, setMedecins] = useState<RecepMedecins[]>([]);

  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const response = await getDataMedecins();
        setMedecins(response);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchMedecins();
  }, []);
  return (
    <div className="card">
      <h1>
      <FaUserDoctor />
      </h1>
      <strong>Nombre de médecins</strong>
      <h1>
        <strong>{medecins.length}</strong>
      </h1>
    </div>
  );
};

export default Medecins;
