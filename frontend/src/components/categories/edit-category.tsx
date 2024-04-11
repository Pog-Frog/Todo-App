import React from 'react';
import {Button, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import Input from "../input";
import {Box} from "../../utils/theme";

type EditCategoryFormProps = {
    onSubmit: (name: string) => void;
    initialValues: { name: string };
};

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({onSubmit, initialValues}) => {
    const {control, handleSubmit, reset} = useForm<{ name: string }>({
        defaultValues: initialValues,
    });

    const onFormSubmit = (data: { name: string }) => {
        onSubmit(data.name);
        reset({name: ""});
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
                        placeholder="Category Name"
                        label={"Category Name"}
                    />
                )}
                name="name"
            />
            <Box pt={"5"}>
                <Button title="Edit Category" onPress={handleSubmit(onFormSubmit)}/>
            </Box>
        </View>
    );
};

export default EditCategoryForm;
