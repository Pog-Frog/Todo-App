import {Box, Text} from "../utils/theme"
import {Pressable} from "react-native"

type ButtonProps = {
    label: string
    onPress: () => void
    disabled?: boolean
    uppercase?: boolean
}

const Button = ({label, onPress, disabled, uppercase}: ButtonProps) => {
    return (
        <Pressable onPress={onPress} disabled={disabled}>
            <Box
                bg={disabled ? "gray800" : "primary"}
                py="3.5"
                borderRadius="rounded-7xl"
            >
                <Text
                    variant="textXs"
                    fontWeight="700"
                    color="white"
                    textAlign="center"
                    textTransform={uppercase ? "uppercase" : "none"}
                >
                    {label}
                </Text>
            </Box>
        </Pressable>
    )
}

export default Button
