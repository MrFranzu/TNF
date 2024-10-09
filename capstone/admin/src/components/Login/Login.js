import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import tnfLogo from './tnf.png';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const hardcodedUsername = 'admin';
        const hardcodedPassword = 'admin';

        if (username === hardcodedUsername && password === hardcodedPassword) {
            onLogin();
            navigate('/'); // Navigate to main content
        } else {
            alert('Invalid username or password!');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <img src={tnfLogo} alt="TNF Logo" className="logo" />
                <h1 className="title">Welcome!</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="button">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;