import bannerArtistRegistrationIcon from '../assets/img/banner_artist_registration_icon.png';
import { Button, Container, drawerClasses, TextField } from '@mui/material';
import { useState } from 'react';
import { DriveFolderUpload } from '@mui/icons-material';

import '../styles/RegisterArtistPage.css';
import '../assets/fonts/font.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerArtistThunk } from '../features/artist/ArtistThunks';

const RegisterArtistPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [artistName, setArtistName] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [bio, setBio] = useState('');
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState(null);

  const registerArtist = async () => {
    const data = {
      name: artistName,
      instagramId: instagramId,
      bio: bio,
    };

    const formData = new FormData();
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );
    if (document) {
      formData.append('file', document);
    }

    await dispatch(
      registerArtistThunk({
        data: formData,
        afterCallback: () => {
          history.push('/main');
        },
      }),
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          width: '100%',
          minHeight: '150px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(183,217,255)',
        }}
      >
        <img
          src={bannerArtistRegistrationIcon}
          style={{ height: '120px', width: 'auto' }}
        />
        <div
          style={{
            fontFamily: 'Gmarket Sans',
            marginLeft: '15px',
            fontSize: '2.6rem',
            fontWeight: 'bold',
          }}
        >
          작가 등록하기
        </div>
      </div>
      <Container
        maxWidth="md"
        style={{
          padding: '50px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '35px',
          }}
        >
          <div style={{ marginRight: 50 }}>
            <div
              style={{
                fontSize: '1.2rem',
                marginBottom: '13px',
              }}
            >
              아티스트 명
            </div>
            <TextField
              sx={{
                minWidth: '280px',
                maxWidth: '310px',
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.9rem',
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.20)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              size="small"
              placeholder="아티스트 명을 입력해주세요"
              value={artistName}
              onChange={(event) => setArtistName(event.target.value)}
            />
          </div>
          <div>
            <div
              style={{
                fontSize: '1.2rem',
                marginBottom: '13px',
              }}
            >
              인스타그램 아이디
            </div>
            <TextField
              sx={{
                minWidth: '280px',
                maxWidth: '310px',
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.9rem',
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.20)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              size="small"
              placeholder="인스타 아이디를 입력해주세요"
              value={instagramId}
              onChange={(event) => setInstagramId(event.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            marginBottom: '35px',
          }}
        >
          <div
            style={{
              fontSize: '1.2rem',
              marginBottom: '13px',
            }}
          >
            자기소개
          </div>
          <TextField
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                fontSize: '0.9rem',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.20)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
            multiline
            minRows={12}
            size="small"
            placeholder="프로필에 올라갈 자기 소개를 작성해주세요 (ex 비전, 이력 등)"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </div>
        <div style={{}}>
          <div
            style={{
              fontSize: '1.2rem',
              marginBottom: '13px',
            }}
          >
            재학증명서
          </div>
          <div style={{ display: 'flex' }}>
            <label htmlFor="ex_file">
              <div className="file-button">
                <div>
                  {documentName ? documentName : '재학증명서를 등록해주세요'}
                </div>
                <DriveFolderUpload
                  sx={{
                    '&.MuiSvgIcon-root': {
                      color: 'rgba(0,0,0,0.50)',
                    },
                  }}
                />
              </div>
            </label>
            <input
              style={{
                width: 0,
                height: 0,
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0,0,0,0)',
                border: '',
              }}
              id="ex_file"
              type="file"
              multiple={false}
              accept="image/jpg, image/png, image/jpeg"
              onChange={(event) => {
                event.preventDefault();
                if (event.target.files) {
                  const file = event.target.files.item(0);
                  setDocument(file);
                  setDocumentName(file.name);
                }
              }}
            />
            <div style={{ flex: 1 }} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '80px 0 0',
          }}
        >
          <Button
            sx={{
              borderRadius: '10px',
              backgroundImage:
                'linear-gradient(to right, #f0bbe8 0%, #deb1e3 25%, #d0a8de 51%, #c09eda 76%, #ad93d4 100%)',
              fontSize: '1.2rem',
              fontFamily: 'Gmarket Sans',
            }}
            variant="contained"
            onClick={registerArtist}
          >
            작가등록 신청
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default RegisterArtistPage;
