import { useMovieContext } from "../context/MovieContext"
import { View, Image, Text, TouchableOpacity, StyleSheet} from "react-native"

function MovieCard ({movie}) {
	const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()

	const favorite = isFavorite(movie.id)

	function onLike (e) {
		if (favorite) {
			removeFromFavorites(movie.id)
		} else {
			addToFavorites(movie)
		}
	}

	const releaseDate = movie.release_date?.split('-')
	const month = releaseDate?.[1]
	const year = releaseDate?.[0]

	return (
		<View style={styles.card}>
			<View style={styles.posterContainer}>
				<Image
					source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
					style={styles.poster}
				/>
				<TouchableOpacity 
					style={[styles.favoriteBtn, favorite && styles.activeFavorite]}
					onPress={onLike}
				>
					<Text style={styles.heart}>♥</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.info}>
				<Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
				<Text style={styles.date}>{month}/{year}</Text>
			</View>
		</View>
	)

}

const styles = StyleSheet.create({
	card: {
		borderRadius: 8,
		overflow: 'hidden',
		backgroundColor: '#1a1a1a',
		flex: 0,
		flexDirection: 'column',
		margin: 10,
		width: '48%',
	},

	posterContainer: {
		position: 'relative',
		aspectRatio: 2 / 3,
		width: '100%',
	},

	poster: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},

	favoriteBtn: {
		position: 'absolute',
		top: 16,
		right: 16,
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderRadius: 20,
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},

	activeFavorite: {
		backgroundColor: '#ff4757',
	},

	heart: {
		fontSize: 20,
		color: '#fff',
	},

	info: {
		padding: 16,
		flex: 1,
		gap: 8,
	},

	title: {
		fontSize: 16,
		color: '#fff',
		fontWeight: 'bold',
	},

	date: {
		fontSize: 14,
		color: '#999',
	},
});

export default MovieCard