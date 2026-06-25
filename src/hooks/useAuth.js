import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/features/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const doLogout = () => dispatch(logout());
  return { user, loading, error, logout: doLogout };
};
