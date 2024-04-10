import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CategoryStackParamList} from "./types";
import Categories from "../screens/categories";
import Category from "../screens/category";
import CreateCategory from "../screens/create-category";


const Stack = createNativeStackNavigator<CategoryStackParamList>()

const CategoryStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Categories"} component={Categories}/>
            <Stack.Screen name={"CreateCategory"} component={CreateCategory}/>
            <Stack.Screen name={"Category"} component={Category}/>
        </Stack.Navigator>
    )
}

export default CategoryStackNavigator