import { Avatar } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { useClickOutside } from 'hooks/useClickOutside';
import useDebounce from 'hooks/useDebouce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { User } from 'share/types';
import { ResultItem, SearchDropdown, SearchResultWrap, SearchWrap, StyledGlobalSearch } from './Styles';

const GlobalSearch = () => {
  const [resultSearch, setResultSearch] = useState<User[] | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [queryText, setQueryText] = useState<string>('');
  const navigate = useNavigate();
  const dropdownRef = useRef<any>(null);

  const debounceValue = useDebounce(queryText, 800);

  useClickOutside(dropdownRef, () => {
    setIsOpenDropdown(false);
  });

  const goToUserProfile = (id: string) => () => {
    navigate(`/profile/${id}`);
    setIsOpenDropdown(false);
  };

  const getResultSearchHandler = useCallback(async (debounceValue: string) => {
    if (debounceValue.trim().length === 0) {
      return;
    }
    const { data } = await isekaiApi.globalSearch(debounceValue);
    setIsOpenDropdown(true);
    setResultSearch(data);
  }, []);

  useEffect(() => {
    getResultSearchHandler(debounceValue);
  }, [getResultSearchHandler, debounceValue]);

  return (
    <StyledGlobalSearch>
      <SearchWrap>
        <BiSearch />
        <input
          type="text"
          placeholder="Search"
          value={queryText}
          onChange={(e) => {
            if (e.target.value.trim().length === 0) {
              setIsOpenDropdown(false);
              setResultSearch([]);
            }
            setQueryText(e.currentTarget.value);
          }}
          onFocus={() => {
            if (queryText.trim().length > 0) {
              setIsOpenDropdown(true);
            }
          }}
        />
      </SearchWrap>
      {isOpenDropdown && resultSearch && (
        <SearchDropdown ref={dropdownRef}>
          {resultSearch.length > 0 ? (
            <SearchResultWrap>
              {resultSearch.map((item) => (
                <ResultItem key={item.id} onClick={goToUserProfile(item.id)}>
                  <Avatar src={item.avatar} />
                  <span>{item.username}</span>
                </ResultItem>
              ))}
            </SearchResultWrap>
          ) : (
            <p className="text-error">Không tìm thấy kết quả.</p>
          )}
        </SearchDropdown>
      )}
    </StyledGlobalSearch>
  );
};

export default GlobalSearch;
