import { Button } from '@/components/ui/button';
import { EMOTIONS } from '@/utils/data';
import { Link } from 'react-router-dom';

interface EmotionReadPageProps {
  emotion: Emotion;
}

const EmotionReadPage = ({ emotion }: EmotionReadPageProps) => {
  const randomIndex = Math.floor(Math.random() * EMOTIONS.length);

  return (
    <div className={`w-full min-h-full bg-(--main) ${emotion.color}`}>
      <div className="p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-3/5 h-full mx-auto flex flex-col justify-center">
        <div className="flex justify-center items-center h-full mb-8">
          <h1 className="text-5xl xl:text-7xl font-black text-black text-center uppercase tracking-tighter relative z-20">
            <span className="bg-black text-white px-4 py-2 inline-block transform -rotate-2 uppercase">{emotion.name}</span>
          </h1>
        </div>
        <div className="w-full flex flex-wrap gap-6 font-semibold">
          {EMOTIONS.map((emotionText, index) => {
            if (index === randomIndex) {
              return (
                <>
                  <div>
                    <Link to={`/emotions/${emotion.name.toLowerCase()}/submit`}>
                      <Button className="grow px-10 h-full text-white bg-black font-bold" key={index}>
                        BACK
                      </Button>
                    </Link>
                  </div>
                  <div key={index} className="grow p-2 shadow-(--shadow) bg-white">
                    <p className="mx-auto text-center max-w-32 break-words">{emotionText}</p>
                  </div>
                </>
              );
            }
            return (
              <div key={index} className="grow p-2 shadow-(--shadow) bg-white">
                <p className="mx-auto text-center max-w-32 break-words">{emotionText}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmotionReadPage;
