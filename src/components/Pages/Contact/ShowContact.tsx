import React, { useEffect, useState, useMemo } from "react";
import { RecepContact, contacthead, deleteContact, getDataContact } from "./HelpContact";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

interface Props {
  searchTerm: string;
  sortOption: string;
}

const ShowContact: React.FC<Props> = ({ searchTerm, sortOption }) => {
  const [contacts, setContacts] = useState<RecepContact[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;
  const navigate = useNavigate(); // useNavigate hook should be here

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getDataContact();
        if (data) {
          setContacts(data);
        } else {
          console.error("No data received");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(contacts.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const currentContacts = useMemo(() => {
    return contacts.slice(offset, offset + itemsPerPage);
  }, [contacts, offset, itemsPerPage]);

  const sortedContacts = useMemo(() => {
    return [...currentContacts].sort((a, b) => {
      if (sortOption === "az") {
        return a.nom.localeCompare(b.nom);
      } else {
        return b.nom.localeCompare(a.nom);
      }
    });
  }, [currentContacts, sortOption]);

  const filteredContacts = useMemo(() => {
    return sortedContacts.filter((contact) =>
      contact.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedContacts, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  const handleSee = (id: number) => {
    navigate(`/messages/see-message/${id}`);
  };

  return (
    <div className="">
      <table className="table table-striped table-hover table-bordered rounded-table">
        <thead>
          <tr>
            {contacthead.map((c) => (
              <th key={c.id}>{c.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.nom}</td>
              <td>{contact.prenom}</td>
              <td>{contact.telephone}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td className="action-icons">
                <div
                  style={{
                    cursor: "pointer",
                    color: "rgb(221, 66, 66)",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleDelete(contact.id)}
                >
                  <BiTrash />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleSee(contact.id)}
                >
                  <BsEye />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <ReactPaginate
          previousLabel={"< "}
          nextLabel={" >"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination-container"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          activeClassName={"active-page"}
          previousClassName={"previous-page"}
          nextClassName={"next-page"}
          previousLinkClassName={"previous-link"}
          nextLinkClassName={"next-link"}
          breakClassName={"break-item"}
          breakLinkClassName={"break-link"}
        />
      </div>
    </div>
  );
};

export default ShowContact;
