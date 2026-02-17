
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

// demo user (meglio in DB, ma per iniziare va bene)
const DEMO_USER = {
  username: process.env.ADMIN_USER || 'admin',
  // salva hash in env (consigliato) oppure genera al boot (qui semplice)
  passwordHash: process.env.ADMIN_PASS_HASH, // bcrypt hash
}

router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username e password obbligatori' })
  }

  if (username !== DEMO_USER.username || !DEMO_USER.passwordHash) {
    return res.status(401).json({ error: 'Credenziali non valide' })
  }

  const ok = await bcrypt.compare(password, DEMO_USER.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Credenziali non valide' })

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' })

  res.json({ token, user: { username } })
})

export default router
