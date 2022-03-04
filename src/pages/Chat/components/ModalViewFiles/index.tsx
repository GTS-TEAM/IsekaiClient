import { IconButton } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import ModalWrapper from 'components/NewModal';
import { Header, Modal } from 'components/NewModal/styles';
import { chatSelector } from 'features/chatSlice';
import { useAppSelector } from 'hooks/hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { Body, Tab, TabContent, TabHeaderWrapper, TabWrapper } from './styles';

const ModalViewFiles: React.FC<{
  onClose: () => any;
  isShow: boolean;
}> = ({ onClose, isShow }) => {
  const [activeTab, setActiveTab] = useState('1');
  const tabHeaderWrapperRef = useRef<HTMLDivElement | null>(null);
  const { currentConversation } = useAppSelector(chatSelector);
  const [files, setFiles] = useState<any>([]);
  const [offset, setOffset] = useState(0);

  const getAllFiles = useCallback(
    async (type: string) => {
      const { data } = await isekaiApi.getAllFiles(currentConversation?.id as string, 10, offset, type);
      console.log(data);
    },
    [currentConversation, offset],
  );
  useEffect(() => {
    const tabs = tabHeaderWrapperRef.current?.querySelectorAll('div[data-id]');
    tabs?.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const id = tab.getAttribute('data-id');
        setActiveTab(id as string);
      });
    });
  }, []);

  useEffect(() => {
    if (activeTab === '1') {
      getAllFiles('text');
    }
  }, [activeTab, getAllFiles]);

  return isShow ? (
    <ModalWrapper>
      <Modal style={{ maxWidth: '55rem' }}>
        <Header>
          <h3>File phương tiện, file</h3>
          <IconButton>
            <GrFormClose />
          </IconButton>
        </Header>
        <Body>
          <TabWrapper>
            <TabHeaderWrapper ref={tabHeaderWrapperRef}>
              <Tab data-id="1" style={{ backgroundColor: activeTab === '1' ? '#dbdbdb' : undefined }}>
                File phương tiện
              </Tab>
              <Tab data-id="2" style={{ backgroundColor: activeTab === '2' ? '#dbdbdb' : undefined }}>
                Files
              </Tab>
            </TabHeaderWrapper>
            <TabContent></TabContent>
          </TabWrapper>
        </Body>
      </Modal>
    </ModalWrapper>
  ) : null;
};

export default React.memo(ModalViewFiles);
