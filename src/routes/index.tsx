import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import { HomePage } from '../templates/home/HomePage'
import { ComponentsPage } from '../templates/components/ComponentsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'components',
        element: <ComponentsPage />,
      },
    ],
  },
])

