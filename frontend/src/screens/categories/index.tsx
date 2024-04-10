import {Box, Text} from "../../utils/theme";
import SafeAreaWrapper from "../../components/shared/safe-area-wrapper";
import useSWR from "swr";
import axiosInstance, {fetcher} from "../../services/config";
import Loading from "../../components/shared/loading";
import {FlatList} from "react-native";
import CreateCategoryForm from "../../components/categories/create-new-category";


const Categories = () => {
    const {data, isLoading, error, mutate} = useSWR("/api/categories", fetcher);

    const handleCreateCategory = async (name: string) => {
        try {
            let response = await axiosInstance.post("/api/categories", {name});
            mutate();
        } catch (err) {
            console.error("Failed to create category:", err);
        }
    };

    if (isLoading) {
        return <Loading/>;
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
                <CreateCategoryForm onSubmit={handleCreateCategory}/>
            </Box>
        </SafeAreaWrapper>
    );
};

export default Categories;
