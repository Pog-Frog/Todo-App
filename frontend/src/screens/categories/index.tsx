import React, {useState} from 'react';
import {Animated, Button, FlatList, Modal, Pressable, View} from 'react-native';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import useSWR from 'swr';
import axiosInstance, {fetcher} from '../../services/config';
import Loading from '../../components/shared/loading';
import {Box, Text} from "../../utils/theme";
import CreateCategoryForm from "../../components/categories/create-new-category";
import EditCategory from "../../components/categories/edit-category";
import Icon from 'react-native-vector-icons/Feather';


const Categories = () => {
    const {data, isLoading, error, mutate} = useSWR("/api/categories", fetcher);
    const [modalVisible, setModalVisible] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleCreateCategory = async (name: string) => {
        try {
            let response = await axiosInstance.post("/api/categories", {name});
            mutate();
            setModalVisible(false);
        } catch (err) {
            console.error("Failed to create category:", err);
        }
    };

    const handleEditCategory = async (name: string) => {
        try {
            // @ts-ignore
            let response = await axiosInstance.put(`/api/categories/${selectedCategory.id}`, {name});
            mutate();
            setModalVisible(false);
        } catch (err) {
            console.error("Failed to edit category:", err);
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        Animated.timing(animation, {
            toValue: modalVisible ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const toggleEditMode = (category = null) => {
        setIsEditing(!!category);
        if (category) {
            setSelectedCategory(category);
            setCategoryName(category.name);
        }
        toggleModal();
    };

    const handleDeleteCategory = async (item: { id: any; }) => {
        try {
            await axiosInstance.delete(`/api/categories/${item.id}`);
            mutate();
            setModalVisible(false);
        } catch (err) {
            console.error("Failed to delete category:", err);
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
                        <Box bg={"lightGray"} p={"4"} borderRadius={"rounded-5xl"} flexDirection="row"
                             justifyContent="space-between" alignItems="center">
                            <Text variant={"textXs"} fontWeight={"600"}>{item.name}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Pressable onPress={() => toggleEditMode(item)} style={{marginRight: 10}}>
                                    <Icon name="edit" size={18} color="black"/>
                                </Pressable>
                                <Pressable onPress={() => handleDeleteCategory(item)} style={{marginRight: 10}}>
                                    <Icon name="trash-2" size={18} color="red"/>
                                </Pressable>
                            </View>
                        </Box>
                    )}
                    ItemSeparatorComponent={() => (
                        <Box height={14} bg={"amber50"}/>
                    )}
                    showsVerticalScrollIndicator={false}
                />
                <Button title="Create Category" onPress={() => toggleEditMode()}/>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={toggleModal}
                >
                    <Animated.View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        transform: [{
                            translateY: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [300, 0]
                            })
                        }]
                    }}>
                        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
                            {isEditing ? (
                                <EditCategory
                                    initialValues={{name: categoryName}}
                                    onSubmit={handleEditCategory}
                                />
                            ) : (
                                <CreateCategoryForm onSubmit={handleCreateCategory}/>
                            )}
                            <Box mt={"5"}/>
                            <Button title="Close" onPress={toggleModal}/>
                        </View>
                    </Animated.View>
                </Modal>
            </Box>
        </SafeAreaWrapper>
    );
};

export default Categories;
