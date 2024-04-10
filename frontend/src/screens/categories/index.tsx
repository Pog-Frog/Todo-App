import {Box, Text} from "../../utils/theme";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import useSWR from "swr";
import {fetcher} from "../../services/config";
import Loading from "../../components/shared/loading";
import {FlatList, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {CategoryNavigationType} from "../../navigation/types";


const Categories = () => {

    const {data, isLoading, error} = useSWR("/api/categories", fetcher)
    const navigation = useNavigation<CategoryNavigationType>()


    const navigateToCreateCategory = () => {
        navigation.navigate("CreateCategory", {});
    }

    if(isLoading) {
      return  <Loading />
    }

    const categories = Array.isArray(data?.data) ? data.data : [];

    return (
        <SafeAreaWrapper>
            <Box flex={1} px={"4"} py={"10"}>
                <Text variant={"textXl"} fontWeight={"700"} mb={"10"}>
                    Categories Screen
                </Text>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Box bg={"lightGray"} p={"4"} borderRadius={"rounded-5xl"}>
                            <Text variant={"textXs"} fontWeight={"600"}>{item.name}</Text>
                        </Box>
                    )}
                    ItemSeparatorComponent={() => (
                        <Box height={14} bg={"amber50"}/>
                    )}
                    showsVerticalScrollIndicator={false}
                />
                <Pressable onPress={navigateToCreateCategory}>
                    <Box p={"4"} backgroundColor={"lightGray"}>
                        <Text variant={"textSm"} fontWeight={"600"} color={"gray650"}>
                            Create new Category
                        </Text>
                    </Box>
                </Pressable>
            </Box>
        </SafeAreaWrapper>
    )
}

export default Categories