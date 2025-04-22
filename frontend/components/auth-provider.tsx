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
  register: (username: string, password: string) => Promise<boolean>
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

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {

      const url = `http://localhost:3030/api/users/${username}`
      const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        console.log("User data:", data);

        if (data.user.password === password) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
          setIsLoading(false);
          return true;
        } else {
          console.error('Incorrect password');
          setIsLoading(false);
          return false;
        }
      } else {
        console.error('Login failed:', data.message);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }

  }

  const register = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const role = "user"

      const reqBody = {
        username,
        password,
        role
      }

      console.log("Registering user:", reqBody);
      
      const response = await fetch('http://localhost:3030/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      });
      if (!response.ok) {
        console.error('Server error:', response.status, response.statusText);
        setIsLoading(false);
        return false;
      }
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsLoading(false);
        return true;
      } else {
        console.log('Registration failed:', data.message);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
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
