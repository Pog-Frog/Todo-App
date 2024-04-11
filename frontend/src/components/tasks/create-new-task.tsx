import React from 'react';
import {Button, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import Input from "../input";
import {Box} from "../../utils/theme";


type CreateTaskFormProps = {
    onSubmit: (task: { title: string; description: string }) => void;
};

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({onSubmit}) => {
    const {control, handleSubmit, reset} = useForm<{ title: string; description: string }>();

    const onFormSubmit = (data: { title: string; description: string }) => {
        onSubmit(data);
        reset({title: "", description: ""});
    };

    return (
        <View>
            <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Task Title"
                        label={"Task Title"}
                    />
                )}
                name="title"
                defaultValue=""
            />
            <Box pt={"5"}/>
            <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Task Description"
                        label={"Task Description"}
                    />
                )}
                name="description"
                defaultValue=""
            />
            <Box pt={"5"}>
                <Button title="Create Task" onPress={handleSubmit(onFormSubmit)}/>
            </Box>
        </View>
    );
};

export default CreateTaskForm;
