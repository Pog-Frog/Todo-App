import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RootBottomTapParamList} from "./types";
import HomeStackNavigator from "./home-stack-navigator";
import CompletedTasks from "../screens/completed-tasks";
import TodayTasks from "../screens/today-tasks";
import Categories from "../screens/categories";
import Icons from "../components/shared/icons";
import {useTheme} from "@shopify/restyle";


const Tab = createBottomTabNavigator<RootBottomTapParamList>()

const BottomTabNavigator = () => {

    const theme = useTheme()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveTintColor: theme.colors.gray550,
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen name={"HomeStack"} component={HomeStackNavigator}
                        options={{
                            title: "Home",
                            tabBarIcon: ({color}) => (
                                <Icons name={"home"} color={color}/>
                            ),
                            headerShown: false
                        }}
            />
            <Tab.Screen name={"Today"} component={TodayTasks}
                        options={{
                            title: "Today",
                            tabBarIcon: ({color}) => (
                                <Icons name={"calendar"} color={color}/>
                            ),
                            headerShown: false
                        }}
            />
            <Tab.Screen name={"Completed"} component={CompletedTasks}
                        options={{
                            title: "Completed",
                            tabBarIcon: ({color}) => (
                                <Icons name={"completed"} color={color}/>
                            ),
                            headerShown: false
                        }}
            />
            <Tab.Screen name={"Categories"} component={Categories}
                        options={{
                            title: "Categories",
                            tabBarIcon: ({color}) => (
                                <Icons name={"categories"} color={color}/>
                            ),
                            headerShown: false
                        }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator