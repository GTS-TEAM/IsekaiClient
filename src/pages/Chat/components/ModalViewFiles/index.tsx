import { Box, CircularProgress, ClickAwayListener, IconButton } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import ModalWrapper from 'components/Modal';
import { Header, Modal } from 'components/Modal/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';
import { HiOutlineFolderDownload } from 'react-icons/hi';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { ConversationItem, FileType } from 'share/types';
import ModalViewSingleMedial from '../ModalViewSingleMedia';
import { Body, SectionFile, SectionMedia, Tab, TabHeaderWrapper, TabWrapper } from './styles';

enum Sections {
  FILE = 'files',
  MEDIA = 'media',
}

const LIMITED = 10;

const ModalViewFiles: React.FC<{
  onClose: () => any;
  currentConversation: ConversationItem;
}> = ({ onClose, currentConversation }) => {
  const [activeTab, setActiveTab] = useState(Sections.MEDIA);
  const tabHeaderWrapperRef = useRef<HTMLDivElement | null>(null);
  const [files, setFiles] = useState<any>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [activeSingleFile, setActiveSingleFile] = useState<string>('');

  const getAllFiles = useCallback(
    async (type1: string, type2: string, offset) => {
      const { data } = await isekaiApi.getAllFiles(currentConversation?.id as string, LIMITED, offset, type1, type2);
      if (data.length >= LIMITED) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setFiles((files: any) => [...files, ...data]);
    },
    [currentConversation],
  );

  const changeTabHandler = (type1: string, type2: string, section: Sections) => () => {
    setFiles([]);
    setOffset(0);
    setActiveTab(section);
    getAllFiles(type1, type2, 0);
  };

  useEffect(() => {
    getAllFiles(FileType.IMAGE, FileType.VIDEO, 0);
  }, [getAllFiles]);

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
                  onClick={changeTabHandler(FileType.IMAGE, FileType.VIDEO, Sections.MEDIA)}
                  style={{ backgroundColor: activeTab === Sections.MEDIA ? '#dbdbdb' : undefined }}
                >
                  File phương tiện
                </Tab>
                <Tab
                  onClick={changeTabHandler(FileType.FILE, FileType.AUDIO, Sections.FILE)}
                  style={{ backgroundColor: activeTab === Sections.FILE ? '#dbdbdb' : undefined }}
                >
                  Files
                </Tab>
              </TabHeaderWrapper>
              {activeTab === Sections.MEDIA && (
                <SectionMedia
                  dataLength={files.length}
                  next={() => {
                    getAllFiles(FileType.IMAGE, FileType.VIDEO, offset + LIMITED);
                    setOffset(offset + LIMITED);
                  }}
                  hasMore={hasMore}
                  loader={<CircularProgress />}
                  height={500}
                >
                  {files.length > 0 ? (
                    files.map((file: any) => (
                      <div
                        className="file-media"
                        key={file.id}
                        onClick={() => {
                          setActiveSingleFile(file.id);
                        }}
                      >
                        {activeSingleFile === file.id && (
                          <ModalViewSingleMedial
                            file={file}
                            onClose={() => {
                              setActiveSingleFile('');
                            }}
                          />
                        )}

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
                    ))
                  ) : (
                    <p>Không có ảnh hay video nào.</p>
                  )}
                </SectionMedia>
              )}
              {activeTab === Sections.FILE && (
                <SectionFile
                  dataLength={files.length}
                  next={() => {
                    getAllFiles(FileType.FILE, FileType.AUDIO, offset + LIMITED);
                    setOffset(offset + LIMITED);
                  }}
                  hasMore={hasMore}
                  loader={<CircularProgress />}
                  height={500}
                >
                  {files.length > 0 ? (
                    files.map((file: any) => (
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
                    ))
                  ) : (
                    <p>Không có tệp nào.</p>
                  )}
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
