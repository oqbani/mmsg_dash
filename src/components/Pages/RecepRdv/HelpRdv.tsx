import axios from "axios";
import { apiRdv } from "../../../helpers/Api";

export interface RecepRdv {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  medecins: string;
  date: string;
  message: string;
}

export const Rdvhead = [
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
    text: "Email",
  },
  {
    id: 4,
    text: "Médecins",
  },
  {
    id: 5,
    text: "Date",
  },
  {
    id: 6,
    text: "Messages",
  },
  {
    id: 7,
    text: "Action",
  },
];

export const getDataRdv = async () => {
  try {
    const response = await axios.get(apiRdv, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
      },
    });
    console.log("data afficher avec succés:", response.data);
    return response.data['hydra:member'];
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

export const deleteRdv = async (id: number) => {
  await axios.delete(`${apiRdv}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};

export const getRdvById = async (id: number) => {
  return await axios.get<RecepRdv>(`${apiRdv}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};