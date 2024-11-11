// src/components/Admin/index.js
import { useState } from "react";
import { BodyAdmin } from "../../components/AdminComponents/BodyAdmin/BodyAdmin";
import { HeaderAdmin } from "../../components/AdminComponents/HeaderAdmin/HeaderAdmin";
import { SidebarAdmin } from "../../components/AdminComponents/SidebarAdmin/SidebarAdmin";
import styles from "../Home/Home.module.css"


export const Admin = () => {

    const [activeButton, setActiveButton] = useState("CATEGORIAS");

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    return (
        <div style={{ height: '100vh' }} >
            {/* Header */}
            <HeaderAdmin />

            {/* Sidebar y Body */}
            <div className="d-flex">

                <div className={styles.sidebarAdmin}>
                    <div className="sidebar p-3" >
                        <SidebarAdmin onButtonClick={handleButtonClick} />
                    </div>
                </div>


                <div className={styles.mainContentAdmin}>
                    <div className={styles.bodyContainer}>

                        <BodyAdmin activeSection={activeButton} />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Admin;