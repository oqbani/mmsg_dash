import axios from "axios";
import { apiPresc } from "../../../helpers/Api";

export interface RecepPresc {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  medecins: string;
  date: string;
  message: string;
}

export const Preschead = [
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
    text: "Messages(Médicament & quantité)",
  },
  {
    id: 7,
    text: "Action",
  },
];

export const getDataPresc = async () => {
  try {
    const response = await axios.get(apiPresc, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
      },
    });
    console.log("Data fetched successfully:", response.data);
    return response.data['hydra:member'];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Status error:", error.response.status);
        console.error("Data error:", error.response.data);
      } else if (error.request) {
        console.error(
          "Request made but no response received:",
          error.request
        );
      } else {
        console.error(
          "Error message describing the issue:",
          error.message
        );
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const deletePresc = async (id: number) => {
  await axios.delete(`${apiPresc}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};

export const getPrescById = async (id: number) => {
  return await axios.get<RecepPresc>(`${apiPresc}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};
