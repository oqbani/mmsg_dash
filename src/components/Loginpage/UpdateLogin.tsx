import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ForgetPw from './ForgetPw';
import { getUserById, updateUser } from './HelpLogin';
import { RecepUser } from './HelpLogin';
import { useParams } from 'react-router-dom';

const UpdateLogin: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // UseParams to get dynamic user ID
  const [user, setUser] = useState<RecepUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await getUserById(parseInt(id));
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, [id]);

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required('Champs obligatoire!!'),
    prenom: Yup.string().required('Champs obligatoire!!'),
    telephone: Yup.string().required('Champs obligatoire!!'),
    email: Yup.string().email('Email invalide').required('Champs obligatoire!!')
  });

  const formik = useFormik({
    initialValues: user || {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      password: ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (id) {
          await updateUser(parseInt(id), values); // Pass plain object directly
          alert('User updated successfully');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  });

  return (
    <div className="Blog">
      <div className="Blog-content">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button fw-bolder"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Modifier votre compte
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <form onSubmit={formik.handleSubmit}>
                  <table>
                    <tbody>
                      <tr>
                        <th><label htmlFor="nom">Nom</label></th>
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
                        <th><label htmlFor="prenom">Prenom</label></th>
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
                        <th><label htmlFor="telephone">Telephone</label></th>
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
                        <th><label htmlFor="email">Email</label></th>
                        <td>
                          <input
                            id="email"
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                          ) : null}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="submit" className="Btn-add">Modifier</button>
                </form>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed  fw-bolder"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Modifier Password
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ForgetPw />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLogin;
