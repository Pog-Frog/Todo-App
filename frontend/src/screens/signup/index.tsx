import {Box, Text} from "../../utils/theme";
import {useNavigation} from "@react-navigation/native";
import {AuthScreenNavigationType} from "../../navigation/types";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import Input from "../../components/input";
import Button from "../../components/button";
import {Pressable} from "react-native";


const SignUp = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
    }

    return (
        <SafeAreaWrapper>
            <Box flex={1} px={"5.5"} mt={"13"}>
                <Text variant={"textXl"} fontWeight={"700"}>
                    Welcome to
                </Text>
                <Text variant={"textXl"} fontWeight={"700"} mb={"13"}>
                    Sign Up screen
                </Text>
                <Box mb={"6"}>
                    <Input label={"Email"} placeholder={"Enter your email"}/>
                </Box>
                <Box mb={"6"}>
                    <Input label={"Name"} placeholder={"Enter your name"}/>
                </Box>
                <Input label={"Password"} placeholder={"Enter your password"}/>

                <Box mt={"5.5"}/>

                <Pressable onPress={navigateToSignIn}>
                    <Text color={"primary"} textAlign={"right"}>
                        Already have an account? Sign in
                    </Text>
                </Pressable>

                <Box mt={"5.5"}/>

                <Button label={"Register"} uppercase={true}/>
            </Box>
        </SafeAreaWrapper>
    )
}

export default SignUp