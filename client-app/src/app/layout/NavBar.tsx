import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'


export default function NavBar(){
    const{activityStore} = useStore();

    return (
         <Menu inverted fixed='top'>
             <Container>
                 <Menu.Item as={NavLink} to='/' exact header>
                     <img src="/Images/logo.png" alt="logo" style={{marginRight: 10}} />
                     Reactivities
                 </Menu.Item>
                 <Menu.Item as={NavLink} to='/activities' name='Activities'/>
                 <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activitiy'/>
                 </Menu.Item>
             </Container>

         </Menu>
    )
}