// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './HomePage';
import RoomPage from './RoomPage';
import RoomDetailsPage from './RoomDetailsPage';
import NotFoundPage from './NotFoundPage';
import AboutUsPage from './AboutUs'; // Import the AboutUsPage component

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rooms">Room selection</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link> {/* Add a link to the About Us page */}
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/rooms" component={RoomPage} />
          <Route path="/rooms/:roomId" component={RoomDetailsPage} />
          <Route path="/about" component={AboutUsPage} /> {/* Add a route for the About Us page */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
