import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import HomeMenu from "./src/components/HomeMenu";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} options={{headerBackVisible: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerBackVisible: false}}/>
        <Stack.Screen name='HomeMenu' component={HomeMenu} options={{headerBackVisible: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
