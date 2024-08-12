import * as Yup from "yup";
import axios from "axios";
import { apiCoordonnees } from "../../../helpers/Api";

export interface RecepCoo {
  id: number;
  telephone: string;
  email: string;
  horaire: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

export const updateCoo = async (id: number, data: RecepCoo) => {
  return await axios.put(`${apiCoordonnees}/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};

export const getCooById = async (id: number) => {
  return await axios.get<RecepCoo>(`${apiCoordonnees}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};


export const Coohead = [
  {
    id: 0,
    text: "Telephone",
  },
  {
    id: 1,
    text: "Email",
  },
  {
    id: 2,
    text: "Horaire",
  },
  {
    id: 3,
    text: "Facebook",
  },
  {
    id: 4,
    text: "Instagram",
  },
  {
    id: 5,
    text: "Linkedin",
  },
  {
    id: 6,
    text: "Youtube",
  },
  {
    id: 7,
    text: "Actions",
  },
];


export const validationSchema = Yup.object().shape({
  telephone: Yup.string().required("Champs obligatoire!!"),
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  horaire: Yup.string().required("Horaire requis!!"),
  facebook: Yup.string().required("Compte Facebook requis!!"),
  instagram: Yup.string().required("Compte Instagram requis!!"),
  linkedin: Yup.string().required("Compte Linkedin requis!!"),
  youtube: Yup.string().required("Compte Youtube requis!!"),
});


export const getDataCoo = async () => {
  try {
    const response = await axios.get(`${apiCoordonnees}`,{
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

// export const updateCoordonne = async (Coordonnee: RecepCoo) => {
//   try {
//     const response = await axios.post(
//       `${apiUrl}/update-condidatures/${id}`,
//       {
//         telephone: Coordonnee.telephone,
//         email: Coordonnee.email,
//         horaire: Coordonnee.horaire,
//         facebook: Coordonnee.facebook,
//         instagram: Coordonnee.instagram,
//         linkedin: Coordonnee.linkedin,
//         youtube: Coordonnee.youtube,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Quelque chose s'est mal passé !");
//   }
// };


export const deleteCoo = async (id: number) => {
  return await axios.delete(`${apiCoordonnees}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};


// export const updateCoo = async (id: number, data: FormData) => {
//   return await axios.put(`${apiCoordonneesup}/${id}`, data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
//     },
//   });
// };


// export const getCooById = async (id: number) => {
//   return await axios.get<RecepCoo>(`${apiCoordonnees}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
//     },
//   });
// };