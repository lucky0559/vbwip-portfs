/* global Buffer, process */

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createContactHandler } from './api/contact.js'

function contactApiPlugin(env) {
  const contactHandler = createContactHandler(env)

  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        const chunks = []

        for await (const chunk of req) {
          chunks.push(chunk)
        }

        req.body = Buffer.concat(chunks).toString('utf8')

        const response = {
          setHeader(name, value) {
            res.setHeader(name, value)
          },
          status(code) {
            res.statusCode = code
            return this
          },
          json(payload) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(payload))
            return this
          },
        }

        try {
          await contactHandler(req, response)
        } catch (error) {
          console.error('Local contact endpoint failed', error)
          if (!res.writableEnded) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'The contact endpoint failed.' }))
          }
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }

  return {
    plugins: [
      react(),
      tailwindcss(),
      contactApiPlugin(env),
    ],
  }
})
