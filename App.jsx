import { MovieProvider } from './context/MovieContext';
import BottomNavigator from './components/BottomNavigator';


export default function App() {
  return (
    <MovieProvider>
      <BottomNavigator/>
    </MovieProvider>
  )
}
