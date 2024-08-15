import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, confirmPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Registration successful! Please check your email to verify your account.');
                setError('');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setError(data.detail || 'Registration failed');
                setSuccessMessage('');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>OneAccess - Register Here</h2>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className={`toggle-password ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                        onClick={() => setShowPassword(!showPassword)}
                    ></span>
                </div>
                <div className="input-group password-wrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                        className={`toggle-password ${showConfirmPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></span>
                </div>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" className="register-btn">Register</button>
                <p className="signup-link">
                   Already have an Account? <a href="/login">Sign In</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
