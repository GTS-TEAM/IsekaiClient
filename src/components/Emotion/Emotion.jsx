import { addPostEmotion, postsSelector } from 'features/postsSlice';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import emotions from 'utils/emotions';
import styled from './Emotion.module.scss';

const Emotion = ({ onClose }) => {
  const post = useSelector(postsSelector);
  const dispatch = useDispatch();
  return (
    <div className={styled.emotion__wrap}>
      <div className={styled.close} onClick={onClose}>
        <IoClose />
      </div>
      <div className={styled.emotions}>
        {emotions.map((item) => (
          <div
            key={item.id}
            className={`${styled.emotion} ${post.dataPosts.emotion?.id === item.id ? `${styled.active}` : null}`}
            onClick={() => {
              dispatch(addPostEmotion(item));
            }}
          >
            <div className={styled.emoji}>
              <img src={item.icon} alt="" />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Emotion;
