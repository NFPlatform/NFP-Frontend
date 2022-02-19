import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  Modal,
  Stack,
  TextField,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useHistory } from 'react-router-dom';
import useKlipQrModal from '../hooks/useKlipQrModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sellingPieceThunk } from '../features/piece/PieceThunks';
import { toast } from 'react-toastify';
import { clear } from '@testing-library/user-event/dist/clear';

const OwnedCard = ({ pieceId, title, vote, sellerName, sellerId, imgUri }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { klipQrComponent, actionWithRedirectUrl, modalCloseAction } =
    useKlipQrModal();

  const [sellingKlay, setSellingKlay] = useState(0);
  const [sellingModal, setSellingModal] = useState(false);

  const sellingPiece = async () => {
    if (sellingKlay === 0) {
      toast.error('클레이를 입력해 주세요');
    }
    if (sellingKlay < 0) {
      toast.error('0 이상의 클레이를 입력해 주세요');
    } else {
      await dispatch(
        sellingPieceThunk({
          data: {
            pieceId: pieceId,
            klay: parseInt(sellingKlay),
          },
          actionWithRedirectUrl: actionWithRedirectUrl,
          modalCloseAction: modalCloseAction,
          afterResultCallback: () => {
            clearInterval();
            history.push('/main/piece');
          },
        }),
      );
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 220, maxHeight: 320, borderRadius: 3, marginX: 2 }}>
        <Button
          onClick={() => {
            setSellingModal(true);
          }}
        >
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
                  {/*<Typography sx={{ letterSpacing: -0.7 }}>{klay}</Typography>*/}
                  {/*<Typography sx={{ letterSpacing: -0.7 }}>KLAY</Typography>*/}
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
        </Button>
      </Card>
      <Modal
        open={sellingModal}
        onClose={() => {
          clearInterval();
          setSellingModal(false);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000000',
            boxShadow: 2,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <TextField
            sx={{ minWidth: '280px' }}
            inputProps={{ inputMode: 'numeric' }}
            value={sellingKlay}
            onChange={(event) => {
              setSellingKlay(event.target.value);
            }}
          />
          <Button
            sx={{
              borderRadius: '10px',
              backgroundImage:
                'linear-gradient(to right, #f0bbe8 0%, #deb1e3 25%, #d0a8de 51%, #c09eda 76%, #ad93d4 100%)',
              fontSize: '1.2rem',
              fontFamily: 'Gmarket Sans',
            }}
            variant="contained"
            onClick={sellingPiece}
          >
            작품 판매하기
          </Button>
        </Box>
      </Modal>
      {klipQrComponent}
    </>
  );
};

export default OwnedCard;
