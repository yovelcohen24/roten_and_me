// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './HomePage';
import RoomPage from './RoomPage';
import RoomDetailsPage from './RoomDetailsPage';
import NotFoundPage from './NotFoundPage';
import AboutUsPage from './AboutUs';
import './App.css';

import LoginPage from './LoginPage';
import Dashboard from './AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App-header">
        <nav>
          <ul className="App-nav">
            <li>
              <Link to="/" className="App-link">Home</Link>
            </li>
            <li>
              <Link to="/rooms" className="App-link">Room selection</Link>
            </li>
            <li>
              <Link to="/about" className="App-link">About Us</Link>
            </li>
          </ul>
        </nav>
        </div>

        <Switch>
        <Route exact path="/" render={(props) => <HomePage {...props} />} />
          <Route exact path="/rooms" component={RoomPage} />
          <Route path="/rooms/:roomId" component={RoomDetailsPage} />
          <Route path="/about" component={AboutUsPage} /> {/* Add a route for the About Us page */}
          <Route path="/admin/login" component={LoginPage} />
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route component={NotFoundPage} />
        </Switch>
    </Router>
  );
}

export default App;
