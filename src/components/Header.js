import React from "react";
import ticketsImage from "./../img/tickets.png";
import { Link } from "react-router-dom";


function Header() {
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
          </li>

          <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        <img src={ticketsImage} className="img-fluid max-width-50" alt="An image of tickets" />
      </ul>
    </React.Fragment>
  );
}

export default Header;

//Note that we didn't need to wrap our JSX code in a <React.Fragment>. This is because our component is only returning one element. If we were returning multiple elements, we'd need to use a fragment.