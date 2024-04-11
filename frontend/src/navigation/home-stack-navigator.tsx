import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/home";
import {HomeStackParamList} from "./types";


const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={Home}
                          options={{
                              headerShown: false
                          }}
            />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator