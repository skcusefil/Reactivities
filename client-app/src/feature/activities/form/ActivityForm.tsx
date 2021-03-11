import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{

    activity: Activity| undefined;
    closeForm:() => void;
    createOrEdit:(activity: Activity) => void;

}

export default function ActivityForm({closeForm, activity: selectedActivity, createOrEdit}:Props)
{

    // ใช้สเตตเม้นท์เหมือน C# ค่าตัวแปร = activity ถ้าค่า activity ไม่เป็น Null ให้ค่าเหมือนกับ Model ที่สร้างไว้
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''    
    }

    const [activity , setActivity ] = useState(initialState);

    function handleSubmit(){
        createOrEdit(activity);
        //console.log(activity);
    }

    //handle when something changed in Form.Input
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setActivity({...activity,[name]: value});
    }


    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Description'value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' onChange={handleInputChange} />
                <Button floated='right' positive type='button' content='Cancel' onClick={closeForm} onChange={handleInputChange} />
            </Form>
        </Segment>
    )
}