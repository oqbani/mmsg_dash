import React, { useRef } from "react";
import { specialite } from "./HelpAddM";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiMedecins } from "../../../helpers/Api";

const AddMedecins: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const notifySuccess = () => toast.success("Médecin ajouté !");
  const notifyError = () => toast.error("Erreur lors de l'ajout du médecin");
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Veuillez entrer le nom"),
    prenom: Yup.string().required("Veuillez entrer le prénom"),
    specialite: Yup.string().required("Veuillez choisir une spécialité"),
  });

  const initialValues = {
    nom: "",
    prenom: "",
    specialite: "",
  };

  const formikMedecins = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${apiMedecins}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`
          },
        });

        if (response.status !== 201) {
          throw new Error("Failed to add médecin");
        }

        console.log("Médecin ajouté avec succès !");
        notifySuccess();
        navigate("/medecins")
        resetForm();
      } catch (error) {
        console.error("Erreur lors de l'ajout du médecin :", error);
        notifyError();
      }
    },
  });

  return (
    <div className="Medecins">
      <div className="Medecins-content">
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
            <Link to={"/medecins"}>
              <FaUserDoctor />
              <span>Médecins</span>
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className="arrow" />
          </div>
          <div>
            <span className="subcategory">Ajouter un médecin</span>
          </div>
        </div>
        <form ref={formRef} onSubmit={formikMedecins.handleSubmit}>
          <div>
            <div>
              <label htmlFor="nom">Nom du médecin</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formikMedecins.values.nom}
                onChange={formikMedecins.handleChange}
                onBlur={formikMedecins.handleBlur}
              />
            </div>
            {formikMedecins.touched.nom &&
              formikMedecins.errors.nom && (
                <div className="error">
                  {formikMedecins.errors.nom}
                </div>
              )}
          </div>
          <div>
            <div>
              <label htmlFor="prenom">Prénom du médecin</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formikMedecins.values.prenom}
                onChange={formikMedecins.handleChange}
                onBlur={formikMedecins.handleBlur}
              />
            </div>
            {formikMedecins.touched.prenom &&
              formikMedecins.errors.prenom && (
                <div className="error">
                  {formikMedecins.errors.prenom}
                </div>
              )}
          </div>
          <div>
            <div>
              <label htmlFor="specialite">Spécialité du Médecin</label>
              <select
                id="specialite"
                name="specialite"
                value={formikMedecins.values.specialite}
                onChange={formikMedecins.handleChange}
                onBlur={formikMedecins.handleBlur}
              >
                <option value="">Choisissez une spécialité</option>
                {specialite.map((s) => (
                  <option value={s.text} key={s.id}>
                    {s.text}
                  </option>
                ))}
              </select>
            </div>
            {formikMedecins.touched.specialite &&
              formikMedecins.errors.specialite && (
                <div className="error">
                  {formikMedecins.errors.specialite}
                </div>
              )}
          </div>
          <button type="submit" className="Btn-add">
            Ajouter un médecin
          </button>
        </form>
      </div>
      <ToastContainer style={{ position: "absolute", top: "10%", right: "1rem" }} />
    </div>
  );
};

export default AddMedecins;
