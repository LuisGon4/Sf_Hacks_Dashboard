// purpose: admin dashboard for sublinks within GreenSense Application
import { Link } from 'react-router-dom'

export function AdminPage(){
    return (
      <main>
          <h1>Admin Dashboard</h1>
          <h2>Sublinks for GreenSense App</h2>
          <nav>
              <Link to="/greensense-dashboard">GreenSense Client Dashboard</Link>
          </nav>


      </main>
    );
}