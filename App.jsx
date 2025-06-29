import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './screens/Home'
import Favorite from './screens/Favorites'
import { MovieProvider } from './context/MovieContext';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <MovieProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'grey',
            tabBarStyle: { backgroundColor: '#121212' },
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
              tabBarIcon: ({color}) => (
                <Ionicons name="home" size={24} color={color} /> 
              ),
            }}
            />
          <Tab.Screen 
            name="Favorites"
            component={Favorite}
            options={{
              tabBarIcon: ({color}) => (
                <Ionicons name="heart" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MovieProvider>
  )
}
