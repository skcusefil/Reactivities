import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';


export default function ActiivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity} = activityStore;

    if(!activity) return <LoadingComponent/>;
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
                <Button basic color='blue' content='Edit' />
                <Button basic color='grey' content='Cancel' />
            </Button.Group>         
        </Card.Content>
    </Card>
    )
}

