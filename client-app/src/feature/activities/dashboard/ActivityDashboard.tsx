import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActiivityDetails from '../details/ActiivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id:string) => void;
    cancelledSelectedActivity:() =>void;
    editMOde:Boolean;
    openForm:(id:string) => void;
    closeForm:() => void;
    createOrEdit:(activity: Activity) => void;
    DeleteActivity: (id:string) => void;
  }

export default function ActivityDashboard({ activities,
  selectActivity,
  selectedActivity,
  cancelledSelectedActivity,
  editMOde,
  openForm,
  closeForm,
  createOrEdit,
  DeleteActivity}: Props) {
    return(
       <Grid>
           <Grid.Column width='10'>
              <ActivityList 
                activities={activities} 
                selectActivity = {selectActivity}       
                DeleteActivity = {DeleteActivity}
                />
           </Grid.Column>
           <Grid.Column width='6'>
          { selectedActivity && !editMOde &&
            <ActiivityDetails
              activity={selectedActivity}
              cancelledSelectedActivity={cancelledSelectedActivity}
              editMOde={editMOde}
              openForm={openForm}
              createOrEdit ={createOrEdit}
            />}
          {editMOde &&
            <ActivityForm
              activity = {selectedActivity}
              closeForm={closeForm}
              createOrEdit ={createOrEdit}
            />}
           </Grid.Column>
       </Grid>
    )
}