import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
      <div className="p-6 ml-64 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Sales</h2>
          <p className="text-2xl font-bold text-green-600">$12,430</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Products</h2>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Orders</h2>
          <p className="text-2xl font-bold text-purple-600">540</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">#0012</td>
              <td className="py-2">John Doe</td>
              <td className="py-2">$250</td>
              <td className="py-2 text-green-600 font-semibold">Shipped</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">#0013</td>
              <td className="py-2">Alice Smith</td>
              <td className="py-2">$340</td>
              <td className="py-2 text-yellow-500 font-semibold">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Top Products */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top-Selling Watches</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span className="text-gray-700">Rolex Submariner</span>
            <span className="font-semibold text-green-600">$6,500</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-700">Omega Speedmaster</span>
            <span className="font-semibold text-green-600">$4,200</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-700">Seiko Prospex</span>
            <span className="font-semibold text-green-600">$950</span>
          </li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard