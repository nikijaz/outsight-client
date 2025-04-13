import Star8 from '@/components/stars/s8';

const generateRandomStar = () => {
  const style = {
    transform: `rotate(${Math.random() * 360}deg)`,
  };
  return (
    <Star8 style={style} className="text-(--main) stroke-[8px] stroke-black absolute w-12 top-0 left-0 -translate-2/5" />
  );
};

export { generateRandomStar };
