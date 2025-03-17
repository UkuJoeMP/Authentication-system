import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx"
import {Navbar} from "./component/navbar.js";
import Private from "./pages/Private.jsx";
import injectContext from "./store/appContext";

// Create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl || backendUrl === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/private" />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
