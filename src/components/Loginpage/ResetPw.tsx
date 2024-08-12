import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../helpers/Api";

const ResetPw: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const notifySuccess = () => toast.success("Password reset successful!");
  const notifyError = (message: string) => toast.error(`Error: ${message}`);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(`${apiUrl}/reset-password`, {
          token,
          password: values.password,
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
    <div className="reset-password">
      <form onSubmit={formik.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th><label htmlFor="password">New Password</label></th>
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
              <th><label htmlFor="confirmPassword">Confirm Password</label></th>
              <td>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" disabled={formik.isSubmitting}>Reset Password</button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default ResetPw;
