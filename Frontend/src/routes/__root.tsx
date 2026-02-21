import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Navbar from '../components/ui/Navbar'

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
})
