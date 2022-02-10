import Header from '../component/Header';
import Footer from '../component/Footer';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../page/HomePage';
import RegisterArtistPage from '../page/RegisterArtistPage';
import MyPage from '../page/MyPage';
import PieceListPage from '../page/PieceListPage';
import RegisterPiecePage from '../page/RegisterPiecePage';
import PieceDetailPage from '../page/PieceDetailPage';
import ArtistDetailPage from '../page/ArtistDetailPage';

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
              path={`${match.path}/piece`}
              component={PieceListPage}
            />
            <Route
              exact
              path={`${match.path}/register/artist`}
              component={RegisterArtistPage}
            />
            <Route
              exact
              path={`${match.path}/artist/:artistId`}
              component={ArtistDetailPage}
            />
            <Route
              exact
              path={`${match.path}/register/piece`}
              component={RegisterPiecePage}
            />
            <Route
              exact
              path={`${match.path}/piece/:pieceId`}
              component={PieceDetailPage}
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
