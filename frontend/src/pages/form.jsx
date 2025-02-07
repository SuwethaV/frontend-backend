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
            try {
                await axios.put(`http://localhost:3000/users/${selectedUser.user_id}`, formData);
                alert("User updated successfully");
                fetchUsers();
            } catch (error) {
                alert("Error updating user");
            }
        } else {
            try {
                await axios.post("http://localhost:3000/users", formData);
                alert("User added successfully");
                fetchUsers();
            } catch (error) {
                alert("Error submitting form");
            }
        }

        setFormData({ name: "", email: "", dept: "" });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>{selectedUser ? "Edit User" : "User Form"}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="dept" style={styles.label}>Department:</label>
                    <input
                        type="text"
                        id="dept"
                        name="dept"
                        value={formData.dept}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Submit</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

const styles = {
    container: { 
        width: '100%', 
        maxWidth: '400px', 
        margin: '20px auto', 
        padding: '20px', 
        backgroundColor: 'palegoldenrod', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
    },
    header: { textAlign: 'center', color: '#333' },
    form: { display: 'flex', flexDirection: 'column' },
    formGroup: { marginBottom: '15px' },
    label: { fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', color: '#555' },
    input: { 
        width: '100%', 
        padding: '10px', 
        marginTop: '5px', 
        border: '1px solid #ddd', 
        borderRadius: '4px', 
        fontSize: '14px', 
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease-in-out',
        outline: 'none'
    },
    inputFocus: {
        borderColor: '#4a90e2'
    },
    button: { 
        padding: '12px', 
        backgroundColor: '#4a90e2', 
        color: 'white', 
        fontSize: '16px', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer' 
    },
    message: { marginTop: '20px', textAlign: 'center', color: 'green' }
};

// Apply focus styles dynamically
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("focus", (e) => {
            e.target.style.borderColor = "#4a90e2";
        });
        input.addEventListener("blur", (e) => {
            e.target.style.borderColor = "#ddd";
        });
    });
});

export default Form;
