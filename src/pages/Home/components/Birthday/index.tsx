import { Avatar, Button } from '@mui/material';
import React from 'react';
import { StyledBirthday } from './styles';

const Birthday = () => {
  return (
    <StyledBirthday
      style={{
        backgroundImage: 'url("https://friendkit.cssninja.io/assets/img/illustrations/cards/birthday-bg.svg")',
      }}
    >
      <div className="header">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-gift"
          >
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
        </div>
      </div>
      <div className="body">
        <Avatar
          src="https://res.cloudinary.com/titus-nguyen/image/upload/v1652630263/w9uqk3elxuiopr3ioilh.png"
          alt=""
          sx={{
            width: '5.6rem',
            height: '5.6rem',
            marginBottom: '1.6rem',
          }}
        />
        <h4>Dan turns 31 today!</h4>
        <p>Send him your best wishes by leaving something on his wall.</p>
        <Button>Write Message</Button>
      </div>
    </StyledBirthday>
  );
};

export default Birthday;
