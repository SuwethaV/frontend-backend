import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ selectedUser, fetchUsers }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dept: "",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                name: selectedUser.name,
                email: selectedUser.email,
                dept: selectedUser.dept,
            });
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedUser) {
            // Edit existing user
            try {
                const response = await axios.put(`http://localhost:3000/users/${selectedUser.user_id}`, formData);
                alert("User updated successfully");
                fetchUsers(); // Refresh the user list
            } catch (error) {
                alert("Error updating user");
            }
        } else {
            // Add new user
            try {
                const response = await axios.post("http://localhost:3000/users", formData);
                alert("User added successfully");
                fetchUsers(); // Refresh the user list
            } catch (error) {
                alert("Error submitting form");
            }
        }

        // Reset the form fields
        setFormData({ name: "", email: "", dept: "" });
    };

    return (
        <div style={formStyles.container}>
            <h2 style={formStyles.header}>{selectedUser ? "Edit User" : "User Form"}</h2>
            <form onSubmit={handleSubmit} style={formStyles.form}>
                <div style={formStyles.formGroup}>
                    <label htmlFor="name" style={formStyles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={formStyles.input}
                    />
                </div>
                <div style={formStyles.formGroup}>
                    <label htmlFor="email" style={formStyles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={formStyles.input}
                    />
                </div>
                <div style={formStyles.formGroup}>
                    <label htmlFor="dept" style={formStyles.label}>Department:</label>
                    <input
                        type="text"
                        id="dept"
                        name="dept"
                        value={formData.dept}
                        onChange={handleChange}
                        required
                        style={formStyles.input}
                    />
                </div>
                <button type="submit" style={formStyles.button}>Submit</button>
            </form>
            {message && <p style={formStyles.message}>{message}</p>}
        </div>
    );
};

const formStyles = {
    container: { width: '100%', maxWidth: '400px', margin: '20px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' },
    header: { textAlign: 'center', color: '#333' },
    form: { display: 'flex', flexDirection: 'column' },
    formGroup: { marginBottom: '15px' },
    label: { fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', color: '#555' },
    input: { width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' },
    button: { padding: '12px', backgroundColor: '#4a90e2', color: 'white', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    message: { marginTop: '20px', textAlign: 'center', color: 'green' }
};

export default Form;
