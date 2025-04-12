import { Button } from '@/components/ui/button';
import { EMOJI_LIST, EMOTION_LIST } from '@/utils/data';
import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const generateRandomEmojiElement = (): ReactElement<HTMLSpanElement> => {
  const emojiIndex = Math.floor(Math.random() * EMOJI_LIST.length);
  const emojiStyle = {
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 99}vh`,
    transform: `rotate(${Math.random() * 360}deg)`,
  };
  return (
    <span className="absolute -z-10" style={emojiStyle}>
      {EMOJI_LIST[emojiIndex]}
    </span>
  );
};
const generateRandomEmojiElementList = (): ReactElement<HTMLSpanElement>[] => {
  const count = Math.floor(window.innerWidth * window.innerHeight / 5000);
  return Array.from({ length: count }, () => generateRandomEmojiElement());
};

const EmotionListPage = () => {
  const [emojiElementList, setEmojiElementList] = useState<ReactElement<HTMLSpanElement>[]>([]);

  useLayoutEffect(() => {
    const handleResize = () => setEmojiElementList(generateRandomEmojiElementList());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => setEmojiElementList(generateRandomEmojiElementList()), []);

  return (
    <div className="w-full h-full bg-(--main)">
      <div className="container h-full mx-auto flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mb-16">
          <span className="bg-black px-4 py-2 transform -rotate-2">
            <h1 className="text-5xl md:text-7xl font-black text-white text-center uppercase">
              Emotions
            </h1>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-5 font-bold text-xl uppercase">
          {EMOTION_LIST.map(emotion => (
            <Link to={`/emotions/${emotion.name.toLowerCase()}/submit`} key={emotion.name}>
              <Button className={`w-64 px-16 py-8 ${emotion.color} font-bold uppercase text-xl`}>{emotion.name}</Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="overflow-hidden absolute w-full h-full top-0 left-0 pointer-events-none text-2xl font-bold text-slate-300">
        {emojiElementList}
      </div>
    </div>
  );
};

export default EmotionListPage;
