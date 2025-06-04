"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"

export default function DebugCookiesPage() {
  const [cookieInfo, setCookieInfo] = useState("")
  const [testToken, setTestToken] = useState("")

  useEffect(() => {
    // Leer cookies actuales
    updateCookieInfo()
  }, [])

  const updateCookieInfo = () => {
    const cookies = document.cookie
    setCookieInfo(cookies || "No cookies found")
  }
  const setCookieTest = () => {
    const token = testToken || "test_token_123"
    
    // Test with js-cookie
    Cookies.set("admin_token", token, {
      path: "/",
      expires: 1,
      sameSite: "strict",
      secure: window.location.protocol === "https:"
    })
    
    console.log("Cookie set with js-cookie:", token)
    
    setTimeout(() => {
      const retrievedCookie = Cookies.get("admin_token")
      console.log("Retrieved cookie:", retrievedCookie)
      updateCookieInfo()
    }, 100)
  }
  const clearCookies = () => {
    Cookies.remove("admin_token", { path: "/" })
    setTimeout(updateCookieInfo, 100)
  }

  const testApiCall = async () => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: "admin", 
          password: "sulkar2024" 
        }),
      })

      const data = await response.json()
      console.log("API Response:", data)
        if (data.token) {
        // Set cookie with js-cookie after getting token
        Cookies.set("admin_token", data.token, {
          path: "/",
          expires: 1,
          sameSite: "strict",
          secure: window.location.protocol === "https:"
        })
        console.log("Cookie set with js-cookie:", data.token)
        
        setTimeout(() => {
          updateCookieInfo()
          const retrievedCookie = Cookies.get("admin_token")
          console.log("Cookies after API login:", retrievedCookie)
        }, 100)
      }
    } catch (error) {
      console.error("API Error:", error)
    }
  }

  const testMiddleware = async () => {
    try {
      const response = await fetch("/management")
      console.log("Middleware test response:", response.status, response.url)
    } catch (error) {
      console.error("Middleware test error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🍪 Cookie Debug Tool</h1>
        
        <div className="grid gap-6">
          {/* Current Cookies */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Current Cookies</h2>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm">
              {cookieInfo}
            </div>
            <button 
              onClick={updateCookieInfo}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh Cookie Info
            </button>
          </div>

          {/* Manual Cookie Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Manual Cookie Test</h2>
            <input
              type="text"
              value={testToken}
              onChange={(e) => setTestToken(e.target.value)}
              placeholder="Enter test token (optional)"
              className="border border-gray-300 px-3 py-2 rounded w-full mb-4"
            />
            <div className="flex gap-2">
              <button 
                onClick={setCookieTest}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Set Test Cookie
              </button>
              <button 
                onClick={clearCookies}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cookies
              </button>
            </div>
          </div>

          {/* API Login Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Real API Login Test</h2>
            <p className="text-gray-600 mb-4">
              This will call the actual login API with admin/sulkar2024 and set the cookie
            </p>
            <button 
              onClick={testApiCall}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Test API Login + Cookie
            </button>
          </div>

          {/* Middleware Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Middleware Test</h2>
            <p className="text-gray-600 mb-4">
              This will try to access /management to test if middleware sees the cookie
            </p>
            <button 
              onClick={testMiddleware}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Test Middleware Access
            </button>
          </div>

          {/* Navigation */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <div className="flex gap-2">
              <a 
                href="/auth-system" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
              >
                Go to Login Page
              </a>
              <a 
                href="/management" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block"
              >
                Go to Management (Protected)
              </a>
              <a 
                href="/test-login" 
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 inline-block"
              >
                Go to Test Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
