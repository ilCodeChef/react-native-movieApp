import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet} from 'react-native'
import Home from '../screens/Home'
import Favorite from '../screens/Favorites'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

function AppNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: 'red',
					tabBarInactiveTintColor: 'grey',
					tabBarStyle: styles.tabBar,
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
	)
}

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: '#121212',
	}
}) 

export default AppNavigator