import { ReactElement } from 'react';
import { EMOJI_LIST } from './data';

const generateRandomEmojiElement = (key: number): ReactElement<HTMLSpanElement> => {
  const emojiIndex = Math.floor(Math.random() * EMOJI_LIST.length);
  const emojiStyle = {
    left: `${Math.random() * document.body.clientWidth}px`,
    top: `${Math.random() * document.body.scrollHeight}px`,
    transform: `rotate(${Math.random() * 360}deg)`,
  };
  return (
    <span key={key} className="absolute -z-10" style={emojiStyle}>
      {EMOJI_LIST[emojiIndex]}
    </span>
  );
};

const generateRandomEmojiElementList = (): ReactElement<HTMLSpanElement>[] => {
  const count = Math.floor(window.innerWidth * window.innerHeight / 5000);
  return Array.from({ length: count }, (_, index) => generateRandomEmojiElement(index));
};

export { generateRandomEmojiElementList };
