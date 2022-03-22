import { Avatar, Slider } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { chatSelector } from 'features/chatSlice';
import { useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import React, { useMemo, useRef, useState } from 'react';
import { BsFillVolumeDownFill, BsFillVolumeMuteFill, BsPauseFill, BsPlayCircle, BsPlayFill } from 'react-icons/bs';
import { MdAttachFile, MdFileDownload } from 'react-icons/md';
import { FileType, MessageItem, MessageType } from 'share/types';
import { formatDuration } from 'utils/formatDuration';
import Features from '../Features';
import { Audio, File, Img, MessageWrapStyled, Seen, StyledMessage, Video } from './styles';

interface Props {
  message: MessageItem;
  maxWidth?: string;
  theme: string;
  type?: 'popup' | 'screen';
}

const Message: React.FC<Props> = ({ message, theme, type }) => {
  const { user: currentUser } = useAppSelector(authSelector);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [togglePlayAudio, setTogglePlayAudio] = useState<boolean>(false);
  const [durationAudio, setDurationAudio] = useState<number>(0);
  const [currentDurationAudio, setCurrentDurationAudio] = useState<number>(0);
  const [togglePlayVideo, setTogglePlayVideo] = useState<boolean>(false);
  const [durationVideo, setDurationVideo] = useState<number>(0);
  const [currentDurationVideo, setCurrentDurationVideo] = useState<number>(0);
  const [volumeVideo, setVolumeVideo] = useState<number>(0);
  const [currentVolumeVideo, setCurrentVolumeVideo] = useState<number>(0);
  const { currentConversationSeen } = useAppSelector(chatSelector);

  const left = useMemo(() => currentUser?.id === message.sender?.user.id, [currentUser?.id, message.sender?.user.id]);

  const avatar = useMemo(() => message.sender?.user.avatar, [message.sender?.user.avatar]);

  const alt = useMemo(
    () => message.sender?.nickname || message.sender?.user.username,
    [message.sender?.nickname, message.sender?.user.username],
  );

  return (
    <>
      {message.content.trim().length > 0 && (message.type === MessageType.TEXT || message.type === MessageType.SYSTEM) ? (
        <>
          {message.id === currentConversationSeen?.last_message?.id && (
            <Seen left={left}>
              {currentConversationSeen?.seen.map((item) => {
                return (
                  item.user.id !== currentUser?.id && (
                    <Avatar
                      key={item.id}
                      src={item.user.avatar}
                      alt={item.user.username}
                      sx={{
                        width: '1.2rem',
                        height: '1.2rem',
                        fontSize: '0.8rem',
                      }}
                    />
                  )
                );
              })}
            </Seen>
          )}
          <MessageWrapStyled left={left} type={message.type}>
            <Features left={left} />
            <StyledMessage type={message.type} themeStyle={theme} timeCreated={moment(message.created_at).format('HH:MM')}>
              {message.content}
            </StyledMessage>
            {message.sender && <Avatar src={avatar} alt={alt} />}
          </MessageWrapStyled>
        </>
      ) : null}

      {message.type === MessageType.GIF && (
        <>
          <Seen left={left}>
            {currentConversationSeen?.seen.map((item) => {
              return (
                <Avatar
                  key={item.id}
                  src={item.user.avatar}
                  alt={item.user.username}
                  sx={{
                    width: '1rem',
                    height: '1rem',
                    fontSize: '0.8rem',
                  }}
                />
              );
            })}
          </Seen>
          <MessageWrapStyled left={left} type={message.type}>
            <Features left={left} />
            <Img src={message.content} alt="" screenType={type} />
            {message.sender && <Avatar src={avatar} alt={alt} />}
          </MessageWrapStyled>
        </>
      )}

      {message.files &&
        message.files.length > 0 &&
        message.files.map((file) => (
          <div key={file.id}>
            <Seen left={left}>
              {currentConversationSeen?.seen.map((item) => {
                return (
                  <Avatar
                    key={item.id}
                    src={item.user.avatar}
                    alt={item.user.username}
                    sx={{
                      width: '1.2rem',
                      height: '1.2rem',
                      fontSize: '0.8rem',
                    }}
                  />
                );
              })}
            </Seen>
            <MessageWrapStyled left={left} type={file.type}>
              <Features left={left} />
              {file.type === FileType.FILE && (
                <File theme={theme} screenType={type}>
                  <MdAttachFile />
                  <span>{file.name}</span>
                  <a href={file.link} target="_blank" download rel="noreferrer">
                    <MdFileDownload />
                  </a>
                </File>
              )}
              {file.type === FileType.AUDIO && (
                <Audio themeStyle={theme} screenType={type}>
                  <div
                    className="control"
                    onClick={() => {
                      setTogglePlayAudio(!togglePlayAudio);
                    }}
                  >
                    {togglePlayAudio ? (
                      <div
                        onClick={() => {
                          audioRef.current?.pause();
                        }}
                      >
                        <BsPauseFill />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          audioRef.current?.play();
                        }}
                      >
                        <BsPlayFill />
                      </div>
                    )}
                  </div>
                  <Slider
                    size="small"
                    value={currentDurationAudio}
                    min={0}
                    max={durationAudio}
                    step={0.1}
                    onChange={(e, value) => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = value as number;
                        setCurrentDurationAudio(value as number);
                      }
                    }}
                  />
                  <audio
                    src={file.link}
                    controls
                    onLoadedMetadata={() => {
                      audioRef.current && setDurationAudio(audioRef.current?.duration);
                    }}
                    onTimeUpdate={() => {
                      setCurrentDurationAudio(audioRef.current?.currentTime as number);
                    }}
                    onEnded={() => {
                      setTogglePlayAudio(false);
                      setCurrentDurationAudio(0);
                    }}
                    ref={audioRef}
                  ></audio>
                  <span className="duration">{formatDuration(durationAudio)}</span>
                </Audio>
              )}
              {file.type === FileType.VIDEO && (
                <Video screenType={type}>
                  {!togglePlayVideo && (
                    <BsPlayCircle
                      className="play"
                      onClick={(e) => {
                        e.stopPropagation();
                        videoRef.current?.play();
                        setTogglePlayVideo(!togglePlayVideo);
                      }}
                    />
                  )}

                  <video
                    src={file.link}
                    ref={videoRef}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        setDurationVideo(videoRef.current?.duration as number);
                        setVolumeVideo(videoRef.current?.volume as number);
                        videoRef.current.volume = 0;
                      }
                    }}
                    onTimeUpdate={() => {
                      setCurrentDurationVideo(videoRef.current?.currentTime as number);
                    }}
                    onEnded={() => {
                      setTogglePlayVideo(false);
                      setCurrentDurationVideo(0);
                    }}
                  ></video>
                  {togglePlayVideo && (
                    <div className="control">
                      <BsPauseFill
                        onClick={() => {
                          videoRef.current?.pause();
                          setTogglePlayVideo(!togglePlayVideo);
                        }}
                      />
                      <Slider
                        size="small"
                        min={0}
                        max={durationVideo}
                        step={0.1}
                        value={currentDurationVideo}
                        onChange={(e, value) => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = value as number;
                            setCurrentDurationVideo(value as number);
                          }
                        }}
                      />
                      <span>{formatDuration(durationVideo)}</span>
                      <div className="volume">
                        <Slider
                          size="small"
                          orientation="vertical"
                          min={0}
                          max={volumeVideo}
                          value={currentVolumeVideo}
                          step={0.1}
                          onChange={(e, value) => {
                            if (videoRef.current) {
                              videoRef.current.volume = value as number;
                              setCurrentVolumeVideo(value as number);
                            }
                          }}
                        />
                        {currentVolumeVideo > 0 ? (
                          <BsFillVolumeDownFill className="volume-svg" />
                        ) : (
                          <BsFillVolumeMuteFill className="volume-svg" />
                        )}
                      </div>
                    </div>
                  )}
                </Video>
              )}
              {file.type === FileType.IMAGE ? <Img src={file.link} alt="" screenType={type} /> : null}
              {message.sender && <Avatar src={avatar} alt={alt} />}
            </MessageWrapStyled>
          </div>
        ))}
    </>
  );
};

export default Message;
