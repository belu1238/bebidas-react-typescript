import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layouts";

const IndexPage = lazy(() => import("./views/IndexPage"));
const FavoritesPage = lazy(() => import("./views/FavoritesPage"));
const GenerateAI = lazy(() => import("./views/GenerateAI"));

export default function AppRouter() {
    return ( 
        <BrowserRouter>
        <Routes>
            <Route element={<Layout />} >
            <Route path="/" element={
                <Suspense fallback="Cargaando...">
                    <IndexPage />
                </Suspense>
            }/>
            <Route path="/favoritos" element={
                <Suspense fallback="Cargaando...">
                    <FavoritesPage />
                </Suspense>
            }/>
            <Route path="/generate" element={
                <Suspense fallback="Cargaando...">
                    <GenerateAI />
                </Suspense>
            }/>
            </Route>
        </Routes>
        </BrowserRouter>
    );
}

