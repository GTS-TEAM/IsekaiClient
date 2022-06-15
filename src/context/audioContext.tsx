import { musicSelector, skipSong } from 'features/musicSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MusicItem } from 'share/types';

interface IAudioCtx {
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  currentDuration: number;
  setCurrentDuration: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  handleChangeDuration: (event: Event, newValue: number | number[]) => void;
  prevSongHandler: () => void;
  endSongHandler: () => void;
  volume: number;
  handleChangeVolume: (event: Event, newValue: number | number[]) => void;
  currentSong: MusicItem | null;
  isRepeatAll: boolean;
  isRepeatOnlyOne: boolean;
  nextSongHandler: () => void;
}

export const AudioCtx = React.createContext<IAudioCtx | null>(null);

export const AudioProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [duration, setDuration] = useState<number>(0);
  const [currentDuration, setCurrentDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentSong, isRepeatAll, isRepeatOnlyOne } = useAppSelector(musicSelector);
  const dispatch = useAppDispatch();
  const [volume, setVolume] = useState<number>(1);

  const nextSongHandler = useCallback(() => {
    if (currentSong) {
      dispatch(skipSong({ id: currentSong.id, forward: true }));
      setIsPlaying(true);
      audioRef.current?.play();
    }
  }, [currentSong, dispatch]);

  const endSongHandler = useCallback(() => {
    if (isRepeatOnlyOne) {
      setIsPlaying(true);
    } else if (isRepeatAll) {
      nextSongHandler();
    } else {
      setIsPlaying(false);
    }
  }, [isRepeatOnlyOne, isRepeatAll, nextSongHandler]);

  const prevSongHandler = () => {
    if (currentSong) {
      dispatch(skipSong({ id: currentSong.id, forward: false }));
      setIsPlaying(true);
      audioRef.current?.play();
    }
  };

  const handleChangeDuration = (event: Event, newValue: number | number[]) => {
    if (audioRef.current?.currentTime) {
      audioRef.current.currentTime = newValue as number;
    }
    setCurrentDuration(newValue as number);
  };

  const handleChangeVolume = (event: Event, newValue: number | number[]) => {
    if (audioRef.current?.volume !== undefined) {
      audioRef.current.volume = newValue as number;
    }
    setVolume(newValue as number);
  };

  useEffect(() => {
    const audio = document.querySelector('#audio .audio-global') as HTMLAudioElement;
    audioRef.current = audio;
  }, []);

  useEffect(() => {
    audioRef.current?.addEventListener('loadedmetadata', () => {
      setDuration(Math.floor(audioRef.current?.duration as number));
    });
  });

  useEffect(() => {
    audioRef.current?.addEventListener('timeupdate', () => {
      setCurrentDuration(Math.floor(audioRef.current?.currentTime as number));
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  });

  useEffect(() => {
    audioRef.current?.addEventListener('ended', endSongHandler);
  }, [endSongHandler]);

  return (
    <AudioCtx.Provider
      value={{
        audioRef,
        currentDuration,
        duration,
        endSongHandler,
        handleChangeDuration,
        handleChangeVolume,
        isPlaying,
        prevSongHandler,
        setCurrentDuration,
        setDuration,
        setIsPlaying,
        volume,
        currentSong,
        isRepeatAll,
        isRepeatOnlyOne,
        nextSongHandler,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
};
