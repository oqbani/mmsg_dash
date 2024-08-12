import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecepPresc, getPrescById } from "./HelpPresc";
const SeePresc: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [Presc, setPresc] = useState<RecepPresc | null>(null);

  useEffect(() => {
    const fetchPresc = async () => {
      try {
        const response = await getPrescById(Number(id));
        setPresc(response.data);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchPresc();
  }, [id]);

  if (!Presc) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="Presc">
      <div className="Presc-content">
        <h2 className="mb-4">Détails du prescription</h2>
        <table>
            <tr>
                <th><strong>Nom:</strong></th>
                <td> {Presc.nom}</td>
            </tr>
            <tr>
                <th><strong>Prénom:</strong></th>
                <td> {Presc.prenom}</td>
            </tr>
            <tr>
                <th><strong>Telephone:</strong></th>
                <td> {Presc.telephone}</td>
            </tr>
            <tr>
                <th><strong>Email:</strong></th>
                <td>{Presc.email}</td>
            </tr>
            <tr>
                <th><strong>Date:</strong></th>
                <td>{new Date(Presc.date).toLocaleDateString()}</td>
            </tr>
            <tr>
                <th><strong>Message</strong></th>
                <td>{Presc.message}</td>
            </tr>
        </table>
      </div>
    </div>
  );
};

export default SeePresc;