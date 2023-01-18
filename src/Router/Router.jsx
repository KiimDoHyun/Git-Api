import { Route, Routes } from "react-router-dom";
import DetailPage from "../Page/DetailPage";
import MainPage from "../Page/MainPage";

const Router = ({ saveTargetRef }) => {
    return (
        <Routes>
            <Route
                element={<MainPage saveTargetRef={saveTargetRef} />}
                path="/"
            />
            <Route element={<DetailPage />} path="/detail" />
        </Routes>
    );
};

export default Router;
