import React, { useState } from "react";
import axios from "axios";
import "./../styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        const fetchedUsers = response.data.data;
        setUsers(fetchedUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Fetch User List</h1>
      <button className="btn" onClick={fetchUsers}>
        Get User List
      </button>

      {loading && <p>Loading users...</p>}
      {error && <p>Error fetching users. Please try again later.</p>}

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0
            ? users.map((user) => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      src={user.avatar}
                      alt={`${user.first_name}'s avatar`}
                      width="50"
                    />
                  </td>
                </tr>
              ))
            : !loading &&
              !error && (
                <tr>
                  <td colSpan="4">No data found.</td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
