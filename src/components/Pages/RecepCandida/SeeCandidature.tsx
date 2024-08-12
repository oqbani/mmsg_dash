import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecepCandida, getCandidaById } from "./HelpCandid";
import { uploadUrl } from "../../../helpers/Api";
import { BsDownload } from "react-icons/bs";
const SeeCandida: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [Candida, setCandida] = useState<RecepCandida | null>(null);

  useEffect(() => {
    const fetchCandida = async () => {
      try {
        const response = await getCandidaById(Number(id));
        setCandida(response.data);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchCandida();
  }, [id]);

  if (!Candida) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="rdv">
      <div className="rdv-content">
        <h2 className="mb-4">Détails de la condidature : </h2>
        <table>
            <tr>
                <th><strong>Nom:</strong></th>
                <td> {Candida.nom}</td>
            </tr>
            <tr>
                <th><strong>Prénom:</strong></th>
                <td> {Candida.prenom}</td>
            </tr>
            <tr>
                <th><strong>Telephone:</strong></th>
                <td> +{Candida.telephone}</td>
            </tr>
            <tr>
                <th><strong>Fichier:</strong></th>
                {Candida.type === "image" ? (
                <td>
                  <img style={{width: "8rem"}} src={`${uploadUrl}/file_upload/${Candida.fichier}`} alt="" />
                </td>
              ) : (
                <td
                  className="d-flex align-items-center justify-content-between h-100 fw-semibold"
                  // onClick={() => downloadFile(candid.fichier)}
                  style={{ cursor: "pointer" }}
                >
                  <p>{`${uploadUrl}/file_upload/${Candida.fichier}`}</p>{" "}
                  <BsDownload />
                </td>
              )}
            </tr>
        </table>
      </div>
    </div>
  );
};

export default SeeCandida;
