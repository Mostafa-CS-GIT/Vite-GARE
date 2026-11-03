import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  '/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
})

let authToken = null

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

export default api

export function setAuthToken(token) {
  authToken = token || null
}

export async function register(credentials) {
  const { data } = await api.post('/auth/register', credentials)
  return data
}

export async function login(credentials) {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

export async function createUser(user) {
  const { data } = await api.post('/auth/create-user', user)
  return data
}

export async function getUsers() {
  const { data } = await api.get('/auth/users')
  return data
}

export async function uploadImages(formData) {
  const { data } = await api.post('/images/upload', formData)
  return data
}

export async function createProject(project) {
  const { data } = await api.post('/projects/create', project)
  return data
}

export async function getProjects(params) {
  const { data } = await api.get('/projects/all-projects', { params })
  return data
}

export async function getProjectById(id) {
  const { data } = await api.get(`/projects/${id}`)
  return data
}

export async function updateProject(id, project) {
  const { data } = await api.patch(`/projects/${id}`, project)
  return data
}

export async function deleteProject(id) {
  const { data } = await api.delete(`/projects/${id}`)
  return data
}

export async function createDeveloper(developer) {
  const { data } = await api.post('/developer/create-developer', developer)
  return data
}

export async function getDevelopers() {
  const { data } = await api.get('/developer')
  return data
}

export async function getDeveloperById(id) {
  const { data } = await api.get(`/developer/${id}`)
  return data
}

export async function updateDeveloper(id, developer) {
  const { data } = await api.patch(`/developer/${id}`, developer)
  return data
}

export async function deleteDeveloper(id) {
  const { data } = await api.delete(`/developer/${id}`)
  return data
}

export async function createZone(zone) {
  const { data } = await api.post('/zone', zone)
  return data
}

export async function getZones() {
  const { data } = await api.get('/zone')
  return data
}

export async function getZoneById(id) {
  const { data } = await api.get(`/zone/${id}`)
  return data
}

export async function updateZone(id, zone) {
  const { data } = await api.patch(`/zone/${id}`, zone)
  return data
}

export async function deleteZone(id) {
  const { data } = await api.delete(`/zone/${id}`)
  return data
}

export async function createUnit(unit) {
  const { data } = await api.post('/unit/create', unit)
  return data
}

export async function getUnits(params) {
  const { data } = await api.get('/unit', { params })
  return data
}

export async function getUnitById(id) {
  const { data } = await api.get(`/unit/${id}`)
  return data
}

export async function updateUnit(id, unit) {
  const { data } = await api.patch(`/unit/${id}`, unit)
  return data
}

export async function deleteUnit(id) {
  const { data } = await api.delete(`/unit/${id}`)
  return data
}

export async function sendContactMessage(message) {
  const { data } = await api.post('/contactus', message)
  return data
}
