import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoutes = () =>
{
  const { userInfo } = useSelector(state => state.auth)
  return userInfo.role === 'admin' || userInfo.role === 'manager' || userInfo.role === 'lead' ? <Outlet /> : <Navigate to='/' />
}

export { AdminRoutes }