import React from 'react';
import './App.css';
import Submit from './components/submit';
import VideoBox from './components/videoBox';

function App() {
  return (
    <div className="App">
      <div>
        请选择要上传的视频文件
      </div>
      <div>
        <Submit url="http://127.0.0.1:8080"/>
      </div>
      <div>
        -------------------------------------------------------------
      </div>
      <div>
        <VideoBox/>
      </div>
    </div>
  );
}

export default App;
