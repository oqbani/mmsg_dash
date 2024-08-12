import React, { useEffect, useState } from "react";
import {
  Medecinshead,
  RecepMedecins,
  getDataMedecins,
  deleteMedecin,
} from "./HelpMedecins";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

interface Props {
  searchTerm: string;
  sortOption: string;
}

const ShowMedecins: React.FC<Props> = ({ searchTerm, sortOption }) => {
  const [medecins, setMedecins] = useState<RecepMedecins[]>([]);

  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const response = await getDataMedecins();
        setMedecins(response);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchMedecins();
  }, []);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(medecins.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const currentMedecinsUsers = medecins.slice(offset, offset + itemsPerPage);

  // SORTED MedecinsUSERS
  const sortedMedecinsUsers = [...currentMedecinsUsers].sort((a, b) => {
    if (sortOption === "az") {
      return a.nom.localeCompare(b.nom);
    } else {
      return b.nom.localeCompare(a.nom);
    }
  });

  // FILTERED MedecinsUSERS
  const filteredMedecinsUsers = sortedMedecinsUsers.filter(
    (medecin) =>
      medecin.nom &&
      medecin.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteMedecin(id);
      setMedecins(medecins.filter((medecin) => medecin.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const navigate = useNavigate();

  const handleUpdate = (id: number) => {
    navigate(`/medecins/update-medecin/${id}`);
  };

  const handleSee = (id: number) => {
    navigate(`/medecins/see-medecin/${id}`);
  };
  return (
    <div className="section-medecins">
      <table className="table table-striped table-hover table-bordered rounded-table">
        <thead>
          <tr>
            {Medecinshead.map((headItem, index) => (
              <th key={index}>{headItem.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredMedecinsUsers.map((medecin, index) => (
            <tr key={index}>
              <td>
                Dr. {medecin.nom} {medecin.prenom}
              </td>
              <td>{medecin.specialite}</td>
              <td className="d-flex justify-content-center flex-column align-items-center">
                <div
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleDelete(medecin.id)}
                >
                  <BiTrash />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    color: "black",
                    fontSize: "1rem",
                  }}
                  onClick={() => handleUpdate(medecin.id)}
                >
                  <GrUpdate />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleSee(medecin.id)}
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

export default ShowMedecins;
