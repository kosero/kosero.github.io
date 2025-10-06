import { createRoot } from 'react-dom/client'
import '~/assets/tailwind.css'
import MainRoutes from '~/routes/index.jsx'

createRoot(document.getElementById('root')).render(
  <MainRoutes />
)