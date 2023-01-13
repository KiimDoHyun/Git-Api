import { Route, Routes } from "react-router-dom";
import MainPage from "../Page/MainPage";
import TestLayoutPage from "../Page/TestLayoutPage";

const Router = () => {
    return (
        <Routes>
            <Route element={<MainPage />} path="/" />
            <Route element={<TestLayoutPage />} path="/testLayout" />
        </Routes>
    );
};

export default Router;
