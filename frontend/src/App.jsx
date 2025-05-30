import './App.css'
import { Outlet } from 'react-router-dom'
import './index.css'; 
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-dark-text">
        <NavBar />
        <main className="flex-grow w-full bg-gradient-to-b from-transparent to-black/20 pt-20">
          <div className="w-full px-4 py-6 font-primary">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
