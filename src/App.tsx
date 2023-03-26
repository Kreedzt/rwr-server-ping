import { Route, Routes } from '@solidjs/router';
import Home from './entries/home/Home';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" component={Home} />
    </Routes>
  );
}

export default App;
