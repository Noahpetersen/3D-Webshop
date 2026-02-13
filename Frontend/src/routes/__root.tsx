import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 border-b border-gray-200">
        <nav className="flex gap-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Home
          </Link>
          <Link to="/demo" className="text-blue-600 hover:text-blue-800">
            Demo
          </Link>
        </nav>
      </div>
      <div className="p-8">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})
