import { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container, Form } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';


function App() {

  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  
  useEffect(()=> {
    axios.get<Activity[]>('http://localhost:5000/api/Activities').then(response =>{
      setActivities(response.data);
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
    activity.id?setActivities([...activities.filter(x=>x.id !== activity.id), activity])
    : setActivities([...activities,{...activity, id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x => x.id != id)])
  }

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
        />
      </Container>
    </Fragment>
  );
}

export default App;
