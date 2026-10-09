import { createContext,useState, useEffect } from "react";


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || "";
                const response = await fetch(`${API_URL}/api/auth/get-me`, {credentials: "include"});
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false)
            }
        }
        getAndSetUser()
    }, [])

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}