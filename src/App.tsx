import { useRoutes } from '@solidjs/router';
import { routes } from './routes';
import './App.css';

function App() {
  const Routes = useRoutes(routes);

  return <Routes />;
}

export default App;
