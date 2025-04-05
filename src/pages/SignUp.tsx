"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardHeader } from "./ui/card"

export default function SignUp() {
  const [role, setRole] = useState("etudiant") // Default role is 'etudiant'
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    token: "", // Token for Encadrant
  })

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
    setFormData({
      // Reset form fields when role changes
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      token: "",
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-white p-4">
      <Card className="relative w-full max-w-md overflow-hidden border-sky-200 shadow-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-sky-400" />
        <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-sky-100 opacity-50" />
        <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-sky-100 opacity-50" />
        <div className="absolute top-20 -left-4 w-8 h-8 rounded-full bg-sky-200 opacity-30" />
        <div className="absolute bottom-20 -right-4 w-10 h-10 rounded-full bg-sky-200 opacity-30" />

        <CardHeader className="pb-2">
          <motion.h2
            className="text-3xl font-bold text-sky-700 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sign Up
          </motion.h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sky-700">
                Role
              </Label>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full border-sky-200 bg-sky-50 focus:ring-sky-300 focus:border-sky-400">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="etudiant">Etudiant</SelectItem>
                  <SelectItem value="encadrant">Encadrant</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sky-700">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border-sky-200 bg-sky-50 focus:ring-sky-300 focus:border-sky-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sky-700">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border-sky-200 bg-sky-50 focus:ring-sky-300 focus:border-sky-400"
                required
              />
            </div>

            {/* Display additional fields based on role */}
            {role !== "etudiant" && (
              <motion.div
                className="space-y-4 pt-3 border-t border-sky-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sky-700">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border-sky-200 bg-sky-50 focus:ring-sky-300 focus:border-sky-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sky-700">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border-sky-200 bg-sky-50 focus:ring-sky-300 focus:border-sky-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sky-700">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-sky-200 bg-sky-50 focus:ring-sky-300 focus:border-sky-400"
                    required
                  />
                </div>

                {role === "encadrant" && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="token" className="text-sky-700">
                      Invitation Token
                    </Label>
                    <Input
                      type="text"
                      id="token"
                      name="token"
                      value={formData.token}
                      onChange={handleChange}
                      className="border-sky-200 bg-sky-50 focus:ring-sky-300 focus:border-sky-400"
                      required
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-6 mt-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

