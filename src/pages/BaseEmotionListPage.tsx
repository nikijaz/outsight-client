import { Button } from '@/components/ui/button';
import { BASE_EMOTION_LIST } from '@/utils/data';
import { generateRandomEmojiElementList } from '@/utils/emoji';
import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BaseEmotionListPage = () => {
  const [emojiElementList, setEmojiElementList] = useState<ReactElement<HTMLSpanElement>[]>([]);

  useEffect(() => setEmojiElementList(generateRandomEmojiElementList()), []);
  useLayoutEffect(() => {
    const handleResize = () => setEmojiElementList(generateRandomEmojiElementList());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-screen bg-(--main)">
      <div className="container py-16 h-screen mx-auto flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mb-16">
          <span className="bg-black px-4 py-2 transform -rotate-2">
            <h1 className="text-5xl md:text-7xl font-black text-white text-center uppercase">
              Outsight
            </h1>
          </span>
        </div>
        <div className="no-scroll overflow-y-scroll p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-bold text-xl uppercase">
            {BASE_EMOTION_LIST.map(item => (
              <Link key={item.id} className="mx-auto" to={`/emotions/${item.title.toLowerCase()}/submit`}>
                <Button className={`w-64 px-16 py-8 ${item.color} font-bold uppercase text-xl`}>{item.title}</Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden absolute w-full h-full top-0 left-0 pointer-events-none text-2xl font-bold text-slate-300">
        {emojiElementList}
      </div>
    </div>
  );
};

export default BaseEmotionListPage;
