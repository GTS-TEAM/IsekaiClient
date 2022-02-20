import { Avatar, Box } from '@mui/material';
import React, { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Modal from '../Modal';
import { ButtonNewConversation, SidebarHeader, SidebarItem, SidebarMenu, StyledSidebar } from './styles';

const Sidebar = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const closeModalHandler = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <StyledSidebar>
        <SidebarHeader>
          <h1>Tin nhắn</h1>
          <ButtonNewConversation
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            <AiOutlineUserAdd />
          </ButtonNewConversation>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>{' '}
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>{' '}
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
          <SidebarItem>
            <Avatar />
            <Box>
              <h3>Minh Nguyen</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam
                facere, voluptatem quis
              </span>
            </Box>
          </SidebarItem>
        </SidebarMenu>
      </StyledSidebar>
      <Modal onClose={closeModalHandler} isOpen={isShowModal} />
    </>
  );
};

export default Sidebar;
