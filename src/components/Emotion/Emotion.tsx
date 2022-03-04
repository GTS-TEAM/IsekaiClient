import { addPostEmotion, postsSelector } from 'features/postsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { IoClose } from 'react-icons/io5';
import emotions from 'utils/emotions';
import { Close, Emotions, StyledEmotion } from './Styles';

interface Props {
  onClose: () => any;
}

const Emotion: React.FC<Props> = ({ onClose }) => {
  const post = useAppSelector(postsSelector);
  const dispatch = useAppDispatch();
  return (
    <StyledEmotion>
      <Close onClick={onClose}>
        <IoClose />
      </Close>
      <Emotions>
        {emotions.map((item) => (
          <div
            key={item.id}
            className={`emotion ${post.dataPosts.emotion?.id === item.id ? `active` : null}`}
            onClick={() => {
              dispatch(addPostEmotion(item));
            }}
          >
            <div className="emoji">
              <img src={item.icon} alt="" />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </Emotions>
    </StyledEmotion>
  );
};

export default Emotion;
