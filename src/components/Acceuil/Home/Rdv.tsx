import React, { useEffect, useState } from "react";
import { RecepRdv, getDataRdv } from "../../Pages/RecepRdv/HelpRdv";
import { FaTimes } from "react-icons/fa";

const Rdv: React.FC = () => {
  const [Rdv, setRdv] = useState<RecepRdv[]>([]);
  useEffect(() => {
    const fetchRdv = async () => {
      try {
        const response = await getDataRdv();
        if (Array.isArray(response)) {
          setRdv(response);
        } else {
          setRdv([]);
        }
      } catch (error) {
        console.error("Erreur de fetching:", error);
        setRdv([]);
      }
    };

    fetchRdv();
  }, []);
  return (
    <div className="card">
      <h1>
        <FaTimes />
      </h1>
      <strong>Nombre de Rdv </strong>
      <h1>
        <strong>{Rdv.length}</strong>
      </h1>
    </div>
  );
};

export default Rdv;