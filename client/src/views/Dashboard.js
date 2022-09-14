import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

const Dashboard = () => {
    const navigate = useNavigate();
    const [ content, setContent ] = useState("")

    const populateContent = async () => {
        const request = await fetch("http://localhost:7803/api/content", {
            headers: {
                'x-access-token': localStorage.getItem("token"),
            },
        });

        const data = await request.json();
        if(data.status === "ok") {
            setContent(data.content);
        } else {
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            const user = jwt.decode(token);
            if(!user) {
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            } else {
                populateContent();
            }
        }
    }, []);

    return (
        <div>
            Content: { content || "Nothing Here Yet..." }
        </div>
    )
}

export default Dashboard;