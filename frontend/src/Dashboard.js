import React from "react";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const userSession = JSON.parse(localStorage.getItem('userSession'));
        const isGoogleLogin = userSession?.googleLogin;

        fetch("http://localhost:8088/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ googleLogin: isGoogleLogin })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                // Clear session on frontend
                localStorage.removeItem('userSession');

                // If the user logged in with Google, sign out from Google too
                if (isGoogleLogin) {
                    const auth2 = window.gapi.auth2.getAuthInstance();
                    auth2.signOut().then(() => {
                        console.log('User signed out from Google.');
                        navigate('/'); // Redirect to login page
//                        window.location.href = "/";
                    });
                } else {
                    navigate('/'); // Redirect to login page
                }
            } else {
                console.error("Logout failed.");
            }
        })
        .catch((err) => {
            console.error("An error occurred during logout.", err);
        });
    };

    return (
        <div className="dashboard">
            <div className="profile-section">
                <img src="profile-picture-url" alt="Profile" className="profile-pic" />
                <div className="hover-menu">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <h1>Welcome to the Dashboard</h1>
        </div>
    );
};

export default Dashboard;
