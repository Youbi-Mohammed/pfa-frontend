"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import "./SignUp.css"

export default function SignUp() {
  const [role, setRole] = useState("etudiant") // Default role is 'etudiant'
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    token: "", // Token for Encadrant
    department: "", // Department for Encadrant
  })
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle role selection change
  const handleRoleChange = (value: string) => {
    setRole(value)
    setIsSelectOpen(false)
    setFormData({
      // Reset form fields when role changes
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      token: "",
      department: "",
    })
  }

  // Handle form submission (registration logic)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === "admin") {
      // Submit as Admin
      console.log("Admin registration", formData)
    } else if (role === "encadrant") {
      // Submit as Encadrant
      console.log("Encadrant registration", formData)
    } else {
      // Submit as Etudiant
      console.log("Etudiant registration", formData)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Decorative elements */}
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
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <div className="custom-select">
                <button type="button" className="select-trigger" onClick={() => setIsSelectOpen(!isSelectOpen)}>
                  {role === "etudiant" ? "Etudiant" : role === "encadrant" ? "Encadrant" : "Admin"}
                  <span className="select-arrow">▼</span>
                </button>
                {isSelectOpen && (
                  <div className="select-content">
                    <div
                      className={`select-item ${role === "etudiant" ? "selected" : ""}`}
                      onClick={() => handleRoleChange("etudiant")}
                    >
                      Etudiant
                    </div>
                    <div
                      className={`select-item ${role === "encadrant" ? "selected" : ""}`}
                      onClick={() => handleRoleChange("encadrant")}
                    >
                      Encadrant
                    </div>
                    <div
                      className={`select-item ${role === "admin" ? "selected" : ""}`}
                      onClick={() => handleRoleChange("admin")}
                    >
                      Admin
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Display Name fields first for Admin and Encadrant */}
            {role !== "etudiant" && (
              <>
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </>
            )}

            {/* Show only for Etudiant */}
            {role === "etudiant" && (
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            )}

            {/* Password for all roles */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
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

            {/* Display additional fields based on role */}
            {role !== "etudiant" && (
              <motion.div
                className="additional-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
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

                {/* Display Department field for Encadrant only */}
                {role === "encadrant" && (
                  <div className="form-group">
                    <label htmlFor="department" className="form-label">
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                )}

                {role === "encadrant" && (
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="token" className="form-label">
                      Invitation Token
                    </label>
                    <input
                      type="text"
                      id="token"
                      name="token"
                      value={formData.token}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
