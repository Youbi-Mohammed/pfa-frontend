import { useAppSelector } from "../../app/hooks"
import { Navigate, Outlet } from "react-router-dom"

type PrivateRouteProps = {
  allowedRoles: number
}

export default function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { user } = useAppSelector((state) => state.auth)

  if (!user) {
    return <Navigate to="/login" replace />
  }
console.log(user.roleId,allowedRoles)
  if (allowedRoles!= user.roleId) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
