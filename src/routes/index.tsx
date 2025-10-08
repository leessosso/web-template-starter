import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import { HomePage } from '../templates/home/HomePage'
import { PortfolioPage } from '../templates/portfolio/PortfolioPage'
import { ProductPage } from '../templates/product/ProductPage'
import { ServicePage } from '../templates/service/ServicePage'
import AnalyticsPage from '../templates/analytics/AnalyticsPage'
import { LandingPage, TestPage, ResultPage, TypesPage } from '../templates/lovetype'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'test',
        element: <TestPage />,
      },
      {
        path: 'result/:type',
        element: <ResultPage />,
      },
      {
        path: 'types',
        element: <TypesPage />,
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

