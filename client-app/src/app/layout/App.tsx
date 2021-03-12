import { Fragment, useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

  const {activityStore} = useStore();

  //here will create with connection between client and api
  useEffect(()=> {
      activityStore.loadActivities();
  },[activityStore])

  //Loading indicator
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
