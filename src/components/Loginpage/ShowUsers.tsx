import React, { useEffect, useState } from "react";
import { Userhead, RecepUser, getDataUser, deleteUser } from "./HelpLogin";
import { BiTrash } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

interface Props {
  searchTerm: string;
  sortOption: string;
}

const ShowUsers: React.FC<Props> = ({ searchTerm, sortOption }) => {
  const [User, setUser] = useState<RecepUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getDataUser();
        if (Array.isArray(response)) {
          console.log("Fetched User data:", response); // Debug log
          setUser(response);
        } else {
          setUser([]);
        }
      } catch (error) {
        console.error("Erreur de fetching:", error);
        setUser([]);
      }
    };

    fetchUser();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(User.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const currentUser = User.slice(offset, offset + itemsPerPage).reverse();

  const sortedUser = [...currentUser].sort((a, b) => {
    const titleA = a.email || "";
    const titleB = b.email || "";
    if (sortOption === "az") {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });

  const filteredUser = sortedUser.filter(
    (User) =>
      User.email &&
      User.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUser(User.filter((User) => User.id !== id));
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  const handleUpdate = (id: number) => {
    navigate(`/users/update-user/${id}`);
  };


  return (
    <div className="" style={{marginTop: "8rem"}}>
        <table className="table table-striped table-hover table-bordered rounded-table">
          <thead>
            <tr>
              {Userhead.map((header, index) => (
                <th key={index}>{header.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUser.length >= 0 ? (
              filteredUser.map((User, index) => (
                <tr key={index}>
                  <td>{User.nom || "N/A"}</td>
                  <td>{User.prenom || "N/A"}</td>
                  <td>{User.telephone || "N/A"}</td>
                  <td>{User.email || "N/A"}</td>
                  <td>
                    {User.roles
                      ? User.roles + "..."
                      : "N/A"}
                  </td>
                  <td className="d-flex justify-content-center flex-column align-items-center">
                    <div
                      style={{
                        cursor: "pointer",
                        color: "rgb(221, 66, 66)",
                        fontSize: "1.2rem",
                      }}
                      onClick={() => handleDelete(User.id)}
                    >
                      <BiTrash />
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                        color: "black",
                        fontSize: "1rem",
                      }}
                      onClick={() => handleUpdate(User.id)}
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
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ fontWeight: "bolder", color: "rgb(221, 66, 66)" }}
          >
            {filteredUser.length <= 0 ? <div>Il exist aucun article!</div> : ""}
          </div>
      </div>
    </div>
  );
};

export default ShowUsers;
