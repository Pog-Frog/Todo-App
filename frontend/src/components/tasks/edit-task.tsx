import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button} from 'react-native';
import Input from "../input";
import {Box} from "../../utils/theme";


type EditTaskFormProps = {
    onSubmit: (task: { title: string; description: string }) => void;
    initialValues: { title: string; description: string };
};

const EditTaskForm: React.FC<EditTaskFormProps> = ({onSubmit, initialValues}) => {
    const {control, handleSubmit, setValue} = useForm({
        defaultValues: initialValues,
    });

    React.useEffect(() => {
        if (initialValues) {
            setValue('title', initialValues.title);
            setValue('description', initialValues.description);
        }
    }, [initialValues, setValue]);

    return (
        <>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Task Title"
                        label={"title"}
                    />
                )}
                name="title"
                rules={{required: true}}
                defaultValue=""
            />
            <Box pt={"5"}/>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Task Description"
                        label={"description"}
                    />
                )}
                name="description"
                rules={{required: true}}
                defaultValue=""
            />
            <Box pt={"5"}/>
            <Button title="Edit task" onPress={handleSubmit(onSubmit)}/>
        </>
    );
};

export default EditTaskForm;
