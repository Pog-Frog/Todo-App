import {Box, Text} from "../../utils/theme";
import {useNavigation} from "@react-navigation/native";
import {AuthScreenNavigationType} from "../../navigation/types";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import Input from "../../components/input";
import Button from "../../components/button";
import {Pressable} from "react-native";
import {registerUser} from "../../services/api";
import { Controller, useForm } from "react-hook-form"


const SignUp = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
    }

    const {control, handleSubmit, formState: {errors}} = useForm<User>({
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    })

    const onSubmit = async (data: User) => {
        try {
            const {email, name, password} = data
            await registerUser({email, name, password})
            navigateToSignIn()
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
                    Sign Up screen
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
                <Box mb={"6"}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Name"
                                error={errors.name}
                            />
                        )}
                        name="name"
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

                <Pressable onPress={navigateToSignIn}>
                    <Text color={"primary"} textAlign={"right"}>
                        Already have an account? Sign in
                    </Text>
                </Pressable>

                <Box mt={"5.5"}/>

                <Button label={"Register"} uppercase={true} onPress={handleSubmit(onSubmit)}/>
            </Box>
        </SafeAreaWrapper>
    )
}

export default SignUp