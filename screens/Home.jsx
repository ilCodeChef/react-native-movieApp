import { View, Button, StyleSheet, TextInput, FlatList, ActivityIndicator  } from "react-native"
import React , { useState, useEffect} from 'react'
import { getPopularMovies, searchMovie } from "../services/api"
import MovieCard from "../components/MovieCard"
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home() {
    const [searchQuery, setQuerySearch] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError(err)
            } finally {
                setLoading(false)
            }
        } 

        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)

        try {
            const searchResult = await searchMovie(searchQuery)
            setMovies(searchResult)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search the movie")
        } finally {
            setLoading(false)
        }
        setQuerySearch("")
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search for movies"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setQuerySearch}
                />
                <Button title="Search" onPress={handleSearch}/>
            </View>

            { loading ? (
                <ActivityIndicator size="large" style={{marginTop:20}}/> 
            ) : (
                <FlatList 
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    numColumns={2}
                    contentContainerStyle= {{ paddingHorizontal: 10}}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    backgroundColor: '#121212',
  },
  searchForm: {
    maxWidth: 600,
    alignSelf: 'center',
    marginBottom: 32,
    flexDirection: 'row',
    paddingHorizontal: 16,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 8,
    justifyContent: 'center',
  },
});

export default Home