import React, { useRef } from "react";
import { ValidLogin } from "./HelpLogin";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "/mmsg-logo.png";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { apiUrl } from "../../helpers/Api";

interface LoginProps {
  onLoginSuccess: () => void;
}

const JSONHeader = {
  'Content-Type': 'application/json',
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  
  const notifySuccess = () => toast.success("Login successful!");
  const notifyError = () => toast.error("Invalid login credentials!");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidLogin,
    onSubmit: async (values, { resetForm }) => {
      try {
        const loginResponse = await axios.post(`${apiUrl}/login`, values, {
          headers: JSONHeader,
        });

        if (loginResponse.status === 200) {
          const { token } = loginResponse.data;
          localStorage.setItem('mmsg_token', token);

          const userResponse = await axios.get(`${apiUrl}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userResponse.status === 200) {
            localStorage.setItem('mmsg_user', JSON.stringify(userResponse.data));
            notifySuccess();
            resetForm();
            onLoginSuccess();
            navigate("/");
          } else {
            notifyError();
          }
        } else {
          notifyError();
        }
      } catch (error) {
        notifyError();
      }
    },
  });

  return (
    <div className="login" style={{zIndex: "100", position: "fixed"}}>
      <div className="login-content">
        <div className="d-flex justify-content-center align-items-center">
          <img src={logo} style={{ width: "8rem" }} alt="Logo" />
        </div>
        <form ref={formRef} onSubmit={formik.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>
                  <label htmlFor="email">Email:</label>
                </th>
                <td>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="admin@global.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="password">Password:</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="Btn-add" disabled={formik.isSubmitting}>
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        style={{ position: "absolute", top: "10%", right: "1rem" }}
      />
    </div>
  );
};

export default Login;
