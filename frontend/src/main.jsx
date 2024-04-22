import React, { createContext, useState } from 'react';
import ReactDOM from "react-dom/client";
import App from './App.jsx';

export const Context = createContext({
  isAuthorized: false, //ui 테스트용으로 true
})

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({}); // user정보 받아올 때 업데이트
  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser
      }}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWrapper />,
)
