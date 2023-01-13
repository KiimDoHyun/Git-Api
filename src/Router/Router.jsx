import { Route, Routes } from "react-router-dom";
import MainPage from "../Page/MainPage";

const Router = () => {
    return (
        <Routes>
            <Route element={<MainPage />} path="/" />
        </Routes>
    );
};

export default Router;
