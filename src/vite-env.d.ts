/// <reference types="vite/client" />

interface BaseEmotion {
  id: string;
  color: string;
  title: string;
  feel: string;
}

interface Emotion {
  id: number;
  title: string;
  message: string;
  likes: number;
}
