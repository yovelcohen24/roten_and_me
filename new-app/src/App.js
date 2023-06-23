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
           <Route exact path="/" render={(props) => <HomePage {...props} />} />
           <Route exact path="/rooms" component={RoomPage} />
           <Route path="/rooms/:roomId" component={RoomDetailsPage} />
           <Route path="/about" component={AboutUsPage} />
           <Route path="/admin/login" component={LoginPage} />
           <Route path="/admin/dashboard" component={Dashboard} />
           <Route component={NotFoundPage} />
         </Switch>
       </Router>
     );
   }

   export default App;
