import {NavigationContainer} from "@react-navigation/native";
import AuthStackNavigator from "./auth-stack-navigator";
import AppStackNavigator from "./app-stack-navigator";
import useUserStore from "../store/userStore";
import {useEffect} from "react";


const Navigation = () => {

    const {user, updateUser} = useUserStore()

    return (
        <NavigationContainer>
            {user ? <AppStackNavigator/> : <AuthStackNavigator/>}
        </NavigationContainer>
    )
}

export default Navigation;