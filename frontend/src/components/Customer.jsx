

import React, { useState } from "react";
import { getToken } from "../utils/auth";
import { useEffect } from "react";
import axios from "axios";

const Customer = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;



  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = getToken();

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
        
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.response?.data?.message || "Unauthorized or server error");
      }
    };

    fetchUsers();
  }, []);






  /////////////////////////////////////////





  
const toggleStatus = async (userId) => {
  
  try {
    const token = getToken();
    const updatedStatus = users.find(u => u._id === userId)?.status === "active"
      ? "blocked"
      : "active";

    const response = await axios.put(
     `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
      { status: updatedStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // show changes in frontend

    const updatedUsers = users.map(user =>
      user._id === userId ? { ...user, status: updatedStatus } : user
    );
    setUsers(updatedUsers);

    console.log("Status updated successfully:", response.data.message);


  } catch (error) {
    console.error("Error updating status:", error.response?.data?.message || error.message);
  }
};

















const handleDelete = async (userId) => {
  
  try {
    const token = getToken();
    const response = await axios.delete(
     `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedUsers = users.filter(user =>
      user._id !== userId);

    setUsers(updatedUsers);

    console.log("User Deleted successfully:", response.data.message);
  } catch (error) {
    console.error("Error deleting user:", error.response?.data?.message || error.message);
  }
};









  //**************************** */ Search filter **************************** */
  const filteredData = users.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||  item.email.toLowerCase().includes(search.toLowerCase())
  );


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  //**************************** */ Pagination logic for 4-page**************************** */
  const pageLimit = 5;
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
    for (let i = start; i < start + pageLimit && i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-4 sm:p-6 max-w-full w-full mx-0">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      {/*****************************  Search and Add Category **************************** */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:max-w-sm"
        />
      </div>









{/* responsive table */}

<div className="w-full overflow-x-auto rounded-md ">
  <div className="min-w-[800px]">
    <table className="w-full border text-left text-sm sm:text-base">
      <thead className="bg-black text-white">
        <tr>
          <th className="py-2 px-2 sm:px-4 border-b">Student Name</th>
          <th className="py-2 px-2 sm:px-4 border-b">Student Email</th>
          <th className="py-2 px-2 sm:px-4 border-b">Trainer Name</th>
          <th className="py-2 px-2 sm:px-4 border-b">Course</th>
          <th className="py-2 px-2 sm:px-4 border-b">Rating</th>
          <th className="py-2 px-2 sm:px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((user) => (
          <tr key={user.id} className="hover:bg-gray-100 transition">
            <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base hover:bg-gray-200">{user.name || "-"}</td>
            <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base">{user.email || "-"}</td>
            <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base">{user.trainer || "-"}</td>
            <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base">{user.course || "-"}</td>
            <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base">{user.rating || "-"}</td>
            <td className="py-2 px-2 sm:px-4 border-b text-center text-xs sm:text-base">
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 rounded-full bg-red-600 text-white text-xs sm:text-sm hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



















































      {/* ****************************  Table ****************************
      <div className="overflow-x-auto  ">
        <table className="min-w-full border text-left text-sm sm:text-base">
          <thead className="bg-black text-white">
            <tr>
              {/* <th className="py-2 px-2 sm:px-4 border-b">Image</th> 
              <th className="py-2 px-2 sm:px-4 border-b">Student Name</th>
              <th className="py-2 px-2 sm:px-4 border-b">Student Email</th>
                <th className="py-2 px-2 sm:px-4 border-b">Trainer Name</th>
              {/* <th className="py-2 px-2 sm:px-4 border-b">Status</th> 
                <th className="py-2 px-2 sm:px-4 border-b">Course</th>
                <th className="py-2 px-2 sm:px-4 border-b">Rating</th>
              <th className="py-2 px-2 sm:px-4 border-b">Actions</th>
            
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 transition">
                {/* <td className="py-2 px-2 sm:px-4 border-b">
                  <img
                    src={item.image}
                    alt="product"
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded object-cover transition-all"
                  />
                </td> 
                <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base hover:bg-gray-200">{user.name|| "-"}</td>
                <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base">{user.email|| "-"}</td>
                 <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base">{user.trainer|| "-"}</td>
                  <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base">{user.course|| "-"}</td>
                   <td className="py-2 px-2 font-bold sm:px-4 border-b text-xs sm:text-base">{user.rating|| "-"}</td>
                {/* <td className="py-2 px-4 font-bold border-b">
                  <button
                    onClick={() => toggleStatus(user._id)}
                    className={`px-3 py-1 rounded-full text-white text-xs sm:text-sm hover:bg-red-700 transition ${user.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {user.status === "active" ? "active" : "blocked"}
                  </button>
                </td> 

                <td className="py-2 px-2 sm:px-4 border-b text-center text-xs sm:text-base">
                  <div className="flex gap-2">
                   {/*  <button
                      onClick={() => handleEdit(rowData)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>*

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 rounded-full bg-red-600 text-white text-xs sm:text-sm hover:bg-red-700 transition hover:bg-red transition"
                    >
                     {/* <i class="fa-solid fa-trash"></i> 
                     Delete
                    </button>
                  </div>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/*****************************  Pagination **************************** */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded hover:bg-red-100 text-red-600"
          >
            {/* &lt; */}
             ←
          </button>
        )}

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${currentPage === page
              ? "bg-red-600 text-white"
              : "hover:bg-red-100 text-red-600"
              }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded hover:bg-red-100 text-red-600"
          >
            {/* &gt; */}
            →
          </button>
        )}
      </div>
    </div>
  );
};


export default Customer