import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RecepMedecins, updateMedecin, getMedecinById } from "./HelpMedecins";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { specialite } from "./HelpAddM";

interface Props {
  onUpdate?: () => void;
}

const UpdateMedecins: React.FC<Props> = ({ onUpdate }) => {
  const [medecin, setMedecin] = useState<RecepMedecins | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedecin = async () => {
      try {
        if (id) {
          const medecinData = await getMedecinById(Number(id));
          setMedecin(medecinData.data);
        }
      } catch (error) {
        console.error("Error fetching medecin:", error);
      }
    };
    fetchMedecin();
  }, [id]);

  const notifySuccess = () => toast.success("Article modifié !");
  const notifyError = () => toast.error("Erreur lors de la modification de l'article");

  const formik = useFormik({
    initialValues: {
      nom: medecin?.nom || "",
      prenom: medecin?.prenom || "",
      specialite: medecin?.specialite || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (id) {
          await updateMedecin(Number(id), values);
          if (onUpdate) {
            onUpdate();
          }
          notifySuccess();
          navigate("/medecins");
        }
      } catch (error) {
        console.error("Error updating medecin:", error);
        notifyError();
      }
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};
      if (!values.nom) {
        errors.nom = "Le nom complet est requis";
      }
      if (!values.specialite) {
        errors.specialite = "La spécialité est requise";
      }
      return errors;
    },
  });

  if (!medecin) return <div>Loading...</div>;

  return (
    <div className="rdv">
      <div className="rdv-content">
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
            <span className="subcategory">Modifier un médecin</span>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th><label htmlFor="nom">Nom:</label></th>
                <td>
                  <input
                    id="nom"
                    type="text"
                    name="nom"
                    value={formik.values.nom}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.nom && formik.errors.nom && (
                    <div className="error">{formik.errors.nom}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th><label htmlFor="prenom">Prénom:</label></th>
                <td>
                  <input
                    id="prenom"
                    type="text"
                    name="prenom"
                    value={formik.values.prenom}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.prenom && formik.errors.prenom && (
                    <div className="error">{formik.errors.prenom}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th><label htmlFor="specialite">Spécialité:</label></th>
                <td>
                  <select
                    id="specialite"
                    name="specialite"
                    value={formik.values.specialite}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Choisissez une spécialité</option>
                    {specialite.map((s) => (
                      <option value={s.text} key={s.id}>
                        {s.text}
                      </option>
                    ))}
                  </select>
                  {formik.touched.specialite && formik.errors.specialite && (
                    <div className="error">{formik.errors.specialite}</div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="Btn-add">Mettre à jour</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateMedecins;
