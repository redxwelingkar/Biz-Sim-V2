import { useState, useEffect } from 'react';
import '../css/Header.css'; 

function Header() {
    const [businessName, setBusinessName] = useState("");

    useEffect(() => {
        const storedBusinessName = localStorage.getItem("businessName");
        if (storedBusinessName) {
            setBusinessName(storedBusinessName);
        }
    }, []);

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">{businessName || "Name of the Business"}</h1>
            </div>
        </header>
    );
}

export default Header;
