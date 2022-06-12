import { useAudio } from 'hooks/useAudio';
import { IMG } from 'images';
import Search from '../Search';
import { StyledHeader } from './styles';

const Header = () => {
  const audioCtx = useAudio();
  return (
    <StyledHeader>
      <h1>Âm nhạc</h1>
      <div className="img">
        <img src="https://cdn-icons-png.flaticon.com/512/145/145809.png" alt="" />
      </div>
      <div className="actions">
        <Search />
        <button
          className="btn-action"
          onClick={() => {
            audioCtx?.setIsPlaying(!audioCtx?.isPlaying as boolean);
          }}
        >
          {audioCtx?.isPlaying ? <IMG.Play className="play" /> : <IMG.Pause className="pause" />}
        </button>
      </div>
    </StyledHeader>
  );
};

export default Header;
