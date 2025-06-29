import { View, Text, StyleSheet, FlatList} from 'react-native'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'

export default function Favorites() {
    const {favorites} = useMovieContext()
    if (favorites && favorites.length > 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Your Favorites</Text>
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <MovieCard movie={item}/>}
                    numColumns={2}
                    contentContainerStyle= {{ paddingHorizontal: 10}}
                />
            </View>
        )
    }

    return (
        <View style={styles.containerEmpty}>
            <Text style={styles.title}>No Favorites yet</Text>
            <Text style={styles.message}>Start adding to your favorites and they will appear here</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 32,
        backgroundColor: '#121212',

    },
    containerEmpty: {
        flex: 1,
        paddingVertical: 32,
        backgroundColor: '#121212',
    },
    title: {
        color: 'red',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 32,
    },
    message: {
        textAlign: 'center',
        color: "white",
        fontSize: 25,
        marginTop: 25,
    },
})