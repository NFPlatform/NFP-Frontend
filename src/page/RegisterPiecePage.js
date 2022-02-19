import bannerPieceRegistrationIcon from '../assets/img/banner_piece_registration_icon.png';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { AddPhotoAlternate, Sort } from '@mui/icons-material';

import '../styles/RegisterArtistPage.css';
import '../assets/fonts/font.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import categoryList from '../lib/category';
import { styled } from '@mui/material/styles';
import { registerPieceThunk } from '../features/piece/PieceThunks';
import useKlipQrModal from '../hooks/useKlipQrModal';

const RegisterPiecePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [pieceName, setPieceName] = useState('');
  const [pieceExplanation, setPieceExplanation] = useState('');
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('|카테고리');

  const { klipQrComponent, actionWithRedirectUrl, modalCloseAction } =
    useKlipQrModal();

  const registerPiece = async () => {
    const data = {
      title: pieceName,
      category: selectedCategory.split('|')[0],
      bio: pieceExplanation,
      subLink: 'https://naver.com',
    };

    const formData = new FormData();
    formData.append(
      'registerForm',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );
    if (document) {
      formData.append('img', document);
    }

    await dispatch(
      registerPieceThunk({
        data: formData,
        actionWithRedirectUrl: actionWithRedirectUrl,
        modalCloseAction: modalCloseAction,
        afterResultCallback: () => {
          history.push('/main/my');
        },
      }),
    );
  };
  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          width: '100%',
          minHeight: '150px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#c3c2e1',
        }}
      >
        <img
          src={bannerPieceRegistrationIcon}
          style={{ height: '120px', width: 'auto' }}
        />
        <div
          style={{
            fontFamily: 'Gmarket Sans',
            marginLeft: '15px',
            fontSize: '2.6rem',
            fontStyle: 'bold',
          }}
        >
          작품 등록하기
        </div>
      </div>
      <div
        style={{
          width: 'calc(100% - 400px)',
          padding: '100px 200px',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          style={{ marginBottom: '70px' }}
        >
          <div>
            <div
              style={{
                fontSize: '1.2rem',
                marginBottom: '20px',
              }}
            >
              작품 업로드
            </div>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple={false}
                type="file"
                onChange={(event) => {
                  event.preventDefault();
                  if (event.target.files) {
                    const file = event.target.files.item(0);
                    setDocument(file);
                    setDocumentName(file.name);
                  }
                }}
              />
              <Button
                component="div"
                sx={{
                  width: 440,
                  height: 440,
                  boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.15)',
                  borderRadius: 2,
                  '&:hover': {
                    cursor: 'pointer',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9e9e9e',
                }}
              >
                <AddPhotoAlternate sx={{ fontSize: 40, marginBottom: 1 }} />
                <div>마우스로 클릭 또는 드래그해서 이미지를 추가해주세요.</div>
              </Button>
            </label>
          </div>
          <Stack direction="column">
            <Stack
              direction="row"
              justifyContent="space-between"
              marginBottom="20px"
            >
              <div style={{ marginRight: 10 }}>
                <div
                  style={{
                    fontSize: '1.2rem',
                    marginBottom: '20px',
                  }}
                >
                  카테고리
                </div>
                <FormControl
                  sx={{
                    minWidth: '135px',
                    '& .MuiInputBase-root': {
                      borderRadius: '20px',
                    },
                  }}
                >
                  <Select
                    defaultValue={''}
                    value={selectedCategory}
                    onChange={(event) => {
                      setSelectedCategory(event.target.value);
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    IconComponent={null}
                    renderValue={(value) => {
                      return (
                        <>
                          <Sort
                            sx={{ fontSize: '1rem', marginRight: '10px' }}
                          />
                          {value.split('|')[1]}
                        </>
                      );
                    }}
                    sx={{
                      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                      borderColor: 'none',
                      '& .MuiSelect-select': {
                        padding: '7px 26px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.8rem',
                      },
                    }}
                  >
                    <MenuItem
                      sx={{
                        fontSize: '0.8rem',
                        justifyContent: 'center',
                      }}
                      value={'|카테고리'}
                    >
                      없음
                    </MenuItem>
                    {categoryList.map((value, i) => (
                      <MenuItem
                        sx={{
                          fontSize: '0.8rem',
                          justifyContent: 'center',
                        }}
                        key={i}
                        value={`${value.key}|${value.ko}`}
                      >
                        {value.ko}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ minWidth: '280px' }} />
            </Stack>
            <Stack marginBottom="20px">
              <div
                style={{
                  fontSize: '1.2rem',
                  marginBottom: '20px',
                }}
              >
                작품 제목
              </div>
              <TextField
                sx={{
                  minWidth: '280px',
                  '& .MuiOutlinedInput-root': {
                    fontSize: '0.9rem',
                    borderRadius: '10px',
                    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.10)',
                  },
                }}
                size="small"
                placeholder="작품 제목을 입력해주세요"
                value={pieceName}
                onChange={(event) => setPieceName(event.target.value)}
              />
            </Stack>
            <Stack>
              <div
                style={{
                  fontSize: '1.2rem',
                  marginBottom: '20px',
                }}
              >
                작품 설명
              </div>
              <TextField
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    fontSize: '0.9rem',
                    borderRadius: '10px',
                    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.10)',
                  },
                }}
                multiline
                minRows={12}
                size="small"
                placeholder="작품에 대한 설명을 입력해주세요"
                value={pieceExplanation}
                onChange={(event) => setPieceExplanation(event.target.value)}
              />
            </Stack>
          </Stack>
        </Stack>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '50px 0',
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
            onClick={registerPiece}
          >
            작품 등록
          </Button>
        </div>
      </div>
      {klipQrComponent}
    </div>
  );
};

export default RegisterPiecePage;
