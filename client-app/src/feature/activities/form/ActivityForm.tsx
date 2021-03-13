import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';



export default observer( function ActivityForm(){

    const {activityStore} = useStore();
    const {createActivity,updateActivity,loading, loadActivity, loadingInitial} = activityStore;
    const{id} = useParams<{id:string}>();
    const history = useHistory();
    const [activity,setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''    
    })

    useEffect(()=>{
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    },[id,loadActivity])

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`)
            })
        }else{
            updateActivity(activity).then(()=>{
                history.push(`/activities/${activity.id}`)
            })
        }
    }

    //handle when something changed in Form.Input
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setActivity({...activity,[name]: value});
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity...'/>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Description'value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' onChange={handleInputChange} loading={loading} />
                <Button floated='right' positive type='button' content='Cancel' as={Link} to={'/activities'} />
            </Form>
        </Segment>
    )
})
