import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Box, CardActionArea, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

const AuctionCard = ({
  auctionId,
  title,
  klay,
  vote,
  sellerName,
  sellerId,
  imgUri,
}) => {
  return (
    <Card
      sx={{
        minWidth: 215,
        maxWidth: 215,
        maxHeight: 320,
        borderRadius: 3,
      }}
    >
      <Link to={`/main/auction/${auctionId}`}>
        <CardActionArea>
          <Box sx={{ padding: 2, paddingBottom: 0 }}>
            <CardMedia
              component="img"
              height="180"
              image={imgUri}
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
              <Avatar
                alt="ArtistImg06"
                src={`http://localhost:6040/user/${sellerId}/img`}
              />
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
                  {title}
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
