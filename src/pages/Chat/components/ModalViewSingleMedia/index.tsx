import { ClickAwayListener, Slider } from '@mui/material';
import { ModalWrapper } from 'components/Modal';
import React, { useRef, useState } from 'react';
import { BsFillVolumeDownFill, BsFillVolumeMuteFill, BsPauseFill, BsPlayCircle } from 'react-icons/bs';
import { HiOutlineFolderDownload } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
import { FileType } from 'share/types';
import { formatDuration } from 'utils/formatDuration';
import { StyledButton, StyledImg, Video } from './styles';
const ModalViewSingleMedial: React.FC<{
  file: {
    type: string;
    link: string;
    name: string;
    id: string;
  };
  onClose?: () => any;
}> = ({ file, onClose }) => {
  const [togglePlayVideo, setTogglePlayVideo] = useState<boolean>(false);
  const [durationVideo, setDurationVideo] = useState<number>(0);
  const [currentDurationVideo, setCurrentDurationVideo] = useState<number>(0);
  const [volumeVideo, setVolumeVideo] = useState<number>(0);
  const [currentVolumeVideo, setCurrentVolumeVideo] = useState<number>(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <ModalWrapper>
      <ClickAwayListener
        onClickAway={() => {
          onClose && onClose();
        }}
      >
        <div>
          <StyledButton
            onClick={(e) => {
              e.stopPropagation();
              onClose && onClose();
            }}
          >
            <IoCloseOutline />
          </StyledButton>

          <StyledButton
            sx={{
              right: '2rem',
              left: 'unset !important',
            }}
          >
            <a href={file.link} download target="_blank" rel="noreferrer">
              <HiOutlineFolderDownload />
            </a>
          </StyledButton>

          {file.type === FileType.VIDEO ? (
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
                src={file.link}
                ref={videoRef}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setDurationVideo(videoRef.current?.duration as number);
                    setVolumeVideo(videoRef.current?.volume as number);
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
          ) : (
            <StyledImg src={file.link} alt={file.name} />
          )}
        </div>
      </ClickAwayListener>
    </ModalWrapper>
  );
};

export default ModalViewSingleMedial;
