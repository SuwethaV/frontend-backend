import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Form from "./form";
function About() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/users/${userId}`);
                alert("User deleted successfully");
                fetchUsers(); // Refresh the user list
            } catch (error) {
                alert("Error deleting user");
            }
        }
    };

    return (
        <>
            <h1>About Page</h1>
            {selectedUser && <Form selectedUser={selectedUser} fetchUsers={fetchUsers} />}
            <h3>User List</h3>
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>
                        {user.name} - {user.email} - {user.department}
                        <EditIcon onClick={() => handleEdit(user)} style={{ cursor: "pointer", marginLeft: "10px" }} />
                        <DeleteIcon onClick={() => handleDelete(user.user_id)} style={{ cursor: "pointer", marginLeft: "10px" }} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default About;
