import { Avatar, Slider } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { BsFillVolumeDownFill, BsFillVolumeMuteFill, BsPauseFill, BsPlayCircle, BsPlayFill } from 'react-icons/bs';
import { MdAttachFile, MdFileDownload } from 'react-icons/md';
import { MessageItem, MessageType } from 'share/types';
import { formatDuration } from 'utils/formatDuration';
import Features from '../Features';
import { Audio, File, MessageWrapStyled, StyledMessage, Video } from './styles';

interface Props {
  message: MessageItem;
  maxWidth?: string;
  type: string;
  theme: string | null;
}

const Message: React.FC<Props> = ({ message, type, theme }) => {
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
    <MessageWrapStyled left={currentUser?.id === message.sender?.user.id} type={type}>
      <Features left={currentUser?.id === message.sender?.user.id} />
      {type === MessageType.TEXT || type === MessageType.SYSTEM ? (
        <StyledMessage type={type} themeStyle={theme} timeCreated={moment(message.created_at).format('HH:MM')}>
          {message.content}
        </StyledMessage>
      ) : null}
      {type === MessageType.FILE && (
        <File style={{ backgroundColor: theme || 'var(--mainColor)' }}>
          <MdAttachFile />
          <span>{message.content}</span>
          <a href={message.content} target="_blank" download rel="noreferrer">
            <MdFileDownload />
          </a>
        </File>
      )}
      {type === MessageType.AUDIO && (
        <Audio themeStyle={theme as string}>
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
            src={message.content}
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
      {type === MessageType.VIDEO && (
        <Video>
          {!togglePlayVideo && (
            <BsPlayCircle
              className="play"
              onClick={() => {
                videoRef.current?.play();
                setTogglePlayVideo(!togglePlayVideo);
              }}
            />
          )}
          <video
            src={message.content}
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
      {type === MessageType.GIF || type === MessageType.IMAGE ? (
        <img src={message.content} alt="" className="img-file" />
      ) : null}
      {message.sender && (
        <Avatar src={message.sender.user.avatar} alt={message.sender.nickname || message.sender.user.avatar} />
      )}
    </MessageWrapStyled>
  );
};

export default Message;