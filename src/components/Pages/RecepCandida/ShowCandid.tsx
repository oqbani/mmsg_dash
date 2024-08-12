import React, { useEffect, useState } from "react";
import {
  Candidahead,
  RecepCandida,
  getDataCandida,
  deleteCandida,
} from "./HelpCandid";
import { BiTrash } from "react-icons/bi";
import { BsDownload, BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { uploadUrl } from "../../../helpers/Api";

interface Props {
  searchTerm: string;
  sortOption: string;
}

const ShowCandid: React.FC<Props> = ({ searchTerm, sortOption }) => {
  const [Candid, setCandid] = useState<RecepCandida[]>([]);

  useEffect(() => {
    const fetchCandid = async () => {
      try {
        const data = await getDataCandida();
        setCandid(data);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchCandid();
  }, []);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(Candid.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const currentCandidUsers = Candid.slice(offset, offset + itemsPerPage);

  // SORTED Candid USERS
  const sortedCandidUsers = [...currentCandidUsers].sort((a, b) => {
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

  // FILTERED Candid USERS
  const filteredCandidUsers = sortedCandidUsers.filter(
    (Candid) =>
      Candid.nom && Candid.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // OPEN FILE IN NEW TAB
  const openFile = (filePath: string) => {
    if (!filePath) {
      console.error("File path is undefined or empty");
      return;
    }
    window.open(filePath, "_blank");
  };

  // DOWNLOAD FILE
  // const downloadFile = (filePath: string) => {
  //   if (!filePath) {
  //     console.error("File path is undefined or empty");
  //     return;
  //   }
  //   const link = document.createElement("a");
  //   link.href = filePath;
  //   link.download = filePath.split("/").pop() || "download";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  // DELETE CANDID
  const handleDelete = async (id: number) => {
    try {
      await deleteCandida(id);
      setCandid(Candid.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  const navigate = useNavigate();

  const handleSee = (id: number) => {
    navigate(`/candidatures/${id}`);
  };

  return (
    <div>
      <table className="table table-striped table-hover table-bordered rounded-table">
        <thead>
          <tr>
            {Candidahead.map((headItem, index) => (
              <th key={index}>{headItem.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCandidUsers.map((candid, index) => (
            <tr key={index}>
              <td>{candid.nom}</td>
              <td>{candid.prenom}</td>
              <td>+{candid.telephone}</td>
              {candid.type === "image" ? (
                <td
                  className="d-flex align-items-center justify-content-between h-100 fw-semibold"
                  onClick={() => openFile(`${uploadUrl}/file_upload/${candid.fichier}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`${uploadUrl}/file_upload/${candid.fichier}`}
                    style={{ width: "8rem", cursor: "pointer" }}
                    alt=""
                  />
                  <BsDownload />
                </td>
              ) : (
                <td
                  className="d-flex align-items-center justify-content-between h-100 fw-semibold"
                  onClick={() => openFile(`${uploadUrl}/file_upload/${candid.fichier}`)}
                  // onClick={() => downloadFile(candid.fichier)}
                  style={{ cursor: "pointer" }}
                >
                  <p style={{ cursor: "pointer" }}>
                    {candid.fichier}
                  </p>
                  <BsDownload />
                </td>
              )}
              <td className="">
                <div
                  style={{
                    cursor: "pointer",
                    color: "rgb(221, 66, 66)",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleDelete(candid.id)}
                >
                  <BiTrash />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleSee(candid.id)}
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

export default ShowCandid;

