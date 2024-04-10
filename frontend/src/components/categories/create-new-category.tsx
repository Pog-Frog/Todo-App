import React from 'react';
import {Button, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import Input from "../input";
import {Box} from "../../utils/theme";


type CreateCategoryFormProps = {
    onSubmit: (name: string) => void;
};

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({onSubmit}) => {
    const {control, handleSubmit, reset} = useForm<{ name: string }>();

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
                defaultValue=""
            />
            <Box pt={"5"}>
                <Button title="Create Category" onPress={handleSubmit(onFormSubmit)}/>
            </Box>
        </View>
    );
};

export default CreateCategoryForm;
