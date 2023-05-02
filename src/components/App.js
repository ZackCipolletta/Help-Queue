import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>{/* we wrap all the content in our return statement inside a <Router> component. Now all of App's children will have this functionality as well. */}
      <Header /> {/* Our Header component should show regardless so that comes next — and is outside of the <Routes> component where our application's routing will be determined. */}
      <Routes> 
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<TicketControl />} />
      </Routes> {/* Think of the <Routes> component as being like a conditional — it will render only one of the routes contained inside the <Routes> component. (It's also possible that a route won't be rendered at all if no URL matches it.) If we don't include the <Routes> component, multiple routes could be rendered. Sometimes we might actually want that, but in the case of our application, we only want the sign in page or the queue to be rendered. */}
    </Router>
  );
  // we'll want to route between the SignIn component and the TicketControl component anyway, so most of our router functionality will be in App, which is just above TicketControl in our component tree.
}

export default App;