import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActiivityDetails from '../details/ActiivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer( function ActivityDashboard() {
    const {activityStore} = useStore();

    const{selectedActivity, editMode} = activityStore;

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