import { StrictMode, FC } from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from '@tanstack/react-router'
import router from './pages'
import './index.css';


const App:FC = () => {
  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>    
    <App />
  </StrictMode>
)


declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}