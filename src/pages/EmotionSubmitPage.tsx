import { Marquee } from '@/components/magicui/marquee';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { syncEmotionList } from '@/reducers/emotion';
import { postEmotion } from '@/services/emotion';
import { AppDispatch, RootState } from '@/utils/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const EmotionSubmitPage = ({ baseEmotion }: { baseEmotion: BaseEmotion }) => {
  const dispatch = useDispatch<AppDispatch>();
  const emotion = useSelector((state: RootState) => state.emotion);

  useEffect(() => {
    dispatch(syncEmotionList(baseEmotion.id, 20));
  }, [dispatch, baseEmotion.id]);

  const [message, setMessage] = useState<string>('');

  if (!emotion.list) return null;
  return (
    <div className={`relative w-full h-screen overflow-y-hidden bg-(--main) ${baseEmotion.color}`}>
      {/* Main Container */}
      <div className="p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 h-full mx-auto flex flex-col justify-center">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-5xl xl:text-7xl font-black text-black text-center uppercase tracking-tighter relative z-20">
            <span className="bg-black text-white px-4 py-2 inline-block transform -rotate-2 uppercase">{baseEmotion.title}</span>
          </h1>
        </div>
        <div className="w-full" />
        <div className="w-full mt-auto">
          <div className="p-4 bg-white shadow-(--shadow)">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">
                SHARE YOUR
                {' '}
                {baseEmotion.title.toUpperCase()}
              </h2>
              <Link to="/emotions">
                <Button className="font-black">X</Button>
              </Link>
            </div>
            <Textarea className="w-full min-h-36" value={message} onChange={e => setMessage(e.target.value)} placeholder={`What made you feel ${baseEmotion.feel} today?`} />
            <div className="w-full flex justify-between mt-6">
              <Link to={`/emotions/${baseEmotion.title.toLowerCase()}`}>
                <Button className="font-black">VIEW</Button>
              </Link>
              <Button
                className="font-black"
                onClick={async () => {
                  setMessage('');
                  await postEmotion(emotion.emotion, message);
                }}
              >
                SUMBIT
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Left Marquee */}
      <div className="absolute top-0 left-0 w-sm hidden lg:block">
        <Marquee vertical reverse className="[--duration:60s]">
          {emotion.list.map((item, index) => (
            <div key={index} className="mb-1 text-right transform -translate-x-1/2 w-full p-4 ml-auto shadow-(--shadow) bg-white">
              <p>{item.message}</p>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Right Marquee */}
      <div className="absolute top-0 right-0 w-sm hidden lg:block">
        <Marquee vertical className="[--duration:60s]">
          {emotion.list.map((item, index) => (
            <div key={index} className="mb-1 text-left transform translate-x-1/2 w-full p-4 ml-auto shadow-(--shadow) bg-white">
              <p>{item.message}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default EmotionSubmitPage;
