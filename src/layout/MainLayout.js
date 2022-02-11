import Header from '../component/Header';
import Footer from '../component/Footer';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../page/HomePage';
import RegisterArtistPage from '../page/RegisterArtistPage';
import MyPage from '../page/MyPage';

const MainLayout = ({ match }) => {
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <div
        style={{
          height: 'calc(100% - 107px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: 1 }}>
          <Switch>
            <Route
              exact
              path={`${match.path}`}
              render={() => <Redirect to="/main/home" />}
            />
            <Route exact path={`${match.path}/home`} component={HomePage} />
            <Route
              exact
              path={`${match.path}/register/artist`}
              component={RegisterArtistPage}
            />
            <Route exact path={`${match.path}/my`} component={MyPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
