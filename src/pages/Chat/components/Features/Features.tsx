import { IconButton } from '@mui/material';
import ClickOutSide from 'components/ClickOutSide/ClickOutSide';
import { useClickOutside } from 'hooks/useClickOutside';
import { IMG } from 'images';
import React, { useRef, useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { ListEmotionReaction, StyledFeatures } from './styles';

interface Props {
  left: boolean;
}

const LIST_EMOTION_REACTION = [
  {
    name: 'Like',
    id: uuidv4(),
    mainImg: IMG.EmotionGif.Like,
    subImg: '',
  },
  {
    name: 'Thả tim',
    id: uuidv4(),
    mainImg: IMG.EmotionGif.Heart,
    subImg: '',
  },
  {
    name: 'Thương thương',
    id: uuidv4(),
    mainImg: IMG.EmotionGif.Care,
    subImg: '',
  },
  {
    name: 'Haha',
    id: uuidv4(),
    mainImg: IMG.EmotionGif.Haha,
    subImg: '',
  },
  {
    name: 'Wow',
    id: uuidv4(),
    mainImg: IMG.EmotionGif.Wow,
    subImg: '',
  },
  {
    name: 'Tức giận',
    id: uuidv4(),
    mainImg: IMG.EmotionGif.Angry,
    subImg: '',
  },
];

const Features: React.FC<Props> = ({ left }) => {
  const [isShowReaction, setIsShowReaction] = useState<boolean>(false);
  const listEmotionReactRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(listEmotionReactRef, () => {
    setIsShowReaction(false);
  });

  return (
    <>
      <StyledFeatures left={left} className="features">
        <IconButton>
          <CgTrash />
        </IconButton>
        <div>
          <IconButton
            onClick={() => {
              setIsShowReaction(true);
            }}
          >
            <MdOutlineEmojiEmotions />
          </IconButton>
        </div>
      </StyledFeatures>
      {isShowReaction && (
        <ClickOutSide
          handler={() => {
            setIsShowReaction(false);
          }}
        >
          {(ref) => {
            return (
              <ListEmotionReaction ref={ref} left={left}>
                {LIST_EMOTION_REACTION.map((item) => (
                  <div key={item.id} className="emoji">
                    <img src={item.mainImg} alt={item.name} />
                  </div>
                ))}
              </ListEmotionReaction>
            );
          }}
        </ClickOutSide>
      )}
    </>
  );
};

export default Features;
