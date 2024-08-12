import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecepRdv, getRdvById } from "./HelpRdv";
const SeeRdv: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [Rdv, setRdv] = useState<RecepRdv | null>(null);

  useEffect(() => {
    const fetchRdv = async () => {
      try {
        const response = await getRdvById(Number(id));
        setRdv(response.data);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchRdv();
  }, [id]);

  if (!Rdv) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="rdv">
      <div className="rdv-content">
        <h2 className="mb-4">Détails du rendez-vous</h2>
        <table>
            <tr>
                <th><strong>Nom:</strong></th>
                <td> {Rdv.nom}</td>
            </tr>
            <tr>
                <th><strong>Prénom:</strong></th>
                <td> {Rdv.prenom}</td>
            </tr>
            <tr>
                <th><strong>Telephone:</strong></th>
                <td> {Rdv.telephone}</td>
            </tr>
            <tr>
                <th><strong>Email:</strong></th>
                <td>{Rdv.email}</td>
            </tr>
            <tr>
                <th><strong>Date:</strong></th>
                <td>{Rdv.date}</td>
            </tr>
            <tr>
                <th><strong>Message</strong></th>
                <td>{Rdv.message}</td>
            </tr>
        </table>
      </div>
    </div>
  );
};

export default SeeRdv;
