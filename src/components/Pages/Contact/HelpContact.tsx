import axios from "axios";
import { apiContact } from "../../../helpers/Api";

export interface RecepContact {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  message: string;
}

export const contacthead = [
  { id: 0, text: "Nom" },
  { id: 1, text: "Prénom" },
  { id: 2, text: "N° téléphone" },
  { id: 3, text: "Email" },
  { id: 4, text: "Messages" },
  { id: 5, text: "Action" },
];

export const getDataContact = async (): Promise<RecepContact[]> => {
  try {
    const response = await axios.get<RecepContact[]>(apiContact);
    console.log('Data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// export const getDataContact = async () => {
//   try {
//     const response = await axios.get(`${apiContact}`);
//     console.log("data afficher avec succés:", response.data);
//     return response.data["hydra:member"];
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         console.error("Erreur de statut:", error.response.status);
//         console.error("Erreur de données:", error.response.data);
//       } else if (error.request) {
//         console.error(
//           "La requête a été effectuée mais aucune réponse reçue:",
//           error.request
//         );
//       } else {
//         console.error(
//           "Un message d'erreur décrivant le problème:",
//           error.message
//         );
//       }
//     } else {
//       console.error("Unexpected error:", error);
//     }
//   }
// };

export const deleteContact = async (id: number) => {
  return await axios.delete(`${apiContact}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};

export const getContactById = async (id: number) => {
  return await axios.get<RecepContact>(`${apiContact}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};
