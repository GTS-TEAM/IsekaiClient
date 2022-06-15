import { AudioCtx } from 'context/audioContext';
import { useContext } from 'react';

export const useAudio = () => useContext(AudioCtx);
