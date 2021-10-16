import './App.css';
import { Router } from '@reach/router';
import Welcome from './views/Welcome';
import Register from './views/Register';
import Login from './views/Login';
import Main from './views/Main';
import CreateProject from './views/CreateProject';
import ProjectDetail from './views/ProjectDetail';
import UpdateProject from './views/UpdateProject';

function App() {
  return (
    <div>
      <Router>
        <Welcome path='/' />
        <Register path='/register' />
        <Login path='/login' />
        <Main path = '/projects' />
        <CreateProject path = '/projects/new' />
        <ProjectDetail path = '/projects/:id' />
        <UpdateProject path = '/projects/:id/edit'/>
      </Router>
    </div>
  );
}

export default App;