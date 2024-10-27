import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
=======
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> 6c13171466d4d2c23a0d2fee8c6ff8257bf57cf2

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
