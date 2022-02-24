import Header from '../component/Header';
import Footer from '../component/Footer';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../page/HomePage';
import RegisterArtistPage from '../page/RegisterArtistPage';
import MyPage from '../page/MyPage';
import PieceListPage from '../page/PieceListPage';
import RegisterPiecePage from '../page/RegisterPiecePage';
import AuctionDetailPage from '../page/AuctionDetailPage';
import ArtistDetailPage from '../page/ArtistDetailPage';
import { useEffect } from 'react';
import ArtistRankPage from '../page/ArtistRankPage';
import CommunityPage from '../page/CommunityPage';
import OpinionPage from '../page/OpinionPage';
import GiveOpinionPage from '../page/GiveOpinionPage';

const MainLayout = ({ match }) => {
  useEffect(() => {}, []);

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
            <Route
              exact
              path={`${match.path}/piece`}
              component={PieceListPage}
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
              path={`${match.path}/auction/:auctionId`}
              component={AuctionDetailPage}
            />
            <Route
              exact
              path={`${match.path}/community`}
              component={CommunityPage}
            />
            <Route
              exact
              path={`${match.path}/community/rank`}
              component={ArtistRankPage}
            />
            <Route
              exact
              path={`${match.path}/community/opinion`}
              component={OpinionPage}
            />
            <Route
              exact
              path={`${match.path}/community/opinion/give`}
              component={GiveOpinionPage}
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
