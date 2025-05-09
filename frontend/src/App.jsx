import './App.css'
import { Outlet } from 'react-router-dom'


function App() {
  

  return (
    <>
      <nav>NavBar</nav>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <footer>Footer</footer>
    </>
  )
}

export default App
