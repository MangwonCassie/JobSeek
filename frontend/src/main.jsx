import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const context = createContext({
  isAuthorized: false,
})

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({}); // user정보 받아올 때 업데이트
  return (
    <context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser
      }}>
      <App />
    </context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
