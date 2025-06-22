import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout/Layout'

// Pages e Components
import OrdersList from './pages/Orders/OrdersList'
import CreateOrder from './pages/Orders/CreateOrder'
import OrderDetail from './pages/Orders/OrderDetail'

import ProductsList from './pages/Products/ProductsList'
import CreateProduct from './pages/Products/CreateProduct'

import UsersList from './pages/Users/UsersList'
import CreateUser from './pages/Users/CreateUser'

import ReportsList from './pages/Reports/ReportsList'
import ClientsReport from './components/Reports/ClientsReport'
import OrdersReport from './components/Reports/OrdersReport'
import TechniciansReport from './components/Reports/TechniciansReport'

import Login from './pages/Login/Login'

import NotasFiscaisList from './pages/NotaFiscal/NotasFiscaisList'
import CreateNotaFiscal from './pages/NotaFiscal/CreateNotaFiscal'
import UpdateNotaFiscal from './pages/NotaFiscal/UpdateNotaFiscal'
import NotaFiscalDetail from './pages/NotaFiscal/NotaFiscalDetail'

function DynamicUpdateNotaFiscal() {
  const { id } = useParams()
  return <UpdateNotaFiscal id={Number(id)} />
}

function DynamicNotaFiscalDetail() {
  const { id } = useParams()
  return <NotaFiscalDetail id={Number(id)} />
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('authToken', 'fake-jwt-token')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('authToken')
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Layout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        {/* ORDERS */}
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/orders/create" element={<CreateOrder />} />
        {/* USERS */}
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/create" element={<CreateUser />} />
        {/* PRODUCTS */}
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/create" element={<CreateProduct />} />
        {/* REPORTS */}
        <Route path="/reports" element={<ReportsList />} />
        <Route
          path="/reports/clients"
          element={<ClientsReport clients={[]} title="Relatório de Clientes" />}
        />
        <Route
          path="/reports/orders"
          element={<OrdersReport orders={[]} title="Relatório de Ordens de Serviço" />}
        />
        <Route
          path="/reports/technicians"
          element={<TechniciansReport technicians={[]} title="Relatório de Técnicos" />}
        />

        {/* NOTAS FISCAIS */}
        <Route path="/notas-fiscais" element={<NotasFiscaisList />} />
        <Route path="/notas-fiscais/create" element={<CreateNotaFiscal />} />
        <Route path="/notas-fiscais/:id/update" element={<DynamicUpdateNotaFiscal />} />
        <Route path="/notas-fiscais/:id" element={<DynamicNotaFiscalDetail />} />
      </Routes>
    </Layout>
  )
}

export default App
