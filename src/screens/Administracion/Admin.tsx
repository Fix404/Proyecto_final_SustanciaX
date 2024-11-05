import { BodyAdmin } from "../../components/AdminComponents/BodyAdmin/BodyAdmin"
import { HeaderAdmin } from "../../components/AdminComponents/HeaderAdmin/HeaderAdmin"
import { SidebarAdmin } from "../../components/AdminComponents/SidebarAdmin/SidebarAdmin"

export const Admin = () => {
    return (


        <div >
            {/* Header */}

            <HeaderAdmin />

            {/* Sidebar y Body*/}

            <div className="d-flex">
                <div
                    className="sidebar p-3"
                    style={{
                        width: "20%",
                        backgroundColor: " #e9f0ec",
                        height: "100vh",
                    }}
                >
                    <SidebarAdmin />

                </div>

                <div className="flex-grow-1">
                    <BodyAdmin />
                </div>

            </div>




        </div>

    )
}

// /*    <div className="d-flex">
//     {/* Sidebar */}
//     <div
//       className="sidebar p-3"
//       style={{
//         width: "20%",
//         backgroundColor: " #e9f0ec",
//         height: "100vh",
//       }}
//     >
//       <SidebarAdmin/>
//     </div>

//     {/* Header y Body */}
//     <div className="flex-grow-1 d-flex flex-column">
//       <HeaderAdmin />
//       <div className="flex-grow-1">
//         <BodyAdmin />
//       </div>
//     </div> */