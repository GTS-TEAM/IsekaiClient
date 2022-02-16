import { Avatar } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { useClickOutside } from 'hooks/useClickOutside';
import React, { FormEvent, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { User } from 'share/types';
import { ButtonSearch, ResultItem, SearchDropdown, SearchResultWrap, SearchWrap, StyledGlobalSearch } from './Styles';

const GlobalSearch = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [haveButtonSearch, setHaveButtonSearch] = useState<boolean>(false);
  const [resultSearch, setResultSearch] = useState<User[] | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [queryText, setQueryText] = useState<string>('');
  const navigate = useNavigate();
  const dropdownRef = useRef<any>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpenDropdown(false);
    setQueryText('');
    setHaveButtonSearch(false);
    setResultSearch(null);
  });

  const goToUserProfile = (id: string) => () => {
    navigate(`/profile/${id}`);
    setIsOpenDropdown(false);
  };

  const focusHandler = () => {
    setIsFocus(true);
  };

  const blurHandler = () => {
    setIsFocus(false);
    setResultSearch(null);
  };

  const getResultSearchHandler = async () => {
    const { data } = await isekaiApi.globalSearch(queryText);
    setIsOpenDropdown(true);
    setResultSearch(data);
  };

  const changeTextHandler = (e: FormEvent<HTMLInputElement>) => {
    setQueryText(e.currentTarget.value);
    if (e.currentTarget.value.trim().length > 0) {
      setHaveButtonSearch(true);
    } else {
      setHaveButtonSearch(false);
      setIsOpenDropdown(false);
    }
  };

  return (
    <StyledGlobalSearch>
      <SearchWrap isFocus={isFocus}>
        <BiSearch />
        <input
          type="text"
          placeholder="Search"
          onFocus={focusHandler}
          value={queryText}
          onBlur={blurHandler}
          onChange={changeTextHandler}
        />
        {haveButtonSearch && <ButtonSearch onClick={getResultSearchHandler}>Tìm</ButtonSearch>}
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
