import React from 'react';
import ArtistRankImg from '../assets/img/artistRankImg.png';

const ArtistRankPage = () => {
  return (
    <div>
      <img
        src={ArtistRankImg}
        alt="ArtistRankImg"
        style={{ objectFit: 'contain', minWidth: 700, maxWidth: 1280 }}
      />
    </div>
  );
};

export default ArtistRankPage;
