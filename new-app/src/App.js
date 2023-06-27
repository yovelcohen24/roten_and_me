import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './HomePage';
import RoomPage from './RoomPage';
import RoomDetailsPage from './RoomDetailsPage';
import NotFoundPage from './NotFoundPage';
import AboutUsPage from './AboutUs';
import LoginPage from './LoginPage';
import Dashboard from './AdminDashboard';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const MainLayout = ({ children }) => (
  <div className="App">
    <div className="Content">{children}</div>
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center">
        <p className="text-sm">
          Powered by Rotem, Yovel, Render and some Magi©
        </p>
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <div className="bg-gray-800">
        <nav className="p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/rooms" className="text-white hover:text-gray-300">Room selection</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-gray-300">About Us</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route exact path="/" render={(props) => (
          <MainLayout>
            <HomePage {...props} />
          </MainLayout>
        )} />
        <Route exact path="/rooms" render={() => (
          <MainLayout>
            <RoomPage />
          </MainLayout>
        )} />
        <Route path="/rooms/:roomId" render={(props) => (
          <MainLayout>
            <RoomDetailsPage {...props} />
          </MainLayout>
        )} />
        <Route path="/about" render={() => (
          <MainLayout>
            <AboutUsPage />
          </MainLayout>
        )} />
        <Route path="/admin/login" render={() => (
          <MainLayout>
            <LoginPage />
          </MainLayout>
        )} />
        <Route path="/admin/dashboard" render={() => (
          <MainLayout>
            <Dashboard />
          </MainLayout>
        )} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
