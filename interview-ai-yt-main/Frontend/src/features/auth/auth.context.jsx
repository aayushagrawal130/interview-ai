import { createContext,useState, useEffect } from "react";


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                // We fetch manually to avoid circular dependencies
                const response = await fetch("/api/auth/get-me", {credentials: "include"});
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