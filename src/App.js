import logo from './logo.svg';
import './App.css';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Suspense fallback={null}>
          <Outlet />
      </Suspense>
    </>
  );
}

export default App;
