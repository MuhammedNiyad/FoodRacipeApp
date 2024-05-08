import {createNativeStackNavigator} from '@react-navigation/native-stack';
// npm install @react-navigation/native-stack
import {NavigationContainer} from '@react-navigation/native';
// npm install @react-navigation/native
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RacipeDetailsScreen from '../screens/RacipeDetailsScreen';


const Stack = createNativeStackNavigator();

const AppNavigation = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='RacipeDetails' component={RacipeDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;