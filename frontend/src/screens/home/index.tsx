import React, {useState} from 'react';
import {Animated, Button, FlatList, Modal, Pressable, ScrollView, View} from 'react-native';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import useSWR from 'swr';
import axiosInstance, {fetcher} from '../../services/config';
import Loading from '../../components/shared/loading';
import CreateTaskForm from '../../components/tasks/create-new-task';
import {Box, Text} from "../../utils/theme";
import Icon from 'react-native-vector-icons/Feather';
import EditTaskForm from '../../components/tasks/edit-task';


const Home = () => {
    const {data: categoriesData, isLoading: isCategoriesLoading} = useSWR('/api/categories', fetcher);
    const {data: tasksData, mutate: mutateTasks} = useSWR('/api/tasks', fetcher);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [isEditing, setIsEditing] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskId, setTaskId] = useState('');

    const handleCreateTask = async (task: { title: any; description: any; }) => {
        try {
            const response = await axiosInstance.post('/api/tasks', {
                title: task.title,
                description: task.description,
                categoryId: selectedCategory?.id
            });
            mutateTasks();
            setModalVisible(false);
            setIsEditing(false);
        } catch (err) {
            console.error('Failed to create task:', err);
        }
    };

    const handleDeleteTask = async (taskId: any) => {
        try {
            await axiosInstance.delete(`/api/tasks/${taskId}`);
            mutateTasks();
        } catch (err) {
            console.error('Failed to delete task:', err);
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

    const toggleEditModeTask = (task = null) => {
        setIsEditing(!!task);
        if (task) {
            setTaskTitle(task.title);
            setTaskDescription(task.description);
            setTaskId(task.id);
        } else {
            setTaskTitle('');
            setTaskDescription('');
            setTaskId('');
        }
        toggleModal();
    }

    const handleEditTask = async (task: { title: any; description: any; }) => {
        try {
            const response = await axiosInstance.put(`/api/tasks/${taskId}`, {
                title: task.title,
                description: task.description
            });
            mutateTasks();
            setModalVisible(false);
            setIsEditing(false);
        } catch (err) {
            console.error('Failed to edit task:', err);
        }
    }

    const handleToggleTaskCompletion = async (task: { id: string, isCompleted: boolean }) => {
        try {
            await axiosInstance.put(`/api/tasks/${task.id}`, {isCompleted: !task.isCompleted});
            mutateTasks();
        } catch (err) {
            console.error('Failed to toggle task completion:', err);
        }
    };

    if (isCategoriesLoading || !tasksData) {
        return <Loading/>;
    }

    const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
    const tasks = Array.isArray(tasksData?.data) ? tasksData.data : [];

    return (
        <SafeAreaWrapper>
            <Box flex={1} px={"4"} py={"10"}>
                <Text variant={"textXl"} fontWeight={"700"} mb={"10"}>
                    Home Screen
                </Text>
                <ScrollView>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <Pressable onPress={() => setSelectedCategory(item)}>
                                <Box bg={"lightGray"} p={"4"} borderRadius={"rounded-5xl"}>
                                    <Text variant={"textXs"} fontWeight={"600"}>{item.name}</Text>
                                </Box>
                            </Pressable>
                        )}
                        ItemSeparatorComponent={() => (
                            <Box height={14} bg={"amber50"}/>
                        )}
                    />
                    <Box mt={"11"}/>
                    {selectedCategory && (
                        <View>
                            <Text variant={"textXl"} fontWeight={"700"} mb={"10"}>
                                {selectedCategory.name} Tasks
                            </Text>
                            <FlatList
                                data={tasks.filter((task: {
                                    categoryId: any;
                                }) => task.categoryId === selectedCategory.id && !task.isCompleted)}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <Box bg={"lightGray"} p={"4"} borderRadius={"rounded-5xl"} flexDirection="row"
                                         justifyContent="space-between" alignItems="center">
                                        <Box bg={"lightGray"} p={"4"} borderRadius={"rounded-5xl"}>
                                            <Text variant={"textXs"} fontWeight={"600"}>{item.title}</Text>
                                            <Text variant={"textXs"}>{item.description}</Text>
                                        </Box>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <Pressable onPress={() => toggleEditModeTask(item)}
                                                       style={{marginRight: 10}}>
                                                <Icon name="edit" size={20}/>
                                            </Pressable>
                                            <Pressable onPress={() => handleDeleteTask(item.id)}
                                                       style={{marginRight: 10}}>
                                                <Icon name="trash-2" size={20} color={"red"}/>
                                            </Pressable>
                                            <Pressable onPress={() => handleToggleTaskCompletion(item)}
                                                       style={{marginRight: 10}}>
                                                <Icon name="check-circle" size={20}
                                                      color={item.isCompleted ? "green" : "gray"}/>
                                            </Pressable>
                                        </View>
                                    </Box>
                                )}
                                ItemSeparatorComponent={() => (
                                    <Box height={14} bg={"amber50"}/>
                                )}
                                ListEmptyComponent={
                                    <Text variant={"textXs"}>No tasks for this category yet.</Text>
                                }
                            />
                            <Box mt={"5"}/>
                            <Button title="Create Task" onPress={() => toggleEditModeTask()}/>
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
                                            <EditTaskForm
                                                initialValues={{title: taskTitle, description: taskDescription}}
                                                onSubmit={handleEditTask}
                                            />
                                        ) : (
                                            <CreateTaskForm onSubmit={handleCreateTask}/>
                                        )}
                                        <Box mt={"5"}/>
                                        <Button title="Close" onPress={toggleModal}/>
                                    </View>
                                </Animated.View>
                            </Modal>
                        </View>
                    )}
                </ScrollView>
            </Box>
        </SafeAreaWrapper>
    );
};

export default Home;
