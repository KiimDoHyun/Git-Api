import { Route, Routes } from "react-router-dom";
import DetailPage from "../Page/DetailPage";
import MainPage from "../Page/MainPage";
import TestDnDPage from "../Page/TestDnDPage";
import TestLayoutPage from "../Page/TestLayoutPage";

const Router = ({ saveTargetRef }) => {
    return (
        <Routes>
            <Route
                element={<MainPage saveTargetRef={saveTargetRef} />}
                path="/"
            />
            <Route element={<DetailPage />} path="/detail" />
            <Route element={<TestDnDPage />} path="/testdndpage" />
            <Route element={<TestLayoutPage />} path="/testLayout" />
        </Routes>
    );
};

export default Router;
