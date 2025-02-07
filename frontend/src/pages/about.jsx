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
                fetchUsers();
            } catch (error) {
                alert("Error deleting user");
            }
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>About Page</h1>
            {selectedUser && <Form selectedUser={selectedUser} fetchUsers={fetchUsers} />}
            <h3 style={styles.subHeader}>User List</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.department}</td>
                            <td>
                                <EditIcon onClick={() => handleEdit(user)} style={styles.icon} />
                                <DeleteIcon onClick={() => handleDelete(user.user_id)} style={styles.icon} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: { backgroundColor: "palegoldenrod", padding: "20px", minHeight: "100vh" },
    header: { textAlign: "center", color: "#333" },
    subHeader: { marginTop: "20px", color: "#444" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "10px", backgroundColor: "#fff" },
    icon: { cursor: "pointer", marginRight: "10px", color: "#555" },
    th: { borderBottom: "2px solid #ddd", padding: "10px", textAlign: "left", backgroundColor: "#f2f2f2" },
    td: { borderBottom: "1px solid #ddd", padding: "10px" }
};

export default About;
