import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { units, zones, developers } from './local-data.js'
import openApiSpec from './openapi.js'

const app = express()
const port = Number(process.env.PORT) || 4000
const apiPrefix = '/api/v1'

app.use(express.json())

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get(`${apiPrefix}/zone`, (_request, response) => {
  response.json(zones)
})

app.get(`${apiPrefix}/zone/:id`, (request, response) => {
  const zone = zones.find((item) => item.id === request.params.id)
  if (!zone) return response.status(404).json({ error: 'Zone not found' })
  response.json(zone)
})

app.get(`${apiPrefix}/unit`, (_request, response) => {
  response.json(units)
})

app.get(`${apiPrefix}/unit/:id`, (request, response) => {
  const unit = units.find((item) => item.id === request.params.id)
  if (!unit) return response.status(404).json({ error: 'Unit not found' })
  response.json(unit)
})

app.get(`${apiPrefix}/developer`, (_request, response) => {
  response.json(developers)
})

app.get(`${apiPrefix}/developer/:id`, (request, response) => {
  const developer = developers.find((item) => item.id === request.params.id)
  if (!developer) return response.status(404).json({ error: 'Developer not found' })
  response.json(developer)
})

const handleContact = (request, response) => {
  const { name, email, message, phone } = request.body ?? {}

  if (!name || !email || !message) {
    return response.status(400).json({ message: 'All fields are required' })
  }

  console.log('Contact submission:', { name, email, phone, message })

  response.status(200).json({
    message: 'Message sent successfully',
  })
}

app.post(`${apiPrefix}/contactus`, handleContact)
app.post(`${apiPrefix}/contact`, handleContact)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))

app.get('/', (_request, response) => {
  response.json({
    service: 'real-estate-api',
    status: 'ok',
    api: apiPrefix,
    documentation: '/api-docs/',
  })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API server listening at http://localhost:${port}`)
  console.log(`Swagger UI available at http://localhost:${port}/api-docs/`)
})
