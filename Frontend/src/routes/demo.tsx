import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  component: Demo,
})

function Demo() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-purple-600">Demo Page</h1>
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">TanStack Router is working!</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✅ File-based routing is configured</li>
          <li>✅ Navigation between routes is working</li>
          <li>✅ DevTools are available (bottom right corner)</li>
          <li>✅ Tailwind CSS styling is applied</li>
        </ul>
      </div>
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-3">Route Information</h3>
        <p className="text-gray-600">
          Current route: <code className="bg-gray-100 px-2 py-1 rounded">/demo</code>
        </p>
        <p className="text-gray-600 mt-2">
          This page demonstrates that TanStack Router is properly set up and working with your Vite + React application.
        </p>
      </div>
    </div>
  )
}
