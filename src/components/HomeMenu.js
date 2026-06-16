import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import NuevoPost from "../screens/NuevoPost";
import Home from "../screens/Home"; 
import Profile from "../screens/Profile"; 
import Comments from "../screens/Comentario";

const Tab = createBottomTabNavigator(); 

function HomeMenu() {

    return(

        <Tab.Navigator screenOptions={{ headerShown: false}}>
            
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />, 
                }}
            /> 

            <Tab.Screen
                name="NuevoPost"
                component={NuevoPost}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="plus-square" size={24} color="black" /> 
                    ), 
                }}
            />

            <Tab.Screen 
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />, 
                }}
            /> 

             <Tab.Screen 
                name="Comentario"
                component={Comments}
                options={{
                    tabBarItemStyle: { display: "none" },
                }}
            />

        </Tab.Navigator>

    ); 
}

export default HomeMenu;