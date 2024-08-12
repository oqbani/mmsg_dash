import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecepMedecins, getMedecinById } from "./HelpMedecins";

const SeeMedecins: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [medecin, setMedecin] = useState<RecepMedecins | null>(null);

  useEffect(() => {
    const fetchMedecin = async () => {
      try {
        const response = await getMedecinById(Number(id));
        setMedecin(response.data);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchMedecin();
  }, [id]);

  if (!medecin) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="rdv">
      <div className="rdv-content">
        <h2 className="mb-4">Détails du Médecin</h2>
        <p>
          <strong>Nom Complet:</strong> Dr. {medecin.nom} {medecin.prenom}
        </p>
        <p>
          <strong>Spécialité:</strong> {medecin.specialite}
        </p>
      </div>
    </div>
  );
};

export default SeeMedecins;
