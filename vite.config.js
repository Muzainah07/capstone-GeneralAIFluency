import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function assistantApiDevPlugin() {
  return {
    name: 'assistant-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          let parsedBody = {}
          try {
            parsedBody = JSON.parse(body || '{}')
          } catch {
            parsedBody = {}
          }

          const request = {
            method: req.method,
            body: parsedBody,
            headers: req.headers,
          }

          const response = {
            statusCode: 200,
            status(code) {
              this.statusCode = code
              return this
            },
            setHeader(name, value) {
              res.setHeader(name, value)
            },
            json(payload) {
              res.statusCode = this.statusCode
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(payload))
            },
            send(payload) {
              res.statusCode = this.statusCode
              res.setHeader('Content-Type', 'application/json')
              res.end(typeof payload === 'string' ? payload : JSON.stringify(payload))
            },
          }

          try {
            const { default: handler } = await import('./api/chat.js')
            await handler(request, response)
          } catch (error) {
            console.error('[assistant-dev] Failed to run local chat handler', error)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Assistant request failed', details: error.message || 'Unexpected server error' }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), assistantApiDevPlugin()],
})
