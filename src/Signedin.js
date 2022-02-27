import React, { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signedin() {
  const [error, setError] = useState("")
  const { logout } = useAuth()
  const go_to = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      go_to("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
            <h2 className="text-center mb-3">SIGN IN TEST</h2>
            {error && <Alert variant = "danger">{error}</Alert>}

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant = "link" onClick={handleLogout}> Log Out </Button>
      </div>
    </>
  )
}
