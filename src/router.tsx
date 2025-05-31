import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import FavoritesPage from "./views/FavoritesPage";
import Layout from "./layouts/Layouts";

export default function AppRouter() {
    return ( 
        <BrowserRouter>
        <Routes>
            <Route element={<Layout />} >
            <Route path="/" element={<IndexPage />}/>
            <Route path="/favoritos" element={<FavoritesPage />}/>
            </Route>
        </Routes>
        </BrowserRouter>
    );
}

