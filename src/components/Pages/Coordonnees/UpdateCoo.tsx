import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getCooById, RecepCoo, updateCoo } from "./HelpCoordo";

const UpdateCoo: React.FC = () => {
  const [coordonnee, setCoordonnee] = useState<RecepCoo | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoordonnee = async () => {
      try {
        if (id) {
          const coordonneeData = await getCooById(Number(id));
          setCoordonnee(coordonneeData.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des coordonnées:", error);
      }
    };
    fetchCoordonnee();
  }, [id]);

  const notifySuccess = () => toast.success("Coordonnée modifiée !");
  const notifyError = () => toast.error("Erreur lors de la modification de la coordonnée");

  const formik = useFormik({
    initialValues: {
      id: coordonnee?.id || 0,
      telephone: coordonnee?.telephone || "",
      email: coordonnee?.email || "",
      horaire: coordonnee?.horaire || "",
      facebook: coordonnee?.facebook || "",
      instagram: coordonnee?.instagram || "",
      linkedin: coordonnee?.linkedin || "",
      youtube: coordonnee?.youtube || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (id) {
          await updateCoo(Number(id), values); // Pass values directly as JSON
          notifySuccess();
          navigate("/coordonnees");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour des coordonnées:", error);
        notifyError();
      }
    },
  });

  if (!coordonnee) return <div>Loading...</div>;

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
            <Link to={"/coordonnees"}>
              <span>Coordonnées</span>
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className="arrow" />
          </div>
          <div>
            <span className="subcategory">Modifier une coordonnée</span>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>
                  <label htmlFor="telephone">Téléphone:</label>
                </th>
                <td>
                  <input
                    id="telephone"
                    type="text"
                    name="telephone"
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.telephone && formik.errors.telephone && (
                    <div className="error">{formik.errors.telephone}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="email">Email:</label>
                </th>
                <td>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="horaire">Horaire:</label>
                </th>
                <td>
                  <input
                    id="horaire"
                    type="text"
                    name="horaire"
                    value={formik.values.horaire}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.horaire && formik.errors.horaire && (
                    <div className="error">{formik.errors.horaire}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="facebook">Facebook:</label>
                </th>
                <td>
                  <input
                    id="facebook"
                    type="text"
                    name="facebook"
                    value={formik.values.facebook}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.facebook && formik.errors.facebook && (
                    <div className="error">{formik.errors.facebook}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="instagram">Instagram:</label>
                </th>
                <td>
                  <input
                    id="instagram"
                    type="text"
                    name="instagram"
                    value={formik.values.instagram}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.instagram && formik.errors.instagram && (
                    <div className="error">{formik.errors.instagram}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="linkedin">Linkedin:</label>
                </th>
                <td>
                  <input
                    id="linkedin"
                    type="text"
                    name="linkedin"
                    value={formik.values.linkedin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.linkedin && formik.errors.linkedin && (
                    <div className="error">{formik.errors.linkedin}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="youtube">Youtube:</label>
                </th>
                <td>
                  <input
                    id="youtube"
                    type="text"
                    name="youtube"
                    value={formik.values.youtube}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.youtube && formik.errors.youtube && (
                    <div className="error">{formik.errors.youtube}</div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="Btn-add">
            Mettre à jour
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateCoo;
