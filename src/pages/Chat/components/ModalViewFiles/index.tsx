import { Box, ClickAwayListener, IconButton } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import ModalWrapper from 'components/NewModal';
import { Header, Modal } from 'components/NewModal/styles';
import { chatSelector } from 'features/chatSlice';
import { useAppSelector } from 'hooks/hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';
import { HiOutlineFolderDownload } from 'react-icons/hi';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { FileType } from 'share/types';
import { Body, SectionFile, SectionMedia, Tab, TabHeaderWrapper, TabWrapper } from './styles';

enum Sections {
  FILE = 'files',
  MEDIA = 'media',
}

const ModalViewFiles: React.FC<{
  onClose: () => any;
}> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(Sections.MEDIA);
  const tabHeaderWrapperRef = useRef<HTMLDivElement | null>(null);
  const { currentConversation } = useAppSelector(chatSelector);
  const [files, setFiles] = useState<any>([]);
  const [offset, setOffset] = useState(0);

  const getAllFiles = useCallback(
    async (type1: string, type2: string) => {
      const { data } = await isekaiApi.getAllFiles(currentConversation?.id as string, 10, offset, type1, type2);
      setFiles(data);
    },
    [currentConversation, offset],
  );

  useEffect(() => {
    if (activeTab === Sections.MEDIA) {
      getAllFiles('video', 'image');
    }
    if (activeTab === Sections.FILE) {
      getAllFiles('file', 'audio');
    }
  }, [activeTab, getAllFiles]);

  useEffect(() => {
    const tabs = tabHeaderWrapperRef.current?.querySelectorAll('div[data-id]');
    tabs?.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const id = tab.getAttribute('data-id');
        setActiveTab(id as Sections);
        setFiles([]);
      });
    });
  }, []);

  return (
    <ModalWrapper>
      <ClickAwayListener onClickAway={onClose}>
        <Modal style={{ maxWidth: '55rem' }}>
          <Header>
            <h3>File phương tiện, file</h3>
            <IconButton onClick={onClose}>
              <GrFormClose />
            </IconButton>
          </Header>
          <Body>
            <TabWrapper>
              <TabHeaderWrapper ref={tabHeaderWrapperRef}>
                <Tab
                  data-id={Sections.MEDIA}
                  style={{ backgroundColor: activeTab === Sections.MEDIA ? '#dbdbdb' : undefined }}
                >
                  File phương tiện
                </Tab>
                <Tab
                  data-id={Sections.FILE}
                  style={{ backgroundColor: activeTab === Sections.FILE ? '#dbdbdb' : undefined }}
                >
                  Files
                </Tab>
              </TabHeaderWrapper>
              {activeTab === Sections.MEDIA && (
                <SectionMedia>
                  {files.map((file: any) => (
                    <div className="file-media" key={file.id}>
                      <Box
                        sx={{
                          position: 'relative',
                          paddingTop: '100%',
                          cursor: 'pointer',

                          '& > div': {
                            position: 'absolute',
                            inset: '0',
                          },

                          '& img,& video': {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          },
                        }}
                      >
                        <div>
                          {file.type === FileType.VIDEO ? (
                            <video src={file.link} muted autoPlay />
                          ) : (
                            <img src={file.link} alt={file.name} />
                          )}
                        </div>
                      </Box>
                    </div>
                  ))}
                </SectionMedia>
              )}
              {activeTab === Sections.FILE && (
                <SectionFile>
                  {files.map((file: any) => (
                    <div className="file" key={file.id}>
                      <Box
                        sx={{
                          padding: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '1.2rem',
                          height: '100%',
                          color: 'var(--fds-gray-10)',

                          span: {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            ' WebkitLineClamp': '2',
                            lineClamp: '2',
                            ' -webkit-box-orient': 'vertical',
                            flex: '1',
                            fontSize: '1.4rem',
                          },

                          a: {
                            color: 'inherit',
                          },

                          svg: {
                            width: '2rem',
                            height: '2rem',
                          },
                        }}
                      >
                        {file.type === FileType.AUDIO ? <MdOutlineQueueMusic /> : <FiFileText />}
                        <span>{file.name}</span>
                        <a href={file.link} download target={'_blank'} rel="noreferrer">
                          <HiOutlineFolderDownload />
                        </a>
                      </Box>
                    </div>
                  ))}
                </SectionFile>
              )}
            </TabWrapper>
          </Body>
        </Modal>
      </ClickAwayListener>
    </ModalWrapper>
  );
};

export default React.memo(ModalViewFiles);
