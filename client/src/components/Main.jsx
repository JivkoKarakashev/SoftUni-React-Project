import HomePage from "./HomePage";
import CatalogPage from "./CatalogPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import CreatePage from "./CreatePage";
import DecoratePage from "./DecoratePage";
import EditPage from "./EditPage";
import DetailsPage from "./DetailsPage";
import ProfilePage from "./ProfilePage";
import Page404 from "./Page404";

import { Routes, Route } from "react-router-dom";

import AuthGuard from "./guards/AuthGuard";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/details/:id" element={<DetailsPage />} />
                <Route element={<AuthGuard />}>
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/details/:id/decorate" element={<DecoratePage />} />
                    <Route path="/details/:id/edit" element={<EditPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
                <Route path="/404" element={<Page404 />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </main>
    );
};

export default Main;