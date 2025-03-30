import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import { Outlet } from "react-router-dom";

const StandardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 ">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default StandardLayout;
