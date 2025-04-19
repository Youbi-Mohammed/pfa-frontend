"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "./SignUp.css"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { register, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { RegisterData } from "../types/authTypes"

export default function SignUp() {
  const [role, setRole] = useState<"etudiant" | "encadrant" | "admin">("etudiant")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cin: "",
    branch: "",
    imageUrl: "", 
  })
  console.log(role)
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  )
  
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
          navigate("/")
      }
    }
  
    if (isError) {
      console.error(message)
    }

    
    return () => {
      dispatch(reset()) 
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRoleChange = (value: "etudiant" | "encadrant" | "admin") => {
    setRole(value)
    setIsSelectOpen(false)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cin: "",
      branch: "",
      imageUrl: "",
    })
  }

  const getRoleId = (): number => {
    switch (role) {
      case "admin":
        return 1
      case "encadrant":
        return 2
      default:
        return 3
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const userData: RegisterData = {
      ...formData,
      roleId: getRoleId(),
    }

    await dispatch(register(userData)).unwrap()
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
            Sign Up
          </motion.h2>
        </div>

        <div className="card-content">
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="role" className="form-label">Role</label>
              <div className="custom-select">
                <button type="button" className="select-trigger" onClick={() => setIsSelectOpen(!isSelectOpen)} disabled={isLoading}>
                  {role === "etudiant" ? "Etudiant" : role === "encadrant" ? "Encadrant" : "Admin"}
                  <span className="select-arrow">▼</span>
                </button>
                {isSelectOpen && (
                  <div className="select-content">
                    {["etudiant", "encadrant", "admin"].map((r) => (
                      <div
                        key={r}
                        className={`select-item ${role === r ? "selected" : ""}`}
                        onClick={() => handleRoleChange(r as typeof role)}
                      >
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {['firstName', 'lastName', 'email', 'cin', 'branch', 'imageUrl', 'password'].map((field) => (
              <div className="form-group" key={field}>
                <label htmlFor={field} className="form-label">{field}</label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={isLoading}
                />
              </div>
            ))}

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Processing..." : "Sign Up"}
            </button>
            {message && (
              <motion.div className={`message ${isError ? "error" : "success"}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {message}
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
