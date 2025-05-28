import './App.css'
import { Outlet } from 'react-router-dom'
import './index.css'; 
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
        <NavBar />
        <main className="flex-grow w-full">
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
