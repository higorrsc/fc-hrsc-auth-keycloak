import crypto from 'crypto'
import express from 'express'
import session from 'express-session'
import jwt from 'jsonwebtoken'

const app = express()

const memoryStore = new session.MemoryStore()

app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    store: memoryStore
    //expires
  })
)

const middlewareIsAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //@ts-expect-error - type mismatch
  if (!req.session.user) {
    return res.redirect('/login')
  }
  next()
}

app.get('/login', (req, res) => {
  const nonce = crypto.randomBytes(16).toString('base64')
  const state = crypto.randomBytes(16).toString('base64')

  //@ts-expect-error - type mismatch
  req.session.nonce = nonce
  //@ts-expect-error - type mismatch
  req.session.state = state
  req.session.save()

  // valor aleatório - sessão de usuário
  const loginParams = new URLSearchParams({
    client_id: 'fullcycle-client',
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid',
    nonce,
    state
  })

  const url = `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginParams.toString()}`
  res.redirect(url)
})

app.get('/logout', (req, res) => {
  const logoutParams = new URLSearchParams({
    //client_id: "fullcycle-client",
    //@ts-expect-error
    id_token_hint: req.session.id_token,
    post_logout_redirect_uri: 'http://localhost:3000/login'
  })

  req.session.destroy((err) => {
    console.error(err)
  })

  const url = `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/logout?${logoutParams.toString()}`
  res.redirect(url)
})

//@ts-expect-error - type mismatch
app.get('/callback', async (req, res) => {
  //@ts-expect-error - type mismatch
  if (req.session.user) {
    return res.redirect('/admin')
  }

  //@ts-expect-error - type mismatch
  if (req.query.state !== req.session.state) {
    return res.status(401).json({ message: 'Unauthenticated' })
  }

  const bodyParams = new URLSearchParams({
    client_id: 'fullcycle-client',
    grant_type: 'authorization_code',
    code: req.query.code as string,
    redirect_uri: 'http://localhost:3000/callback'
  })

  const url = `http://host.docker.internal:8080/realms/fullcycle-realm/protocol/openid-connect/token`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyParams.toString()
  })

  const result = await response.json()

  const payloadAccessToken = jwt.decode(result.access_token) as any
  const payloadRefreshToken = jwt.decode(result.refresh_token) as any
  const payloadIdToken = jwt.decode(result.id_token) as any

  if (
    //@ts-expect-error - type mismatch
    payloadIdToken!.nonce !== req.session.nonce
  ) {
    return res.status(401).json({ message: 'Unauthenticated' })
  }

  //@ts-expect-error - type mismatch
  req.session.user = payloadAccessToken
  //@ts-expect-error - type mismatch
  req.session.access_token = payloadRefreshToken
  //@ts-expect-error - type mismatch
  req.session.id_token = payloadIdToken
  req.session.save()
  res.json(result)
})

app.get('/admin', middlewareIsAuth, (req, res) => {
  //@ts-expect-error - type mismatch
  res.json(req.session.user)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
