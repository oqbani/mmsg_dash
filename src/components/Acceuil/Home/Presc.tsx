import React, { useEffect, useState } from "react";
import { FaBlog } from "react-icons/fa";
import { RecepPresc, getDataPresc } from "../../Pages/Receppresc/HelpPresc";

const Presc: React.FC = () => {
  const [Presc, setPresc] = useState<RecepPresc[]>([]);
  useEffect(() => {
    const fetchPresc = async () => {
      try {
        const response = await getDataPresc();
        if (Array.isArray(response)) {
          setPresc(response);
        } else {
          setPresc([]);
        }
      } catch (error) {
        console.error("Erreur de fetching:", error);
        setPresc([]);
      }
    };

    fetchPresc();
  }, []);
  return (
    <div className="card">
      <h1>
        <FaBlog />
      </h1>
      <strong>Nombre de Prescriptions </strong>
      <h1>
        <strong>{Presc.length}</strong>
      </h1>
    </div>
  );
};

export default Presc;