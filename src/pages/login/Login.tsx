"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { login, reset } from "../../features/auth/authSlice"
import "./Login.css"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user, isError, message } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      switch (user.roleId) {
        case 1:
          navigate("/admin")
          break
        case 2:
          navigate("/encadrant")
          break
        case 3:
          navigate("/student")
          break
        default:
          setError("Role n'est pas trouve!!!!!!")
          break
      }
    }

    if (isError) {
      setError(message)
    }

    dispatch(reset())
  }, [user, isError, message, navigate, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

      await dispatch(login(formData)).unwrap()
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="top-bar"></div>
        <div className="circle circle-top-right"></div>
        <div className="circle circle-bottom-left"></div>
        <div className="circle circle-top-left"></div>
        <div className="circle circle-bottom-right"></div>

        <div className="card-header">
          <motion.h2
            className="card-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Login
          </motion.h2>
        </div>

        <div className="card-content">
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="submit-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}
