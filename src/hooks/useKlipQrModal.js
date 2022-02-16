import { Box, Modal } from '@mui/material';
import QRCode from 'qrcode.react';
import { useState } from 'react';

const useKlipQrModal = () => {
  const [klipQrModal, setKlipQrModal] = useState(false);
  const [klipQrUrl, setKlipQrUrl] = useState('');

  const klipQrComponent = (
    <Modal
      open={klipQrModal}
      onClose={() => {
        setKlipQrModal(false);
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
        <QRCode value={klipQrUrl} size={350} style={{ margin: 'auto' }} />
      </Box>
    </Modal>
  );

  const actionWithRedirectUrl = (redirectUrl) => {
    if (redirectUrl.startsWith('kakaotalk')) {
      history.push(redirectUrl);
    } else {
      setKlipQrUrl(redirectUrl);
      setKlipQrModal(true);
    }
  };

  const modalCloseAction = () => {
    setKlipQrModal(false);
  };

  return {
    klipQrComponent,
    setKlipQrModal,
    setKlipQrUrl,
    actionWithRedirectUrl,
    modalCloseAction,
  };
};

export default useKlipQrModal;
