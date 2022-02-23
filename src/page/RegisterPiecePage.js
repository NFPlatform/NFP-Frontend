import bannerPieceRegistrationIcon from '../assets/img/banner_piece_registration_icon.png';
import {
  Box,
  Button,
  Container,
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

  const [previewImg, setPreviewImg] = useState({ file: null, url: null });

  const [selectedCategory, setSelectedCategory] = useState('|카테고리');

  const { klipQrComponent, actionWithRedirectUrl, modalCloseAction } =
    useKlipQrModal();

  const setImageFromFile = ({ file, setImageUrl }) => {
    let reader = new FileReader();
    reader.onload = function () {
      setImageUrl({ result: reader.result });
    };
    reader.readAsDataURL(file);
  };

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
            fontWeight: 700,
          }}
        >
          작품 등록하기
        </div>
      </div>
      <Container maxWidth="md" sx={{ paddingY: 8 }}>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent="space-between"
          // spacing={5}
          style={{ marginBottom: '70px' }}
        >
          <div>
            <div
              style={{
                fontSize: '1.2rem',
                marginBottom: '15px',
                letterSpacing: -0.7,
                fontWeight: 500,
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
                  if (event.target.files.length) {
                    setImageFromFile({
                      file: event.target.files[0],
                      setImageUrl: ({ result }) =>
                        setPreviewImg({
                          file: event.target.files[0],
                          url: result,
                        }),
                    });
                  }
                }}
              />
              <Button
                component="div"
                sx={{
                  width: 445,
                  height: 445,
                  boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.15)',
                  borderRadius: 3,
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
                {previewImg.file ? (
                  <img
                    src={previewImg.url}
                    alt={previewImg.file.name}
                    style={{
                      objectFit: 'cover',
                      minWidth: 200,
                      maxWidth: 400,
                      minHeight: 200,
                      maxHeight: 400,
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <>
                    <AddPhotoAlternate sx={{ fontSize: 40, marginBottom: 1 }} />
                    <div>마우스로 클릭해서 이미지를 추가해주세요.</div>
                  </>
                )}
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
                    marginBottom: '15px',
                    letterSpacing: -0.7,
                    fontWeight: 500,
                  }}
                >
                  카테고리
                </div>
                <FormControl
                  sx={{
                    minWidth: '135px',
                    maxWidth: '135px',
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
                            sx={{
                              fontSize: '1rem',
                              marginRight: '10px',
                              color: '#3a3a3a',
                            }}
                          />
                          {value.split('|')[1]}
                        </>
                      );
                    }}
                    sx={{
                      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.15)',
                      borderColor: 'none',
                      '& .MuiSelect-select': {
                        padding: '7px 26px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: '#3a3a3a',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    }}
                  >
                    <MenuItem
                      sx={{
                        fontSize: '0.8rem',
                        justifyContent: 'center',
                        color: '#3a3a3a',
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
                          color: '#3a3a3a',
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
            </Stack>
            <Stack marginBottom="20px">
              <div
                style={{
                  fontSize: '1.2rem',
                  marginBottom: '15px',
                  letterSpacing: -0.7,
                  fontWeight: 500,
                }}
              >
                작품 제목
              </div>
              <TextField
                sx={{
                  minWidth: '320px',
                  maxWidth: '320px',
                  '& .MuiOutlinedInput-root': {
                    fontSize: '0.9rem',
                    borderRadius: '10px',
                    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.15)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
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
                  marginBottom: '15px',
                  letterSpacing: -0.7,
                  fontWeight: 500,
                }}
              >
                작품 설명
              </div>
              <TextField
                sx={{
                  minWidth: '320px',
                  maxWidth: '320px',
                  '& .MuiOutlinedInput-root': {
                    fontSize: '0.9rem',
                    borderRadius: '10px',
                    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.15)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
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
        </Box>
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
              minWidth: 170,
              maxWidth: 250,
            }}
            variant="contained"
            onClick={registerPiece}
          >
            작품 등록
          </Button>
        </div>
      </Container>
      {klipQrComponent}
    </div>
  );
};

export default RegisterPiecePage;
