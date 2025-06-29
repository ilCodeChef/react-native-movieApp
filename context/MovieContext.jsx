import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavs = await AsyncStorage.getItem("favorites")
                if (storedFavs != null) {
                    setFavorites(JSON.parse(storedFavs))
                }
            } catch (e) {
                console.error("Failed to load favorites", e)
            }
        }
        loadFavorites()
    }, [])

    useEffect(() => {
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem("favorites", JSON.stringify(favorites))
            } catch (e) {
                console.error("Failed to save favorites", e)
            }
        }
        saveFavorites()
    }, [favorites])




    const addToFavorites = (movie) => {
        if (!movie || !movie.id) return;
        setFavorites((prev) => [...prev, movie]);
    };

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id == movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
