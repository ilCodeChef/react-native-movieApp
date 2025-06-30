import { View, StyleSheet, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Text  } from "react-native"
import { useState, useEffect} from 'react'
import { getPopularMovies, searchMovie } from "../services/api"
import MovieCard from "../components/MovieCard"

function Home() {
    const [searchQuery, setQuerySearch] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isSearchActive, setIsSearchActive] = useState(false)

    const loadPopularMovies = async () => {
        setLoading(true)
        try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies)
            setIsSearchActive(false)
            setError(null)
        } catch (err) {
            console.log(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPopularMovies()
    }, [])

    const handleSearch = async () => {
        const noSearch = !searchQuery.trim() || loading
        if (noSearch) return
        setLoading(true)

        try {
            const searchResult = await searchMovie(searchQuery)
            setMovies(searchResult)
            setIsSearchActive(true)
            setError(null)
        } catch (err) {
            console.log(error)
            setError("Failed to search the movie")
        } finally {
            setLoading(false)
        }
        setQuerySearch("")
    }

    const handleBack = () => {
        loadPopularMovies()
        setQuerySearch("")
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchForm}>
                {isSearchActive && (
                <TouchableOpacity onPress={handleBack} style={[styles.buttonStyle, styles.backButton]}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                )}
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search for movies"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setQuerySearch}
                />
                <TouchableOpacity onPress={handleSearch} style={[styles.buttonStyle, styles.searchButton]}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            { loading ? (
                <ActivityIndicator size="large" style={styles.loading}/> 
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
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#333',
  },
  searchButton: {
    marginLeft: 8,
  },
  backButton: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'red',
  },
  loading: {
    marginTop: 20, 
  }
});

export default Home