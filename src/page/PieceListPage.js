import Box from '@mui/material/Box';
import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import AuctionCard from '../component/AuctionCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import qs from 'qs';
import { Paid, Collections, Sort } from '@mui/icons-material';
import categoryList from '../lib/category';
import { useDispatch, useSelector } from 'react-redux';
import { getAuctionListThunk } from '../features/auction/AuctionThunks';

const PieceListPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState('|카테고리');
  const [sort, setSort] = useState('|가격');

  const auctionList = useSelector((state) => state.auction.auctionList);

  useEffect(() => {
    const queryData = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (queryData.category) {
      const queryCategory = categoryList.filter(
        (value) => value.key === queryData.category,
      );
      if (queryCategory.length !== 0) {
        setSelectedCategory(`${queryCategory[0].key}|${queryCategory[0].ko}`);
      }
    }
  }, [location]);

  useEffect(async () => {
    const categoryKey = selectedCategory.split('|')[0];
    const sortKey = sort.split('|')[0];
    await dispatch(
      getAuctionListThunk({ category: categoryKey, sort: sortKey }),
    );
  }, [selectedCategory, sort]);

  return (
    <Box sx={{ minWidth: 300, paddingX: 16, paddingY: 3 }}>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}
      >
        <div
          style={{
            color: '#000000',
            marginRight: '5px',
            fontFamily: 'Gmarket Sans',
            fontSize: '1.8rem',
          }}
        >
          학생들의 작품을
        </div>
        <div
          style={{
            color: '#724ffe',
            fontFamily: 'Gmarket Sans',
            fontSize: '1.8rem',
          }}
        >
          한눈
        </div>
        <div
          style={{
            color: '#000000',
            fontFamily: 'Gmarket Sans',
            fontSize: '1.8rem',
          }}
        >
          에 살펴보세요!
        </div>
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}
      >
        <FormControl
          sx={{
            minWidth: '115px',
            maxWidth: '115px',
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
                  <Sort sx={{ fontSize: '1rem', marginRight: '10px' }} />
                  {value.split('|')[1]}
                </>
              );
            }}
            sx={{
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              borderColor: 'none',
              '& .MuiSelect-select': {
                padding: '5px 0px 5px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
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
        <FormControl
          sx={{
            marginX: 2,
            minWidth: '92px',
            maxWidth: '92px',
            '& .MuiInputBase-root': {
              borderRadius: '20px',
            },
          }}
        >
          <Select
            defaultValue={''}
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
            }}
            inputProps={{ 'aria-label': 'Without label' }}
            IconComponent={null}
            renderValue={(value) => {
              return (
                <>
                  <Paid sx={{ fontSize: '1rem', marginRight: '10px' }} />
                  {value.split('|')[1]}
                </>
              );
            }}
            sx={{
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              borderColor: 'none',
              '& .MuiSelect-select': {
                padding: '5px 0px 5px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
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
              }}
              value={'|가격'}
            >
              없음
            </MenuItem>
            {sortList.map((value, i) => (
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
        <FormControl
          sx={{
            minWidth: '100px',
            maxWidth: '100px',
            '& .MuiInputBase-root': {
              borderRadius: '20px',
            },
          }}
        >
          <Select
            value={'_'}
            inputProps={{
              'aria-label': 'Without label',
              'aria-readonly': true,
            }}
            IconComponent={null}
            renderValue={(value) => {
              return (
                <>
                  <Collections sx={{ fontSize: '1rem', marginRight: '10px' }} />
                  콜렉션
                </>
              );
            }}
            sx={{
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              borderColor: 'none',
              '& .MuiSelect-select': {
                padding: '5px 0px 5px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
        </FormControl>
      </div>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 1, sm: 2, md: 10 }}
      >
        {auctionList.map((value, i) => (
          <Grid item xs={1} sm={1} md={2} key={i}>
            <AuctionCard
              auctionId={value.id}
              klay={value.klay}
              vote={value.piece.vote}
              sellerId={value.seller.id}
              sellerName={value.seller.name}
              imgUri={value.uri}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const sortList = [
  { key: 'klay,asc', ko: '가격 낮은 순' },
  { key: 'klay,desc', ko: '가격 높은 순' },
  { key: 'createDate,asc', ko: '최신 등록 순' },
  { key: 'vote,desc', ko: '인기 많은 순' },
];

export default PieceListPage;
