<<<<<<< HEAD
import { useState } from "react";
import { BodyAdmin } from "../../components/AdminComponents/BodyAdmin/BodyAdmin"
import { HeaderAdmin } from "../../components/AdminComponents/HeaderAdmin/HeaderAdmin"
import { SidebarAdmin } from "../../components/AdminComponents/SidebarAdmin/SidebarAdmin"
=======
// src/components/Admin/index.js
import React from "react";
import { BodyAdmin } from "../../components/AdminComponents/BodyAdmin/BodyAdmin";
import { HeaderAdmin } from "../../components/AdminComponents/HeaderAdmin/HeaderAdmin";
import { SidebarAdmin } from "../../components/AdminComponents/SidebarAdmin/SidebarAdmin";
>>>>>>> ramanegra

export const Admin: React.FC = () => {

    const [activeButton, setActiveButton] = useState("CATEGORIAS");

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName); 
    };

    return (
<<<<<<< HEAD
        <div >
=======
        <div>
>>>>>>> ramanegra
            {/* Header */}
            <HeaderAdmin />

            {/* Sidebar y Body */}
            <div className="d-flex">
                <div
                    className="sidebar p-3"
                    style={{
                        width: "20%",
                        backgroundColor: "#e9f0ec",
                        height: "100vh",
                    }}
                >
<<<<<<< HEAD
                    <SidebarAdmin onButtonClick={handleButtonClick} />

=======
                    <SidebarAdmin />
>>>>>>> ramanegra
                </div>

                <div className="flex-grow-1">
                <BodyAdmin activeSection={activeButton} />
                </div>
            </div>
<<<<<<< HEAD

=======
>>>>>>> ramanegra
        </div>
    );
};

export default Admin;