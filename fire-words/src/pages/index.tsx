import {
  Outlet,
  createReactRouter,
  createRouteConfig,
} from '@tanstack/react-router'
import Header from './common/Header' 
import AboutPage from './AboutPage'

import GameboardPage from './GameboardPage'
import LeaderboardPage from './LeaderboardPage'
import TutorialPage from './TutorialPage'
import HomePage from './HomePage'
import { GameboardContextProvider } from '../context/gameboard/gameDataContext'






const rootRoute = createRouteConfig({
  component: () => (
    <>
      <Header/>
      <Outlet />
    </>
  )
})

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: () => <HomePage/>,
})

const aboutRoute = rootRoute.createRoute({
  path: '/about',
  component: () => <AboutPage/>,
})

const tutorialRoute = rootRoute.createRoute({
  path: '/tutorial',
  component: () => <TutorialPage/>,
})

const gameboardRoute = rootRoute.createRoute({
  path: '/gameboard',
  component: () => <GameboardContextProvider><GameboardPage/></GameboardContextProvider>,
})

const leaderboardRoute = rootRoute.createRoute({
  path: '/leaderboard',
  component: () => <LeaderboardPage/>,
})

const routeConfig = rootRoute.addChildren([
  indexRoute, 
  tutorialRoute, 
  gameboardRoute, 
  leaderboardRoute,
  aboutRoute
])
const router = createReactRouter({ routeConfig })

export default router;