import axios from "axios";
import { apiCandida } from "../../../helpers/Api";

export interface RecepCandida {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  file: string;
  fichier: string;
  type: string;
  createdAt: string;
}

export const Candidahead = [
  {
    id: 0,
    text: "Nom",
  },
  {
    id: 1,
    text: "Prénom",
  },
  {
    id: 2,
    text: "N° téléphone",
  },
  {
    id: 3,
    text: "Fichier",
  },
  {
    id: 4,
    text: "Action",
  },
];


export const getDataCandida = async () => {
  try {
    
    const response = await axios.get(apiCandida, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
      },
    });
    console.log("data afficher avec succés:", response.data);
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

export const deleteCandida = async (id: number) => {
  await axios.delete(`${apiCandida}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};

export const getCandidaById = async (id: number) => {
  return await axios.get<RecepCandida>(`${apiCandida}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};
