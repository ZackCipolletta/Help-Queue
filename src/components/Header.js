import React from "react";
import ticketsImage from "./../img/tickets.png";

function Header() {
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <img src={ticketsImage} alt="An image of tickets" />
    </React.Fragment>
  );
}

export default Header;

//Note that we didn't need to wrap our JSX code in a <React.Fragment>. This is because our component is only returning one element. If we were returning multiple elements, we'd need to use a fragment.