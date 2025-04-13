import { BASE_URL } from '@/utils/config';
import axios from 'axios';

const getEmotionList = async (emotion: string, count: number): Promise<Emotion[]> => {
  return await axios.get(`${BASE_URL}/emotions?emotion=${emotion}&language=english&count=${count}`)
    .then(response => response.data);
};

const postEmotion = async (emotion: string, message: string): Promise<Emotion> => {
  return await axios.post(`${BASE_URL}/emotions`, { emotion, message })
    .then(response => response.data);
};

const voteEmotion = async (id: number): Promise<Emotion> => {
  return await axios.post(`${BASE_URL}/reactions`, { id })
    .then(response => response.data);
};

export { getEmotionList, postEmotion, voteEmotion };
