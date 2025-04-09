"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Protect routes that require authentication
  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/", "/login"]
      const requiresAuth = !publicRoutes.includes(pathname)

      if (requiresAuth && !user) {
        router.push("/login")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // COMMENT: In a real application, you would make an API call here
    // Example API call:
    // try {
    //   const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   });
    //   const data = await response.json();
    //   if (data.success) {
    //     setUser(data.user);
    //     localStorage.setItem('user', JSON.stringify(data.user));
    //     setIsLoading(false);
    //     return true;
    //   } else {
    //     setIsLoading(false);
    //     return false;
    //   }
    // } catch (error) {
    //   console.error('Login error:', error);
    //   setIsLoading(false);
    //   return false;
    // }

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation - in a real app, this would be a server call
        if (email && password.length >= 6) {
          const newUser = {
            id: "1",
            name: email.split("@")[0],
            email,
          }
          setUser(newUser)
          localStorage.setItem("user", JSON.stringify(newUser))
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // COMMENT: In a real application, you would make an API call here
    // Example API call:
    // try {
    //   const response = await fetch('/api/auth/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, password })
    //   });
    //   const data = await response.json();
    //   if (data.success) {
    //     setUser(data.user);
    //     localStorage.setItem('user', JSON.stringify(data.user));
    //     setIsLoading(false);
    //     return true;
    //   } else {
    //     setIsLoading(false);
    //     return false;
    //   }
    // } catch (error) {
    //   console.error('Registration error:', error);
    //   setIsLoading(false);
    //   return false;
    // }

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation - in a real app, this would be a server call
        if (name && email && password.length >= 6) {
          const newUser = {
            id: "1",
            name,
            email,
          }
          setUser(newUser)
          localStorage.setItem("user", JSON.stringify(newUser))
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  const logout = () => {
    // COMMENT: In a real application, you might want to make an API call here
    // Example API call:
    // fetch('/api/auth/logout', { method: 'POST' })
    //   .then(() => {
    //     setUser(null);
    //     localStorage.removeItem('user');
    //     router.push('/');
    //   })
    //   .catch(error => console.error('Logout error:', error));

    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("quizResults") // Clear quiz results on logout
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
