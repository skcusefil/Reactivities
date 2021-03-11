import { Fragment, useEffect, useState } from 'react';
import './styles.css';
// import axios from 'axios'; dont need this anymore
import { Container, Form } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {

  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true)
  const [subMitting, setSubmitting] = useState(false);

  //here will create with connection between client and api
  useEffect(()=> {
    //create agent for connecting to api, axios here doesnt nessasery anymore
    //axios.get<Activity[]>('http://localhost:5000/api/Activities').then(response =>{
      agent.Activities.list().then(response =>{

        let activities: Activity[] = [];
        response.forEach((activity: Activity) => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        });

      setActivities(response);
      setLoading(false);
    })
  },[])

  function handleSelectedActivity(id:string){
    setSelectedActivity(activities.find(x => x.id = id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleSelectCancelledActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string)
  {
    id?handleSelectedActivity(id): handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id !== activity.id), activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id:string){
    setSubmitting(true)
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id != id)])
      setSubmitting(false);
    })
  }
  
  //Loading indicator
  if(loading) return <LoadingComponent content='Loading app' />
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity = {selectedActivity}
          selectActivity ={handleSelectedActivity}
          cancelledSelectedActivity = {handleSelectCancelledActivity}
          editMOde = {editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit = {handleCreateOrEditActivity}
          DeleteActivity = {handleDeleteActivity}
          Submitting = {subMitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
