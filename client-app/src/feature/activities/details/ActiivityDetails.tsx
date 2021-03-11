import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activity: Activity
    cancelledSelectedActivity:() =>void;
    editMOde:Boolean;
    openForm:(id:string) => void;
    createOrEdit:(activity: Activity) => void;
}

export default function ActiivityDetails({ activity,
    cancelledSelectedActivity,
    editMOde,
    createOrEdit,
    openForm }: Props) {
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
                <Button onClick={()=>openForm(activity.id)} basic color='blue' content='Edit' />
                <Button basic color='grey' content='Cancel' onClick={cancelledSelectedActivity} />
            </Button.Group>         
        </Card.Content>
    </Card>
    )
}

