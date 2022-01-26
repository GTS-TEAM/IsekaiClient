import React from 'react';
import { IMG } from '../../../../images';
import styled from './Emotion.module.scss';
const emotions = [
  {
    id: 1,
    name: 'được yêu',
    icon: IMG.EmojiDuocYeu,
  },
  {
    id: 2,
    name: 'hạnh phúc',
    icon: IMG.EmojiHanhPhuc,
  },
  {
    id: 3,
    name: 'có phúc',
    icon: IMG.EmojiCoPhuc,
  },
  {
    id: 4,
    name: 'điên',
    icon: IMG.EmojiDien,
  },
  {
    id: 5,
    name: 'buồn',
    icon: IMG.EmojiBuon,
  },
  {
    id: 6,
    name: 'đói',
    icon: IMG.EmojiDoi,
  },
  {
    id: 7,
    name: 'buồn ngủ',
    icon: IMG.EmojiBuonNgu,
  },
  {
    id: 8,
    name: 'cô đơn',
    icon: IMG.EmojiCoDon,
  },
  {
    id: 9,
    name: 'nhớ crush',
    icon: IMG.EmojiNhoCrush,
  },
  {
    id: 10,
    name: 'hài lòng',
    icon: IMG.EmojiHaiLong,
  },
];

const Emotion = ({ setEmotion, emotion }) => {
  return (
    <div className={styled.emotion__wrap}>
      <div className={styled.emotions}>
        {emotions.map((item) => (
          <div
            key={item.id}
            className={`${styled.emotion} ${emotion?.id === item.id ? `${styled.active}` : null}`}
            onClick={() => {
              setEmotion(item);
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
