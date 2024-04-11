import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CategoryStackParamList} from "./types";
import Categories from "../screens/categories";


const Stack = createNativeStackNavigator<CategoryStackParamList>()

const CategoryStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Categories"} component={Categories}/>
        </Stack.Navigator>
    )
}

export default CategoryStackNavigator