import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EmotionListPage from './pages/EmotionListPage';
import EmotionReadPage from './pages/EmotionReadPage';
import EmotionSubmitPage from './pages/EmotionSubmitPage';
import { EMOTION_LIST } from './utils/data';

function App() {
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/emotions" />} />
          <Route path="/emotions" element={<EmotionListPage />} />
          {EMOTION_LIST.map(emotion => (
            <Route
              key={emotion.name}
              path={`/emotions/${emotion.name.toLowerCase()}`}
              element={<EmotionReadPage emotion={emotion} />}
            />
          ))}
          {EMOTION_LIST.map(emotion => (
            <Route
              key={emotion.name}
              path={`/emotions/${emotion.name.toLowerCase()}/submit`}
              element={<EmotionSubmitPage emotion={emotion} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
