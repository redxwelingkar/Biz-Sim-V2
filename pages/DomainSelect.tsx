import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "../components/Avatar";
import DomainPill from "../components/DomainPill";


function DomainSelect() {
    const navigate = useNavigate();

    const getStoredName = JSON.parse(localStorage.getItem("biz-name")!);
    const [name, setName] = useState(getStoredName);

    const domainlist = [
        { id: 1, domain: "Product" },
        { id: 2, domain: "Service" },
        { id: 3, domain: "Manufacturing" },
        { id: 4, domain: "Hospitality" },
        { id: 5, domain: "Product1" },
        { id: 6, domain: "Service1" },
        { id: 7, domain: "Manufacturing1" },
        { id: 8, domain: "Product2" },
        { id: 9, domain: "Service2" },
        { id: 10, domain: "Manufacturing2" },
        { id: 11, domain: "Hospitality2" }]

    const proceed = () => {
        navigate("/Biz-Sim-V2/domainselect");
    };

    return (
        <>
            <div className="full-screen center-column">
                <h1>
                    Great! Now let's try to understand your business {name} a bit better
                </h1>
                <h2>
                    Do you know the industry, sector or domain in which your business
                    fits?
                </h2>
                {domainlist.map(item => <DomainPill key={String(item.id)} name={item.domain} />)}
                <button onClick={proceed}> Proceed</button>
                <Avatar />
            </div>
        </>
    );
}

export default DomainSelect;
