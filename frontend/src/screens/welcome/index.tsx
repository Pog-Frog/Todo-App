import {Box, Text} from "../../utils/theme";
import {useNavigation} from "@react-navigation/native";
import {AuthScreenNavigationType} from "../../navigation/types";
import {Button} from "react-native";


const Index = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>()

    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
    }

    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }

    return (
        <Box>
            <Text>
                Welcome screen
            </Text>
            <Button title={"Navigate to Sign In"} onPress={navigateToSignIn}/>
            <Button title={"Navigate to Sign Up"} onPress={navigateToSignUp}/>
        </Box>
    )
}

export default Index;