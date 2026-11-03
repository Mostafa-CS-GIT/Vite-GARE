import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import Home from '../pages/Home/Home.jsx'
import Zones from '../pages/Zones/Zones.jsx'
import ZoneDetail from '../pages/Zones/ZoneDetail.jsx'
import Units from '../pages/Units/Units.jsx'
import UnitDetails from '../pages/Units/UnitDetails.jsx'
import Developer from '../pages/Developers/Developer.jsx'
import DeveloperDetails from '../pages/Developers/DeveloperDetails.jsx'
import ContactUs from '../pages/Contact/ContactUs.jsx'
import './index.css'

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-900">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="units" element={<Units />} />
            <Route path="units/:id" element={<UnitDetails />} />
            <Route path="zones" element={<Zones />} />
            <Route path="zones/:id" element={<ZoneDetail />} />
            <Route path="developers" element={<Developer />} />
            <Route path="developers/:id" element={<DeveloperDetails />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="inventories" element={<Navigate to="/units" replace />} />
            <Route path="contact-us" element={<Navigate to="/contact" replace />} />
            {/* Redirect removed pages to home */}
            <Route path="about" element={<Navigate to="/" replace />} />
            <Route path="services" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
