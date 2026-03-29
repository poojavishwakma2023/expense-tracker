import { useState, useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from '../../firebase'


interface ProtectedRouteProps {
    children:ReactNode
}
const ProtectedRoute = ({ children }:ProtectedRouteProps) => {
    const [user, setUser] = useState<User| null | undefined>(undefined)

    useEffect(() => {
      const unsubscribe =   onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return ()=> unsubscribe()
    },[])


    //  While checking auth state
  if (user === undefined) {
    return <p>Loading...</p>;
  }

//    Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }
    // Logged in
  return children;
}

export default ProtectedRoute;