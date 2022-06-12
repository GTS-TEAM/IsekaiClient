import styled from '@emotion/styled';
import { Avatar, ClickAwayListener } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { setCurrentSong } from 'features/musicSlice';
import { useAppDispatch } from 'hooks/hooks';
import useDebounce from 'hooks/useDebouce';
import React, { useEffect, useState } from 'react';
import { MusicItem } from 'share/types';

const Search = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [resultSearch, setResultSearch] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debounceValue = useDebounce(searchText, 800);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debounceValue.trim().length > 0) {
      setLoading(true);
      isekaiApi
        .getListMusic(undefined, undefined, debounceValue)
        .then(({ data }) => {
          setResultSearch(data);
          setLoading(false);
          setShowDropdown(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setResultSearch([]);
    }
  }, [debounceValue]);

  return (
    <SearchWrap>
      <ClickAwayListener
        onClickAway={() => {
          setShowDropdown(false);
        }}
      >
        <div>
          <div className="search-input">
            <input
              type="text"
              placeholder="Tìm kiếm bài hát"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onFocus={() => {
                setShowDropdown(true);
              }}
              value={searchText}
            />
          </div>
          {showDropdown && (
            <Menu>
              {resultSearch.length > 0 && (
                <div className="menu-inner">
                  {resultSearch.map((item) => {
                    return (
                      <Item
                        key={item.id}
                        onClick={() => {
                          dispatch(setCurrentSong(item));
                          setShowDropdown(false);
                          setSearchText('');
                          setResultSearch([]);
                        }}
                      >
                        <Avatar src={item.uploader.avatar} alt={item.uploader.username} />
                        <div className="info">
                          <h3>{item.name}</h3>
                          <span>{item.author}</span>
                        </div>
                      </Item>
                    );
                  })}
                </div>
              )}
              {resultSearch.length === 0 && debounceValue.length > 0 && (
                <Item>
                  <p className="text">{loading ? 'Loading...' : '  Không có kết quả'}</p>
                </Item>
              )}
            </Menu>
          )}
        </div>
      </ClickAwayListener>
    </SearchWrap>
  );
};

const SearchWrap = styled.div`
  color: var(--fds-black);
  position: relative;
  .search-input input {
    height: 3.75rem;
    padding: 0 1.6rem;
    min-width: 32rem;
    font-size: 1.4rem;
    border-radius: 4px;
    background-color: var(--fds-white);
  }
`;

const Menu = styled.ul`
  position: absolute;
  width: 100%;
  background-color: var(--fds-white);
  border-radius: 4px;
  margin-top: 0.8rem;
  z-index: 50;

  .menu-inner {
    padding: 0.8rem 0;
    max-height: 22.4rem;
    overflow-y: auto;
  }
`;

const Item = styled.li`
  padding: 0.8rem 1.6rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .MuiAvatar-root {
    border-radius: 4px;
    margin-right: 1.6rem;
  }

  .info {
    h3 {
      margin-bottom: 0.4rem;
    }
  }

  .text {
    font-size: 1.4rem;
    text-align: center;
    display: block;
  }
`;

export default Search;
