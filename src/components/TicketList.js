import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

function TicketList(props) {

  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket) =>
        <Ticket
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          formattedWaitTime={ticket.formattedWaitTime}
          issue={ticket.issue}
          id={ticket.id} // Note that we also have to pass in an id prop. This is because we can't pass a key to a child component as a prop. However, our Ticket component will still need access to its own id, hence a separate id prop which is also set to ticket.id
          key={ticket.id}/>
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func

};


export default TicketList;