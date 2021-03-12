import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActiivityDetails from '../details/ActiivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer( function ActivityDashboard() {
    const {activityStore} = useStore();

    const{selectedActivity, editMode} = activityStore;

    //here will create with connection between client and api
    useEffect(()=> {
        activityStore.loadActivities();
    },[activityStore])
  
    //Loading indicator
    if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return(
       <Grid>
           <Grid.Column width='10'>
              <ActivityList />
           </Grid.Column>
           <Grid.Column width='6'>
          { selectedActivity && !editMode &&
            <ActiivityDetails />}
          {editMode &&
            <ActivityForm
            />}
           </Grid.Column>
       </Grid>
    )
})