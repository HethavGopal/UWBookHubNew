import './App.css'
import { Outlet } from 'react-router-dom'
import './index.css'; 
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <NavBar />
      <main className="flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
