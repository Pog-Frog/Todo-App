import {CompositeNavigationProp, NavigatorScreenParams} from "@react-navigation/native"
import {NativeStackNavigationProp,} from "@react-navigation/native-stack"


export type AuthStackParamList = {
    SignIn: undefined,
    SignUp: undefined
}

export type RootBottomTapParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>,
    Completed: undefined,
    Categories: NavigatorScreenParams<CategoryStackParamList>
}

export type HomeStackParamList = {
    Home: undefined,
}

export type CategoryStackParamList = {
    Categories: undefined,
}

export type AppStackParamList = {
    Root: NavigatorScreenParams<RootBottomTapParamList>,
    Settings: undefined
}

export type RootStackParamList = {
    AppStack: NavigatorScreenParams<AppStackParamList>,
    AuthStack: NavigatorScreenParams<AuthStackParamList>
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export type AuthScreenNavigationType<RouteName extends keyof AuthStackParamList> =
    CompositeNavigationProp<
        NativeStackNavigationProp<AuthStackParamList, RouteName>,
        NativeStackNavigationProp<AppStackParamList, "Root">
    >

export type CategoryNavigationType = NativeStackNavigationProp<CategoryStackParamList>