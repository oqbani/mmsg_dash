import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RecepBlog, updateBlog, getBlogById } from "./HelpBlog";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaBlog } from "react-icons/fa6";

interface Props {
  onUpdate?: () => void;
}

const UpdateBlog: React.FC<Props> = ({ onUpdate }) => {
  const [blog, setBlog] = useState<RecepBlog | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const blogData = await getBlogById(Number(id));
          setBlog(blogData.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const notifySuccess = () => toast.success("Article modifié !");
  const notifyError = () =>
    toast.error("Erreur lors de la modification de l'article");

  const formik = useFormik({
    initialValues: {
      id: blog?.id || 0,
      titreFr: blog?.titreFr || "",
      titreEn: blog?.titreEn || "",
      categorieFr: blog?.categorieFr || "",
      categorieEn: blog?.categorieEn || "",
      contenuFr: blog?.contenuFr || "",
      contenuEn: blog?.contenuEn || "",
      date: blog?.date || "",
      image: null,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("id", values.id.toString());
        formData.append("titreFr", values.titreFr);
        formData.append("titreEn", values.titreEn);
        formData.append("categorieFr", values.categorieFr);
        formData.append("categorieEn", values.categorieEn);
        formData.append("contenuFr", values.contenuFr);
        formData.append("contenuEn", values.contenuEn);
        formData.append("date", values.date);

        if (values.image) {
          formData.append("image", values.image);
        }

        if (id) {
          await updateBlog(Number(id), formData);
          if (onUpdate) {
            onUpdate();
          }
          notifySuccess();
          navigate("/blogs");
        }
      } catch (error) {
        console.error("Error updating blog:", error);
        notifyError();
      }
    },
  });

  useEffect(() => {
    if (blog) {
      formik.setValues({
        id: blog.id,
        titreFr: blog.titreFr,
        titreEn: blog.titreEn,
        categorieFr: blog.categorieFr,
        categorieEn: blog.categorieEn,
        contenuFr: blog.contenuFr,
        contenuEn: blog.contenuEn,
        date: blog.date,
        image: null,
      });
    }
  }, [blog, formik.setValues]);

  if (!blog) return <div>Loading...</div>;

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
            <Link to={"/blogs"}>
              <FaBlog />
              <span>Blogs</span>
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className="arrow" />
          </div>
          <div>
            <span className="subcategory">Modifier un article</span>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>
                  <label htmlFor="titreFr">Titre (FR):</label>
                </th>
                <td>
                  <input
                    id="titreFr"
                    type="text"
                    name="titreFr"
                    value={formik.values.titreFr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.titreFr && formik.errors.titreFr && (
                    <div className="error">{formik.errors.titreFr}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="titreEn">Titre (EN):</label>
                </th>
                <td>
                  <input
                    id="titreEn"
                    type="text"
                    name="titreEn"
                    value={formik.values.titreEn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.titreEn && formik.errors.titreEn && (
                    <div className="error">{formik.errors.titreEn}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="categorieFr">Catégorie (FR):</label>
                </th>
                <td>
                  <input
                    id="categorieFr"
                    type="text"
                    name="categorieFr"
                    value={formik.values.categorieFr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.categorieFr && formik.errors.categorieFr && (
                    <div className="error">{formik.errors.categorieFr}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="categorieEn">Catégorie (EN):</label>
                </th>
                <td>
                  <input
                    id="categorieEn"
                    type="text"
                    name="categorieEn"
                    value={formik.values.categorieEn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.categorieEn && formik.errors.categorieEn && (
                    <div className="error">{formik.errors.categorieEn}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="contenuFr">Contenu (FR):</label>
                </th>
                <td>
                  <textarea
                    id="contenuFr"
                    name="contenuFr"
                    value={formik.values.contenuFr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.contenuFr && formik.errors.contenuFr && (
                    <div className="error">{formik.errors.contenuFr}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="contenuEn">Contenu (EN):</label>
                </th>
                <td>
                  <textarea
                    id="contenuEn"
                    name="contenuEn"
                    value={formik.values.contenuEn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.contenuEn && formik.errors.contenuEn && (
                    <div className="error">{formik.errors.contenuEn}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="date">Date:</label>
                </th>
                <td>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className="error">{formik.errors.date}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="image">Image:</label>
                </th>
                <td>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        formik.setFieldValue("image", file);
                      }
                    }}
                  />

                  {formik.touched.image && formik.errors.image && (
                    <div className="error">{formik.errors.image}</div>
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

export default UpdateBlog;
