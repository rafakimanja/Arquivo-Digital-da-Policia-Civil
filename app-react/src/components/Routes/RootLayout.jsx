import { Outlet } from "react-router-dom";
import SidebarMenu from "../sidebar/SidebarMenu";
import Header from "../Header/Header";
import './RootLayout.css'

const RootLayout = ({userLog}) => {
    return (
        <>
            <div className="main-container">
                <SidebarMenu userLog={userLog} />
                <div className="main-content">
                    <Header userLog={userLog} />
                    <div className="page-content">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RootLayout