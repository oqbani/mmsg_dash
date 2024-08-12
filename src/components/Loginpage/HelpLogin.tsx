import axios from 'axios';
import * as Yup from 'yup';
import { apiUsers } from '../../helpers/Api';

// Validation schemas
export const ValidLogin = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis!!'),
  password: Yup.string().required('Password requis!!')
});

export const UserSchema = Yup.object().shape({
  Nom: Yup.string().required("Champs obligatoire!!"),
  Prenom: Yup.string().required("Champs obligatoire!!"),
  categorieFr: Yup.string().required("Champs obligatoire!!"),
  Email: Yup.string().required("Champs obligatoire!!"),
  Password: Yup.string().required("Champs obligatoire!!"),
  Roles: Yup.string().required("Champs obligatoire!!"),
});

// Types
export interface RecepUser {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  password: string;
  roles: string;
}

export const Userhead = [
  {
    id: 0,
    text: "Nom",
  },
  {
    id: 1,
    text: "Prenom",
  },
  {
    id: 2,
    text: "Telephone",
  },
  {
    id: 3,
    text: "Email",
  },
  {
    id: 4,
    text: "Roles",
  },
];

// API functions
export const getDataUser = async () => {
  try {
    const response = await axios.get(`${apiUsers}`, {
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
        console.error("La requête a été effectuée mais aucune réponse reçue:", error.request);
      } else {
        console.error("Un message d'erreur décrivant le problème:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const deleteUser = async (id: number) => {
  return await axios.delete(`${apiUsers}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};

export const updateUser = async (id: number, updatedUser: Partial<RecepUser>) => {
  return await axios.put(`${apiUsers}/${id}`, updatedUser, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};

export const getUserById = async (id: number) => {
  return await axios.get(`${apiUsers}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};
