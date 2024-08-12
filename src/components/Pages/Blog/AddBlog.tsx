import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaBlog, FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiBlog } from "../../../helpers/Api";

const AddBlog: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const notifySuccess = () => toast.success("Article ajouté !");
  const notifyError = () => toast.error("Erreur lors de l'ajout d'un article");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    titreFr: Yup.string().required("Le titre en français est obligatoire"),
    titreEn: Yup.string().required("Le titre en anglais est obligatoire"),
    date: Yup.date()
      .required("La date est obligatoire")
      .typeError("La date doit être valide"),
    categorieFr: Yup.string().required(
      "La catégorie en français est obligatoire"
    ),
    categorieEn: Yup.string().required(
      "La catégorie en anglais est obligatoire"
    ),
    contenuEn: Yup.string().required("Le contenu en anglais est obligatoire"),
    contenuFr: Yup.string().required("Le contenu en français est obligatoire"),
    image: Yup.mixed()
      .required("L'image est obligatoire")
      .test(
        "fileSize",
        "La taille du fichier est trop grande",
        (value: any) => !value || (value && value.size <= 2 * 1024 * 1024)
      ) // 2MB size limit
      .test(
        "fileFormat",
        "Le format du fichier n'est pas pris en charge",
        (value: any) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/gif"].includes(value.type))
      ),
  });

  const initialValues = {
    titreFr: "",
    titreEn: "",
    date: "",
    categorieFr: "",
    categorieEn: "",
    contenuEn: "",
    contenuFr: "",
    image: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("titreFr", values.titreFr);
        formData.append("titreEn", values.titreEn);
        formData.append("date", values.date);
        formData.append("categorieFr", values.categorieFr);
        formData.append("categorieEn", values.categorieEn);
        formData.append("contenuEn", values.contenuEn);
        formData.append("contenuFr", values.contenuFr);

        if (values.image) {
          formData.append("imageFile", values.image);
        }


        const response = await axios.post(apiBlog, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`
          },
        });

        if (response.status !== 201) {
          throw new Error("Failed to add article");
        }

        console.log("Article ajouté avec succès !");
        notifySuccess();
        navigate("/blogs");
        resetForm();
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'article :", error);
        notifyError()
      }
    },
  });

  return (
    <div className="Blog">
      <div className="Blog-content">
        <div className="filter d-flex">
          <div>
            <Link to={"/"}>
              <FaHome />
              <span>Accueil</span>
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className="arrow" />
          </div>
          <div>
            <Link to={"/blog"}>
              <FaBlog />
              <span>Blog</span>
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className="arrow" />
          </div>
          <div>
            <span className="subcategory">Ajouter un article</span>
          </div>
        </div>
        <form ref={formRef} onSubmit={formik.handleSubmit}>
          <div className="form-div">
            <div>
              <div>
                <label htmlFor="titreFr">Titre (FR)</label>
                <input
                  type="text"
                  name="titreFr"
                  value={formik.values.titreFr}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.titreFr && formik.errors.titreFr ? (
                <div className="error">{formik.errors.titreFr}</div>
              ) : null}
            </div>

            <div>
              <div>
                <label htmlFor="titreEn">Titre (EN)</label>
                <input
                  type="text"
                  name="titreEn"
                  value={formik.values.titreEn}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.titreEn && formik.errors.titreEn ? (
                <div className="error">{formik.errors.titreEn}</div>
              ) : null}
            </div>
          </div>

          <div className="form-div">
            <div>
              <div>
                <label htmlFor="categorieFr">Catégorie (FR)</label>
                <input
                  type="text"
                  name="categorieFr"
                  value={formik.values.categorieFr}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.categorieFr && formik.errors.categorieFr ? (
                <div className="error">{formik.errors.categorieFr}</div>
              ) : null}
            </div>

            <div>
              <div>
                <label htmlFor="categorieEn">Catégorie (EN)</label>
                <input
                  type="text"
                  name="categorieEn"
                  value={formik.values.categorieEn}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.categorieEn && formik.errors.categorieEn ? (
                <div className="error">{formik.errors.categorieEn}</div>
              ) : null}
            </div>
          </div>

          <div className="form-div">
            <div>
              <div>
                <label htmlFor="contenuFr">Contenu (FR)</label>
                <textarea
                  name="contenuFr"
                  value={formik.values.contenuFr}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.contenuFr && formik.errors.contenuFr ? (
                <div className="error">{formik.errors.contenuFr}</div>
              ) : null}
            </div>

            <div>
              <div>
                <label htmlFor="contenuEn">Contenu (EN)</label>
                <textarea
                  name="contenuEn"
                  value={formik.values.contenuEn}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.contenuEn && formik.errors.contenuEn ? (
                <div className="error">{formik.errors.contenuEn}</div>
              ) : null}
            </div>
          </div>

          <div className="form-div">
            <div>
              <div>
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg, image/png, image/gif"
                  multiple
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    formik.setFieldValue("image", file);
                  }}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.image && formik.errors.image ? (
                <div className="error">{formik.errors.image}</div>
              ) : null}
            </div>
            <div>
              <div>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.date && formik.errors.date ? (
                <div className="error">{formik.errors.date}</div>
              ) : null}
            </div>
          </div>
          <button type="submit" className="Btn-add">
            Ajouter un article
          </button>
        </form>
      </div>
      <ToastContainer
        style={{ position: "absolute", top: "10%", right: "1rem" }}
      />
    </div>
  );
};

export default AddBlog;
