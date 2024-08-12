import axios from "axios";
import { apiMedecins } from "../../../helpers/Api";

export interface RecepMedecins {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
  createdAt: string;
}

export const Medecinshead = [
  {
    id: 0,
    text: "Nom et Prénom",
  },
  {
    id: 1,
    text: "Spécialité",
  },
  {
    id: 2,
    text: "Action",
  },
];

export const getDataMedecins = async () => {
  try {
    const response = await axios.get(`${apiMedecins}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
      },
    });
    console.log("data afficher avec succès:", response.data);
    return response.data["hydra:member"];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Erreur de statut:", error.response.status);
        console.error("Erreur de données:", error.response.data);
      } else if (error.request) {
        console.error(
          "La requête a été effectuée mais aucune réponse reçue:",
          error.request
        );
      } else {
        console.error(
          "Un message d'erreur décrivant le problème:",
          error.message
        );
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
};


// export const getDataMedecins = async () => {
//   return await axios.get<RecepMedecins[]>('your_api_endpoint/medecins');
// };

export const deleteMedecin = async (id: number) => {
  await axios.delete(`${apiMedecins}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};

// Update API call
export const updateMedecin = async (id: number, updatedMedecin: Partial<RecepMedecins>) => {
  return await axios.put(`${apiMedecins}/${id}`, updatedMedecin, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};


export const getMedecinById = async (id: number) => {
  return await axios.get<RecepMedecins>(`${apiMedecins}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};
