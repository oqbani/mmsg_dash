import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "../../helpers/Api";
import { FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

const AddUsers: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const notifySuccess = () => toast.success("User added successfully!");
  const notifyError = (message: string) => toast.error(`Error: ${message}`);

  const formik = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      roles: "",
      password: "",
    },
    validationSchema: Yup.object({
      nom: Yup.string().required("Required"),
      prenom: Yup.string().required("Required"),
      telephone: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      roles: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("nom", values.nom);
        formData.append("prenom", values.prenom);
        formData.append("telephone", values.telephone);
        formData.append("email", values.email);
        formData.append("roles", values.roles);
        formData.append("password", values.password);
        console.log(formData);

        const response = await axios.post(`${apiUrl}/user-register`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("mmsg_token")}`,
          },
        });

        if (response.status === 200) {
          notifySuccess();
          resetForm();
        } else {
          notifyError("Something went wrong. Please try again.");
        }
      } catch (error: any) {
        notifyError(
          error.response?.data?.message || "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="Blog">
      <div className="Blog-content">
        {/* Navigation */}
        <div className="filter d-flex">
          <div>
            <Link to={"/"}>
              <FaHome />
              <span>Acceuil</span>
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className="arrow" />
          </div>
          <div>
            <span className="subcategory">
              <FaUser />
              User
            </span>
          </div>
        </div>
        <h4 className="my-4">AJOUTER UN NOUVEAU UTILISATEUR</h4>
        <form onSubmit={formik.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>
                  <label htmlFor="nom">Nom</label>
                </th>
                <td>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nom}
                  />
                  {formik.touched.nom && formik.errors.nom ? (
                    <div className="error">{formik.errors.nom}</div>
                  ) : null}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="prenom">Prenom</label>
                </th>
                <td>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.prenom}
                  />
                  {formik.touched.prenom && formik.errors.prenom ? (
                    <div className="error">{formik.errors.prenom}</div>
                  ) : null}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="telephone">Telephone</label>
                </th>
                <td>
                  <input
                    id="telephone"
                    name="telephone"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.telephone}
                  />
                  {formik.touched.telephone && formik.errors.telephone ? (
                    <div className="error">{formik.errors.telephone}</div>
                  ) : null}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="email">Email</label>
                </th>
                <td>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="roles">Roles</label>
                </th>
                <td>
                  <input
                    id="roles"
                    name="roles"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.roles}
                  />
                  {formik.touched.roles && formik.errors.roles ? (
                    <div className="error">{formik.errors.roles}</div>
                  ) : null}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="password">Password</label>
                </th>
                <td>
                  <div
                    className="password-container"
                    style={{ position: "relative" }}
                  >
                    <input
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                      style={{
                        height: "3rem",
                        width: "3rem",
                        marginLeft: ".5rem",
                        borderRadius: ".4rem",
                        background: "rgb(19, 0, 88)",
                        color: "white",
                        border: "none",
                      }}
                    >
                      {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error">{formik.errors.password}</div>
                    ) : null}
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="d-flex justify-content-center align-items-center"
                >
                  <button
                    type="submit"
                    className="Btn-add"
                    disabled={loading || formik.isSubmitting}
                  >
                    {loading ? "Adding..." : "Ajouter"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
};

export default AddUsers;
