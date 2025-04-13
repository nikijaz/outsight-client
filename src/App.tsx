import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BaseEmotionListPage from './pages/BaseEmotionListPage';
import EmotionReadPage from './pages/EmotionReadPage';
import EmotionSubmitPage from './pages/EmotionSubmitPage';
import { BASE_EMOTION_LIST } from './utils/data';

function App() {
  return (
    <div className="min-h-screen w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/emotions" />} />
          <Route path="/emotions" element={<BaseEmotionListPage />} />
          {BASE_EMOTION_LIST.map(item => (
            <>
              <Route
                key={`${item.id}-read`}
                path={`/emotions/${item.id}`}
                element={<EmotionReadPage baseEmotion={item} />}
              />
              <Route
                key={`${item.id}-submit`}
                path={`/emotions/${item.id}/submit`}
                element={<EmotionSubmitPage baseEmotion={item} />}
              />
            </>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
