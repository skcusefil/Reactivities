import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import MyTextArea from "../activities/form/MyTextArea";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer( function ProfileEditForm({ setEditMode }: Props) {

    const { profileStore: { profile, updateProfile } } = useStore();

    return (
        <Formik
            initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
            onSubmit={values => { updateProfile(values).then(() => setEditMode(false)) }}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextArea rows={3} placeholder='Bio' name='bio' />
                    <Button
                        floated='right'
                        positive 
                        type='submit'
                        content='Update profile'
                        loading={isSubmitting}
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
    
        </Formik>
    )
})

const validationSchema = Yup.object({
    displayName: Yup.string().required('Display name is required'),
})