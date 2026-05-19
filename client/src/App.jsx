import './App.css'
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <main className='h-120'>
        <Outlet />
      </main>
      <Toaster/>
    </>
  )
}

export default App
