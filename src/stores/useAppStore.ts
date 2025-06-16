import { create } from "zustand";
import { createRecipesSlice, type RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { type FavoritesSliceType, createFavoritesSlice, } from "./favoritesSlice";
import { type NotificacionSliceType, createNotificationSlice } from "./notificationSlice";
import { createAISlice, type AISlice } from "./aiSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificacionSliceType & AISlice>()(devtools((...a) => ({
    ...createRecipesSlice(...a), // la ...a es para pasar los argumentos set, get, etcs
    ...createFavoritesSlice (...a),
    ...createNotificationSlice (...a),
    ...createAISlice(...a),
}))) 