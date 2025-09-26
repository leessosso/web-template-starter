import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import { HomePage } from '../templates/home/HomePage'
import { PortfolioPage } from '../templates/portfolio/PortfolioPage'
import { ProductPage } from '../templates/product/ProductPage'
import { ServicePage } from '../templates/service/ServicePage'
import AnalyticsPage from '../templates/analytics/AnalyticsPage'

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
        path: 'service',
        element: <ServicePage />,
      },
      {
        path: 'product',
        element: <ProductPage />,
      },
      {
        path: 'portfolio',
        element: <PortfolioPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
    ],
  },
])

