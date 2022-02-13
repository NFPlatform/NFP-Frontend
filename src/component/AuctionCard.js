import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PieceCardImg01 from '../assets/img/pieceCardImg01.jpg';
import ArtistImg06 from '../assets/img/artistImg06.png';
import { Avatar, Box, CardActionArea, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

const AuctionCard = ({
  auctionId,
  auctionTokenId,
  klay,
  vote,
  sellerName,
  sellerId,
}) => {
  return (
    <Card sx={{ maxWidth: 220, maxHeight: 320, borderRadius: 3, marginX: 2 }}>
      <Link to={{ pathname: 'https://naver.com' }} target="_blank">
        <CardActionArea>
          <Box sx={{ padding: 2, paddingBottom: 0 }}>
            <CardMedia
              component="img"
              height="180"
              image={PieceCardImg01}
              alt="PieceCardImg01"
              sx={{ borderRadius: 3 }}
            />
          </Box>
          <CardContent style={{ padding: 16 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              marginBottom="15px"
            >
              <Avatar alt="ArtistImg06" src={ArtistImg06} />
              <Box>
                <Typography
                  sx={{ lineHeight: '105%', letterSpacing: -0.1 }}
                  variant="caption"
                  component="div"
                >
                  {sellerName}
                </Typography>
                <Typography
                  sx={{ lineHeight: '105%', letterSpacing: -0.1 }}
                  variant="caption"
                  component="div"
                  color="#616161"
                >
                  Always Awake
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              color="#3871c5"
            >
              <Stack direction="row" spacing={2}>
                <Typography sx={{ letterSpacing: -0.7 }}>{klay}</Typography>
                <Typography sx={{ letterSpacing: -0.7 }}>KLAY</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <FavoriteIcon sx={{ color: '#f35154', fontSize: 16 }} />
                <Typography
                  variant="caption"
                  sx={{ letterSpacing: -0.1 }}
                  color="#606060"
                >
                  {vote}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default AuctionCard;
