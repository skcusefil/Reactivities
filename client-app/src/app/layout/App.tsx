import { Fragment } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';
import HomePage from '../../feature/home/HomePage';
import ActivityForm from '../../feature/activities/form/ActivityForm';
import ActiivityDetails from '../../feature/activities/details/ActiivityDetails';


function App() {


  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/activities' component={ActivityDashboard} />
        <Route path='/activities/:id' component={ActiivityDetails} />
        <Route path={['/createActivity','/manage/:id']} component={ActivityForm} />
      </Container>
    </Fragment>
  );
}

export default observer(App);
