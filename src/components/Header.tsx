import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const { pathname } = useLocation();
    
    const isHome = useMemo(() => pathname === '/', [pathname])
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    
    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })       
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validar
        if(Object.values(searchFilters).includes('')) {
            console.log('Todos los campos son obligatorios')
            return
        }

        //Consultar las recetas
        searchRecipes(searchFilters)
    }

    return ( 
        <header className={isHome ? "bg-[url('/bg.jpg')] bg-no-repeat bg-cover bg-center" : "bg-slate-800"}> 
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink to='/' className={({isActive}) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}>Inicio</NavLink>
                        <NavLink to='/favoritos'className={({isActive}) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}>Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form 
                    className="md:1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                    onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label 
                            htmlFor="ingredient"
                            className="block text-white font-extrabold uppercase text-lg"
                            >Nombre o Ingredientes</label>

                            <input 
                            id="ingredient"
                            type="text"
                            name="ingredient"
                            className="p-3 bg-white w-full rounded-lg focus:outline-none"
                            placeholder="Nombre o Ingrediente. Ej: Vodka, Tequila, Café"
                            onChange={handleChange}
                            value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label 
                            htmlFor="category"
                            className="block text-white font-extrabold uppercase text-lg"
                            >Categoría</label>

                            <select 
                            id="category"
                            name="category"
                            className="p-3 bg-white w-full rounded-lg focus:outline-none"
                            onChange={handleChange}
                            value={searchFilters.category}
                            >
                                <option value=''>-- Seleccione --</option>
                                {categories.drinks.map( category => (
                                    <option 
                                    key={category.strCategory} 
                                    value={category.strCategory}
                                    >{category.strCategory}</option>
                                ))}
                            </select>

                            <input 
                                type="submit"
                                value='Buscar Recetas'
                                className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                            />
                        </div>
                    </form>
                )}

            </div>
        </header>
    );
}

