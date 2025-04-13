import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { syncEmotionList, voteForEmotion } from '@/reducers/emotion';
import { shuffleArray } from '@/utils/array';
import { generateRandomStar } from '@/utils/star';
import { AppDispatch, RootState } from '@/utils/store';
import { DialogClose, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const EmotionReadPage = ({ baseEmotion }: { baseEmotion: BaseEmotion }) => {
  const dispatch = useDispatch<AppDispatch>();
  const emotion = useSelector((state: RootState) => state.emotion);

  useEffect(() => {
    dispatch(syncEmotionList(baseEmotion.id, 20));
  }, [dispatch, baseEmotion.id]);

  const [exitButtonIndex, setExitButtonIndex] = useState<number>(0);
  const [randomButtonIndex, setRandomButtonIndex] = useState<number>(0);
  const [topLikedEmotionIdList, setTopLikedEmotionIdList] = useState<number[]>([]);

  useEffect(() => {
    if (!emotion.list) return;

    const exitButtonIndex = Math.floor(Math.random() * emotion.list.length);
    setExitButtonIndex(exitButtonIndex);
    let randomButtonIndex = Math.floor(Math.random() * emotion.list.length);
    while (exitButtonIndex === randomButtonIndex) {
      randomButtonIndex = Math.floor(Math.random() * emotion.list.length);
    }
    setRandomButtonIndex(randomButtonIndex);

    const topLikedEmotionIdList = shuffleArray(emotion.list).sort((a, b) => b.likes - a.likes).slice(0, 3).map(item => item.id);
    setTopLikedEmotionIdList(topLikedEmotionIdList);
  }, [emotion.list]);

  if (!emotion.list) return null;
  return (
    <div className={`w-full min-h-screen bg-(--main) ${baseEmotion.color}`}>
      <div className="p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-3/5 h-full mx-auto flex flex-col justify-center">
        <div className="flex justify-center items-center h-full mb-8">
          <h1 className="text-5xl xl:text-7xl font-black text-black text-center uppercase tracking-tighter relative z-20">
            <span className="bg-black text-white px-4 py-2 inline-block transform -rotate-2 uppercase">{baseEmotion.title}</span>
          </h1>
        </div>

        <div className="w-full flex flex-wrap gap-8 font-semibold">
          {emotion.list.map((item, index) => {
            const emotionElement = (
              <div key={item.id} className="relative grow p-2 shadow-(--shadow) bg-white">
                {topLikedEmotionIdList.includes(item.id) && generateRandomStar()}
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <p className="mx-auto text-center max-w-32 break-words">{item.title}</p>
                    </DialogTrigger>
                    <DialogContent className={`sm:max-w-[425px] ${baseEmotion.color}`}>
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{item.title}</DialogTitle>
                        <DialogDescription>{item.message}</DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex justify-between items-center">
                        <div className="mr-auto font-bold">
                          <span className="text-2xl text-(--main)">🎔</span>
                          {' '}
                          {item.likes}
                        </div>
                        <div className="flex gap-3">
                          <DialogClose asChild>
                            <Button>Cancel</Button>
                          </DialogClose>
                          <Button onClick={async () => {
                            dispatch(voteForEmotion(item));
                          }}
                          >
                            Vote
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            );

            if (index == exitButtonIndex) {
              return (
                <>
                  <div key="exitButton">
                    <Link to={`/emotions/${baseEmotion.id}/submit`}>
                      <Button className="grow py-6 px-10 h-full text-white bg-black font-bold uppercase" key={index}>
                        Back
                      </Button>
                    </Link>
                  </div>
                  {emotionElement}
                </>
              );
            }
            if (index == randomButtonIndex) {
              return (
                <>
                  <div key="randomButton">
                    <Link to={`/emotions/${baseEmotion.id}`}>
                      <Button className="grow py-6 px-10 h-full text-white bg-black font-bold uppercase" key={index} onClick={() => dispatch(syncEmotionList(baseEmotion.id, 15))}>
                        Randomize
                      </Button>
                    </Link>
                  </div>
                  {emotionElement}
                </>
              );
            }
            return emotionElement;
          })}
        </div>
      </div>
    </div>
  );
};

export default EmotionReadPage;
