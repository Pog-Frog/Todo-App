import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthStackParamList} from "./types";
import SignIn from "../screens/signin";
import SignUp from "../screens/signup";


const Stack = createNativeStackNavigator<AuthStackParamList>()

const authStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"SignIn"} component={SignIn}
                          options={{
                              headerShown: false
                          }}
            />
            <Stack.Screen name={"SignUp"} component={SignUp}
                          options={{
                              headerShown: false
                          }}
            />
        </Stack.Navigator>
    )
}

export default authStackNavigator