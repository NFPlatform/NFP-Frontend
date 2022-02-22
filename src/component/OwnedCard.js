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
import { CloseRounded } from '@mui/icons-material';

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
          sx={{ width: '100%' }}
        >
          <CardActionArea sx={{ width: '100%' }}>
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
                  src={`https://api.nfplatform.com/user/${sellerId}/img`}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
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
            width: 250,
            height: 110,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 3,
            paddingTop: 6,
            paddingBottom: 3,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography fontWeight={600} sx={{ position: 'absolute', top: '6%' }}>
            작품 판매
          </Typography>
          <CloseRounded
            sx={{
              position: 'absolute',
              top: '6%',
              right: '5%',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSellingModal(false);
            }}
          />
          <Box
            component={'div'}
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
          >
            <TextField
              id="outlined-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              value={sellingKlay}
              onChange={(event) => {
                setSellingKlay(event.target.value);
              }}
            />
            <Typography variant={'body2'} fontWeight={500}>
              KLAY
            </Typography>
          </Box>

          <Button
            variant={'contained'}
            color={'secondary'}
            style={{
              borderRadius: '20px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
            }}
            fullWidth
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
