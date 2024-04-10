import SafeAreaWrapper from "./safe-area-wrapper";
import {Box} from "../../utils/theme";
import {ActivityIndicator} from "react-native";


const Loading = () => {

    return (
        <SafeAreaWrapper>
            <Box flex={1} alignItems={"center"} justifyContent={"center"}>
                <ActivityIndicator size={"large"} color={"primary"}/>
            </Box>
        </SafeAreaWrapper>
    )
}

export default Loading