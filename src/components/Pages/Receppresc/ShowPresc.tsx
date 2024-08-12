import React, { useEffect, useState } from "react";
import { Preschead, RecepPresc, deletePresc, getDataPresc } from "./HelpPresc";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

interface Props {
  searchTerm: string;
  sortOption: string;
}

const ShowPresc: React.FC<Props> = ({ searchTerm, sortOption }) => {
  const [prescriptions, setPrescriptions] = useState<RecepPresc[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getDataPresc();
        if (data) {
          setPrescriptions(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(prescriptions.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const currentPrescUsers = prescriptions.slice(offset, offset + itemsPerPage).reverse();

  // SORTED Presc USERS
  const sortedPrescUsers = [...currentPrescUsers].sort((a, b) => {
    if (!a.nom || !b.nom) {
      console.warn("Invalid data:", a, b);
      return 0;
    }
    if (sortOption === "az") {
      return a.nom.localeCompare(b.nom);
    } else {
      return b.nom.localeCompare(a.nom);
    }
  });

  // FILTERED Presc USERS
  const filteredPrescUsers = sortedPrescUsers.filter((presc) =>
    presc.nom && presc.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CRUD
  const handleDeletePresc = async (id: number) => {
    try {
      await deletePresc(id);
      setPrescriptions(prescriptions.filter((presc) => presc.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  
  const navigate = useNavigate()

  const handleSee = (id: number) => {
    navigate(`/prescriptions/${id}`);
  };

  // Date time picker
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
      return dateTime;
    }
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };
  return (
    <div>
      <table className="table table-striped table-hover table-bordered rounded-table">
        <thead>
          <tr>
            {Preschead.map((headItem, index) => (
              <th key={index}>{headItem.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPrescUsers.map((presc) => (
            <tr key={presc.id}>
              <td>{presc.nom}</td>
              <td>{presc.prenom}</td>
              <td>+{presc.telephone}</td>
              <td>{presc.email}</td>
              <td>{presc.medecins}</td>
              <td>{formatDateTime(presc.date)}</td>
              <td>{presc.message}</td>
              <td className="d-flex justify-content-center flex-column align-items-center">
                <div
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleDeletePresc(presc.id)}
                >
                  <BiTrash />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleSee(presc.id)}
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

export default ShowPresc;
