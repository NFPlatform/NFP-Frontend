import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import LoginLayout from './layout/LoginLayout';
import OauthLayout from './layout/OauthLayout';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/main" />} />
      <Route exact path="/login" component={LoginLayout} />
      <Route exact path="/oauth" component={OauthLayout} />
      <Route exact path="/main" component={MainLayout} />
    </Switch>
  );
}

export default App;
