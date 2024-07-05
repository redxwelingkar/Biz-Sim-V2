// src/Header.tsx
import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <h1 className="navbar-text">Your Name</h1>
            </nav>
        </header>
    );
}

export default Header;
