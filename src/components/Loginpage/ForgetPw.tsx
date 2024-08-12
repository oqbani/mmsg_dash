import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "../../helpers/Api";
import { useParams } from "react-router-dom";

const ForgetPw: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get user ID from URL params
  const formData = new FormData()

  const notifySuccess = () => toast.success("Mot de passe changé!");
  const notifyError = (message: string) => toast.error(`Error: ${message}`);

  const formik = useFormik({
    initialValues: { email: "", password: "", newPassword: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Old password is required"),
      newPassword: Yup.string().required("New password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!id) {
        notifyError("User ID is missing.");
        setSubmitting(false);
        return;
      }

      try {
        formData.append("password", values.password)
        formData.append("newpassword", values.newPassword)
        formData.append("email", values.email)
        console.log(formData);
        

        // Verify the correct HTTP method and endpoint
        const response = await axios.post(`${apiUrl}/edit-password`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('mmsg_token')}`,
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
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="forget-password">
      <form onSubmit={formik.handleSubmit}>
        <table>
          <tbody>
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
                <label htmlFor="password">Old Password</label>
              </th>
              <td>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="newPassword">New Password</label>
              </th>
              <td>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="error">{formik.errors.newPassword}</div>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="Btn-add" disabled={formik.isSubmitting}>
            Modifier password
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default ForgetPw;
