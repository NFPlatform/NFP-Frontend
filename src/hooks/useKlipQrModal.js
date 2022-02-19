import { Box, Modal } from '@mui/material';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { CloseRounded } from '@mui/icons-material';

const useKlipQrModal = () => {
  const [klipQrModal, setKlipQrModal] = useState(false);
  const [klipQrUrl, setKlipQrUrl] = useState('');

  const actionWithRedirectUrl = (redirectUrl) => {
    if (redirectUrl.startsWith('kakaotalk')) {
      history.push(redirectUrl);
    } else {
      setKlipQrUrl(redirectUrl);
      setKlipQrModal(true);
    }
  };

  const modalCloseAction = () => {
    clearInterval();
    setKlipQrModal(false);
  };

  const klipQrComponent = (
    <Modal
      open={klipQrModal}
      onClose={() => {
        clearInterval();
        setKlipQrModal(false);
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 220,
          height: 230,
          bgcolor: 'background.paper',
          borderRadius: 5,
          boxShadow: 3,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CloseRounded
          sx={{
            position: 'absolute',
            top: '5%',
            right: '5%',
            cursor: 'pointer',
          }}
          onClick={modalCloseAction}
        />
        <Typography
          variant={'h6'}
          component={'div'}
          fontWeight={'medium'}
          mb={2}
        >
          Klip 지갑 연동
        </Typography>
        <QRCode value={klipQrUrl} size={130} style={{ marginBottom: 10 }} />
        <Typography variant={'subtitle2'} component={'div'}>
          QR 코드를 스캔해주세요
        </Typography>
      </Box>
    </Modal>
  );

  return {
    klipQrComponent,
    setKlipQrModal,
    setKlipQrUrl,
    actionWithRedirectUrl,
    modalCloseAction,
  };
};

export default useKlipQrModal;
