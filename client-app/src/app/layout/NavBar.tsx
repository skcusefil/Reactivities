import { Button, Container, Menu } from 'semantic-ui-react'

interface Props{
    openForm:(id:string) => void;
}

export default function NavBar({openForm}:Props){
    return (
         <Menu inverted fixed='top'>
             <Container>
                 <Menu.Item header>
                     <img src="/Images/logo.png" alt="logo" style={{marginRight: 10}} />
                     Reactivities
                 </Menu.Item>
                 <Menu.Item name='Activities'/>
                 <Menu.Item>
                    <Button onClick={()=>openForm('')} positive content='Create Activitiy'/>
                 </Menu.Item>
             </Container>

         </Menu>
    )
}