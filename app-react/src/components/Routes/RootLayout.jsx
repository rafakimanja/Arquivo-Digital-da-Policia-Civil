import { Outlet } from "react-router-dom";
import SidebarMenu from "../SidebarMenu";
import Header from "../Header";
import './RootLayout.css'

const RootLayout = () => {
    return (
        <>
            <div className="main-container">
                <SidebarMenu/>
                <div className="main-content">
                    <Header/>
                    <div className="page-content">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RootLayout