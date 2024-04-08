import {Box, Text} from "../../utils/theme";
import {useNavigation} from "@react-navigation/native";
import {AuthScreenNavigationType} from "../../navigation/types";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import Input from "../../components/input";
import Button from "../../components/button";
import {Pressable} from "react-native";


const SignIn = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>()
    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }

    return (
        <SafeAreaWrapper>
            <Box flex={1} px={"5.5"} mt={"13"}>
                <Text variant={"textXl"} fontWeight={"700"}>
                    Welcome to
                </Text>
                <Text variant={"textXl"} fontWeight={"700"} mb={"13"}>
                    Sign In screen
                </Text>
                <Box mb={"6"}>
                    <Input label={"Email"} placeholder={"Enter your email"}/>
                </Box>
                <Input label={"Password"} placeholder={"Enter your password"}/>

                <Box mt={"5.5"}/>

                <Pressable onPress={navigateToSignUp}>
                    <Text color={"primary"} textAlign={"right"}>
                        Don't have an account? Sign up
                    </Text>
                </Pressable>

                <Box mt={"5.5"}/>

                <Button label={"Sign in"} uppercase={true}/>
            </Box>
        </SafeAreaWrapper>
    )
}

export default SignIn