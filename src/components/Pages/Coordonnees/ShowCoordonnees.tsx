import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { Coohead, deleteCoo, getDataCoo, RecepCoo } from "./HelpCoordo";


interface Props {
  searchTerm: string;
  sortOption: string;
}

const ShowCoordonnees: React.FC<Props> = ({ searchTerm, sortOption }) => {
  const [Coordonnees, setCoordonnees] = useState<RecepCoo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoordonnees = async () => {
      try {
        const response = await getDataCoo();
        if (Array.isArray(response)) {
          console.log("Fetched Coordonnees data:", response); // Debug log
          setCoordonnees(response);
        } else {
          setCoordonnees([]);
        }
      } catch (error) {
        console.error("Erreur de fetching:", error);
        setCoordonnees([]);
      }
    };

    fetchCoordonnees();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(Coordonnees.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const currentCoordonnees = Coordonnees.slice(offset, offset + itemsPerPage).reverse();

  const sortedCoordonnees = [...currentCoordonnees].sort((a, b) => {
    const titleA = a.email || "";
    const titleB = b.email || "";
    if (sortOption === "az") {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });

  const filteredCoordonnees = sortedCoordonnees.filter(
    (Coordonnees) =>
      Coordonnees.email &&
      Coordonnees.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDelete = async (id: number) => {
    try {
      await deleteCoo(id);
      setCoordonnees(Coordonnees.filter((Coordonnees) => Coordonnees.id !== id));
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  const handleUpdate = (id: number) => {
    navigate(`/coordonnees/update-coordonnees/${id}`);
  };


  return (
    <div className="section-Coordonnees" style={{marginTop: "8rem", color: "rgb(19, 0, 88)"}}>
      <table className="table table-striped table-hover table-bordered rounded-table">
        <thead>
          <tr>
            {Coohead.map((header, index) => (
              <th key={index}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCoordonnees.length >= 0 ? (
            filteredCoordonnees.map((Coordonnees, index) => (
              <tr key={index} style={{fontSize: ".8rem"}}>
                <td>+{Coordonnees.telephone || "N/A"}</td>
                <td>{Coordonnees.email || "N/A"}</td>
                <td>{Coordonnees.horaire || "N/A"}</td>
                <td>{Coordonnees.facebook || "N/A"}</td>
                <td>
                  {Coordonnees.instagram}
                </td>
                <td>
                  {Coordonnees.linkedin}
                </td>
                <td>
                  {Coordonnees.youtube}
                </td>
                <td className="d-flex justify-content-center flex-column align-items-center">
                  <div
                    style={{
                      cursor: "pointer",
                      color: "rgb(221, 66, 66)",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => handleDelete(Coordonnees.id)}
                  >
                    <BiTrash />
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontSize: "1rem",
                    }}
                    onClick={() => handleUpdate(Coordonnees.id)}
                  >
                    <GrUpdate />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <div>Il exist aucun article!</div>
          )}
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
        <div className="d-flex justify-content-center align-items-center" style={{fontWeight: "bolder", color: "rgb(221, 66, 66)"}}>
          {filteredCoordonnees.length <= 0 ? <div>Il exist aucun article!</div> : ""}
        </div>
      </div>
    </div>
  );
};

export default ShowCoordonnees;
