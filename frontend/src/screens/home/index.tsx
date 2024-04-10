import {Box, Text} from "../../utils/theme";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import useSWR from "swr";
import {fetcher} from "../../services/config";


const Home = () => {

    const {data, isLoading} = useSWR("/api/categories", fetcher)

    return (
        <SafeAreaWrapper>
            <Box>
                <Text>
                    Home Screen
                </Text>
            </Box>
        </SafeAreaWrapper>
    )
}

export default Home