import { Marquee } from '@/components/magicui/marquee';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EMOTIONS } from '@/utils/data';
import { Link } from 'react-router-dom';

interface EmotionSubmitPageProps {
  emotion: Emotion;
}

const EmotionSubmitPage = ({ emotion }: EmotionSubmitPageProps) => {
  return (
    <div className={`relative w-full h-full overflow-y-hidden bg-(--main) ${emotion.color}`}>
      <div className="p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 h-full mx-auto flex flex-col justify-center">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-5xl xl:text-7xl font-black text-black text-center uppercase tracking-tighter relative z-20">
            <span className="bg-black text-white px-4 py-2 inline-block transform -rotate-2 uppercase">{emotion.name}</span>
          </h1>
        </div>
        <div className="w-full" />
        <div className="w-full mt-auto">
          <div className="p-4 bg-white shadow-(--shadow)">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">
                SHARE YOUR
                {' '}
                {emotion.name.toUpperCase()}
              </h2>
              <Link to="/emotions">
                <Button className="font-black">X</Button>
              </Link>
            </div>
            <Textarea className="w-full min-h-36" placeholder={`What made you feel ${emotion.feel} today?`} />
            <div className="w-full flex justify-between mt-6">
              <Link to={`/emotions/${emotion.name.toLowerCase()}`}>
                <Button className="font-black">VIEW</Button>
              </Link>
              <Button className="font-black">SUMBIT</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-sm hidden lg:block">
        <Marquee vertical reverse className="[--duration:60s]">
          {EMOTIONS.map((emotion, index) => (
            <div key={index} className="mb-1 text-right transform -translate-x-1/2 w-full p-4 ml-auto shadow-(--shadow) bg-white">
              <p>{emotion}</p>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="absolute top-0 right-0 w-sm hidden lg:block">
        <Marquee vertical className="[--duration:60s]">
          {EMOTIONS.map((emotion, index) => (
            <div key={index} className="mb-1 text-left transform translate-x-1/2 w-full p-4 ml-auto shadow-(--shadow) bg-white">
              <p>{emotion}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default EmotionSubmitPage;
