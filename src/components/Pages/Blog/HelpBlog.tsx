import axios from "axios";
import * as Yup from "yup";
import { apiBlog, apiUrl } from "../../../helpers/Api";



export interface RecepBlog {
  id: number;
  titreFr: string;
  titreEn: string;
  categorieFr: string;
  categorieEn: string;
  contenuFr: string;
  contenuEn: string;
  date: string;
  image: string;
}

export const Bloghead = [
  {
    id: 0,
    text: "titreFr",
  },
  {
    id: 1,
    text: "titreEn",
  },
  {
    id: 2,
    text: "categorieFr",
  },
  {
    id: 3,
    text: "categorieEn",
  },
  {
    id: 4,
    text: "contenuFr",
  },
  {
    id: 5,
    text: "contenuEn",
  },
  {
    id: 6,
    text: "date",
  },
  {
    id: 7,
    text: "image",
  },
  {
    id: 8,
    text: "Action",
  },
];




export const getDataBlog = async () => {
  try {
    const response = await axios.get(`${apiBlog}`,{
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



export  const BlogSchema = Yup.object().shape({
  titreFr: Yup.string().required("Champs obligatoire!!"),
  titreEn: Yup.string().required("Champs obligatoire!!"),
  categorieFr: Yup.string().required("Champs obligatoire!!"),
  categorieEn: Yup.string().required("Champs obligatoire!!"),
  contenuFr: Yup.string().required("Champs obligatoire!!"),
  contenuEn: Yup.string().required("Champs obligatoire!!"),
  date: Yup.date()
    .required("La date est obligatoire")
    .typeError("La date doit être valide"),
  Image: Yup.mixed()
    .required("L'image est obligatoire")
    .test(
      "fileSize",
      "La taille du fichier est trop grande",
      (value: any) => !value || (value && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileFormat",
      "Le format du fichier n'est pas pris en charge",
      (value: any) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    ),
});

// export const getDataBlog = async () => {
//   return await axios.get("/api/blogs");
// };

// export const updateBlog = async (id: number, updatedBlog: Partial<RecepBlog>) => {
//   return await axios.put(`${apiBlog}/${id}`, updatedBlog);
// };


export const deleteBlog = async (id: number) => {
  return await axios.delete(`${apiBlog}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};


export const updateBlog = async (id: number, formData: FormData) => {
  return await axios.post(`${apiUrl}/update-blog/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};


export const getBlogById = async (id: number) => {
  return await axios.get<RecepBlog>(`${apiBlog}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
    },
  });
};