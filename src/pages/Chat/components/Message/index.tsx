import { Avatar, Slider } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { BsFillVolumeDownFill, BsFillVolumeMuteFill, BsPauseFill, BsPlayCircle, BsPlayFill } from 'react-icons/bs';
import { MdAttachFile, MdFileDownload } from 'react-icons/md';
import { FileType, MessageItem, MessageType } from 'share/types';
import { formatDuration } from 'utils/formatDuration';
import Features from '../Features';
import { Audio, File, Img, MessageWrapStyled, StyledMessage, Video } from './styles';

interface Props {
  message: MessageItem;
  maxWidth?: string;
  theme: string | null;
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

  return (
    <>
      {message.content.trim().length > 0 && (message.type === MessageType.TEXT || message.type === MessageType.SYSTEM) ? (
        <MessageWrapStyled left={currentUser?.id === message.sender?.user.id} type={message.type}>
          <Features left={currentUser?.id === message.sender?.user.id} />
          <StyledMessage type={message.type} themeStyle={theme} timeCreated={moment(message.created_at).format('HH:MM')}>
            {message.content}
          </StyledMessage>
          {message.sender && (
            <Avatar src={message.sender.user.avatar} alt={message.sender.nickname || message.sender.user.avatar} />
          )}
        </MessageWrapStyled>
      ) : null}

      {message.type === MessageType.GIF && (
        <MessageWrapStyled left={currentUser?.id === message.sender?.user.id} type={message.type}>
          <Features left={currentUser?.id === message.sender?.user.id} />
          <Img src={message.content} alt="" screenType={type} />
          {message.sender && (
            <Avatar src={message.sender.user.avatar} alt={message.sender.nickname || message.sender.user.avatar} />
          )}
        </MessageWrapStyled>
      )}

      {message.files &&
        message.files.length > 0 &&
        message.files.map((file) => (
          <MessageWrapStyled key={file.id} left={currentUser?.id === message.sender?.user.id} type={file.type}>
            <Features left={currentUser?.id === message.sender?.user.id} />
            {file.type === FileType.FILE && (
              <File style={{ backgroundColor: theme || 'var(--mainColor)' }} screenType={type}>
                <MdAttachFile />
                <span>{file.name}</span>
                <a href={file.link} target="_blank" download rel="noreferrer">
                  <MdFileDownload />
                </a>
              </File>
            )}
            {file.type === FileType.AUDIO && (
              <Audio themeStyle={theme as string} screenType={type}>
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
            {message.sender && (
              <Avatar src={message.sender.user.avatar} alt={message.sender.nickname || message.sender.user.avatar} />
            )}
          </MessageWrapStyled>
        ))}
    </>
  );
};

export default Message;
