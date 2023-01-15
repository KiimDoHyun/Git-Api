import { Route, Routes } from "react-router-dom";
import MainPage from "../Page/MainPage";
import TestDnDPage from "../Page/TestDnDPage";

const Router = () => {
    return (
        <Routes>
            <Route element={<MainPage />} path="/" />
            <Route element={<TestDnDPage />} path="/testdndpage" />
        </Routes>
    );
};

export default Router;
