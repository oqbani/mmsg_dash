import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "../components/Acceuil/Navbar/Nav";
import Navbar from "../components/Acceuil/Navbar/Navbar";
import Contact from "../components/Pages/Contact/Contact";
import Coordonnees from "../components/Pages/Coordonnees/Coordonnees";
import Rdv from "../components/Pages/RecepRdv/Rdv";
import Presc from "../components/Pages/Receppresc/Presc";
import Candidature from "../components/Pages/RecepCandida/Candidature";
import Medecins from "../components/Pages/Medecins/Medecins";
import Blog from "../components/Pages/Blog/Blog";
import AddMedecins from "../components/Pages/Medecins/AddMedecins";
import AddBlog from "../components/Pages/Blog/AddBlog";
import UpdateMedecins from "../components/Pages/Medecins/UpdateMedecins";
import UpdateBlog from "../components/Pages/Blog/UpdateBlog";
import SeeRdv from "../components/Pages/RecepRdv/SeeRdv";
import SeePresc from "../components/Pages/Receppresc/SeePresc";
import SeeCandida from "../components/Pages/RecepCandida/SeeCandidature";
import SeeMedecins from "../components/Pages/Medecins/SeeMedecins";
import SeeBlog from "../components/Pages/Blog/SeeBlog";
import Acceuil from "../components/Acceuil/Home/Acceuil";
import SeeContact from "../components/Pages/Contact/SeeContact";
import Login from "../components/Loginpage/Login";
import UpdateLogin from "../components/Loginpage/UpdateLogin";
import Users from "../components/Loginpage/Users";
import UpdateCoo from "../components/Pages/Coordonnees/UpdateCoo";
import AddUsers from "../components/Loginpage/AddUsers";

const AppRouter: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Router>
      {showLogin ? (
        <div>
          <Login onLoginSuccess={() => setShowLogin(false)} />
        </div>
      ) : (
        <div>
          <Navbar />
          <Nav />
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/login" element={<Login onLoginSuccess={() => setShowLogin(false)}/>} />
            {/* Login */}
            <Route path="/users/add-users" element={<AddUsers />} />
            <Route path="/users/update-user/:id" element={<UpdateLogin />} />
            <Route path="/utilisateur" element={<Users />} />
            <Route path="/messages" element={<Contact />} />
            <Route path="/messages/see-message/:id" element={<SeeContact />} />

            {/* RDV */}
            <Route path="/rendez-vous" element={<Rdv />} />
            <Route path="/rendez-vous/:id" element={<SeeRdv />} />

            <Route path="/prescriptions" element={<Presc />} />
            <Route path="/prescriptions/:id" element={<SeePresc />} />

            <Route path="/candidatures" element={<Candidature />} />
            <Route path="/candidatures/:id" element={<SeeCandida />} />

            <Route path="/coordonnees" element={<Coordonnees />} />
            <Route path="coordonnees/update-coordonnees/:id" element={<UpdateCoo />} />

            {/* MEDECINS */}
            <Route path="/medecins" element={<Medecins />} />
            <Route path="/medecins/add-medecin" element={<AddMedecins />} />
            <Route
              path="/medecins/update-medecin/:id"
              element={<UpdateMedecins />}
            />
            <Route path="/medecins/see-medecin/:id" element={<SeeMedecins />} />

            {/* BLOG */}
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/add-blog" element={<AddBlog />} />
            <Route path="/blogs/update-blog/:id" element={<UpdateBlog />} />
            <Route path="/blogs/see-blog/:id" element={<SeeBlog />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default AppRouter;
