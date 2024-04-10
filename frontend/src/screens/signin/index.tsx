import {Box, Text} from "../../utils/theme";
import {useNavigation} from "@react-navigation/native";
import {AuthScreenNavigationType} from "../../navigation/types";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import Input from "../../components/input";
import Button from "../../components/button";
import {Pressable} from "react-native";
import {loginUser} from "../../services/api";
import { Controller, useForm } from "react-hook-form"
import useUserStore from "../../store/userStore";


const SignIn = () => {

    const {updateUser} = useUserStore()
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>()
    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }

    const {control, handleSubmit, formState: {errors}} = useForm<User>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: User) => {
        try {
            const {email, password} = data
            let response = await loginUser({email, password})
            updateUser({email: response.data.email, name: response.data.name})
        } catch (e) {
            console.error(e)
        }
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
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Email"
                                error={errors.email}
                            />
                        )}
                        name="email"
                    />
                </Box>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Password"
                            error={errors.password}
                            secureTextEntry
                        />
                    )}
                    name="password"
                />

                <Box mt={"5.5"}/>

                <Pressable onPress={navigateToSignUp}>
                    <Text color={"primary"} textAlign={"right"}>
                        Don't have an account? Sign up
                    </Text>
                </Pressable>

                <Box mt={"5.5"}/>

                <Button label={"Sign in"} uppercase={true} onPress={handleSubmit(onSubmit)} />
            </Box>
        </SafeAreaWrapper>
    )
}

export default SignIn