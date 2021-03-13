import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';


export default observer (function ActiivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();

    useEffect(()=>{
        if(id) loadActivity(id);
    },[id, loadActivity])

    if(!activity || loadingInitial) return <LoadingComponent/>;
    return(
        <Card>
        
        {/* ระวังเรื่องที่อยู่รูปภาพ ใช้เครื่องหมาย `${ชื่อไฟล์}` ไม่ใช่เครื่องหมาย '' !! */}
        <Image src={`/Images/categoryImages/${activity.category}.jpg`} />
        <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group>
                <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit' />
                <Button as={Link} to={'/activities'} basic color='grey' content='Cancel' />
            </Button.Group>         
        </Card.Content>
    </Card>
    )
})


