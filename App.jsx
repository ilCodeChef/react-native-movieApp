import { MovieProvider } from './context/MovieContext';
import AppNavigator from './components/AppNavigator';


export default function App() {
	return (
		<MovieProvider>
			<AppNavigator/>
		</MovieProvider>
	)
}
