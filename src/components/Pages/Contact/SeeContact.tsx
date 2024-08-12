import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecepContact, getContactById } from "./HelpContact";
const SeeContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [Contact, setContact] = useState<RecepContact | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await getContactById(Number(id));
        setContact(response.data);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchContact();
  }, [id]);

  if (!Contact) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="contact">
      <div className="contact-content">
        <h2 className="mb-4">Détails du message</h2>
        <table>
            <tr>
                <th><strong>Nom:</strong></th>
                <td> {Contact.nom}</td>
            </tr>
            <tr>
                <th><strong>Prénom:</strong></th>
                <td> {Contact.prenom}</td>
            </tr>
            <tr>
                <th><strong>Telephone:</strong></th>
                <td>+{Contact.telephone}</td>
            </tr>
            <tr>
                <th><strong>Email:</strong></th>
                <td>{Contact.email}</td>
            </tr>
            <tr>
                <th><strong>Message</strong></th>
                <td>{Contact.message}</td>
            </tr>
        </table>
      </div>
    </div>
  );
};

export default SeeContact;
