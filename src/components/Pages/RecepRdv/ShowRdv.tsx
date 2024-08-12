import React, { useEffect, useState } from "react";
import { Rdvhead, RecepRdv, deleteRdv, getDataRdv } from "./HelpRdv";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

interface Props {
  searchTerm: string;
  sortOption: string;
}

const ShowRdv: React.FC<Props> = ({ searchTerm, sortOption }) => {
  const [Rdv, setRdv] = useState<RecepRdv[]>([]);

  useEffect(() => {
    const fetchRdv = async () => {
      try {
        const data = await getDataRdv();
        console.log("Fetched data:", data);
        setRdv(data);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchRdv();
  }, []);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(Rdv.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const currentRdvUsers = Rdv.slice(offset, offset + itemsPerPage).reverse();

  // SORTED RDVUSERS
  const sortedRdvUsers = [...currentRdvUsers].sort((a, b) => {
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

  // FILTERED RDVUSERS
  const filteredRdvUsers = sortedRdvUsers.filter(
    (rdv) => rdv.nom && rdv.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleDeleteRdv = async (id: number) => {
    try {
      await deleteRdv(id);
      setRdv(Rdv.filter((rdv) => rdv.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const navigate = useNavigate()

  const handleSee = (id: number) => {
    navigate(`/rendez-vous/${id}`);
  };

  // DATE TIME PICKER
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
      <table className="table table-striped table-hover table-bordered  rounded-table">
        <thead>
          <tr>
            {Rdvhead.map((rdv, index) => (
              <th key={index}>{rdv.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRdvUsers.map((rdv) => (
            <tr key={rdv.id}>
              <td>{rdv.nom}</td>
              <td>{rdv.prenom}</td>
              <td>+{rdv.telephone}</td>
              <td>{rdv.email}</td>
              <td>{rdv.medecins}</td>
              <td>{formatDateTime(rdv.date)}</td>
              <td>{rdv.message}</td>
              <td className="d-flex justify-content-center flex-column align-items-center">
                <div
                  style={{
                    cursor: "pointer",
                    color: "rgb(221, 66, 66)",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleDeleteRdv(rdv.id)}
                >
                  <BiTrash />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleSee(rdv.id)}
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

export default ShowRdv;
