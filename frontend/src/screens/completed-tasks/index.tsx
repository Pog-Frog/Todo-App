import React from 'react';
import {FlatList, Pressable} from 'react-native';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import useSWR from 'swr';
import axiosInstance, {fetcher} from '../../services/config';
import Loading from '../../components/shared/loading';
import {Box, Text} from "../../utils/theme";
import Icon from 'react-native-vector-icons/Feather';


const CompletedTasks = () => {
    const {data: tasksData, mutate: mutateTasks} = useSWR('/api/tasks', fetcher);

    const handleToggleTaskCompletion = async (task: { id: any; isCompleted: any; }) => {
        try {
            await axiosInstance.put(`/api/tasks/${task.id}`, {isCompleted: !task.isCompleted});
            mutateTasks();
        } catch (err) {
            console.error('Failed to toggle task completion:', err);
        }
    };

    if (!tasksData) {
        return <Loading/>;
    }

    const completedTasks = Array.isArray(tasksData.data) ? tasksData.data.filter((task: {
        isCompleted: any;
    }) => task.isCompleted) : [];

    return (
        <SafeAreaWrapper>
            <Box flex={1} px={"4"} py={"10"}>
                <Text variant={"textXl"} fontWeight={"700"} mb={"10"}>
                    Completed Tasks
                </Text>
                <FlatList
                    data={completedTasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Box bg={"lightGray"} p={"4"} borderRadius={"rounded-5xl"} flexDirection="row"
                             justifyContent="space-between" alignItems="center">
                            <Box bg={"lightGray"} p={"4"} borderRadius={"rounded-5xl"}>
                                <Text variant={"textXs"} fontWeight={"600"}>{item.title}</Text>
                                <Text variant={"textXs"}>{item.description}</Text>
                            </Box>
                            <Pressable onPress={() => handleToggleTaskCompletion(item)} style={{marginRight: 10}}>
                                <Icon name="refresh-cw" size={20} color={"blue"}/>
                            </Pressable>
                        </Box>
                    )}
                    ItemSeparatorComponent={() => (
                        <Box height={14} bg={"amber50"}/>
                    )}
                    ListEmptyComponent={
                        <Text variant={"textXs"}>No completed tasks yet.</Text>
                    }
                />
            </Box>
        </SafeAreaWrapper>
    );
};

export default CompletedTasks;
