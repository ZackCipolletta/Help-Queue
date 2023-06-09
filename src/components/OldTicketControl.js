// import React from "react";
// import NewTicketForm from "./NewTicketForm";
// import TicketDetail from "./TicketDetail";
// import TicketList from "./TicketList";
// import EditTicketForm from "./EditTicketForm";
// import { connect } from "react-redux";
// import Ticket from "./Ticket";
// import PropTypes from "prop-types";

// class TicketControl extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedTicket: null,
//       editing: false
//     };
//   }

//   handleClick = () => {
//     if (this.state.selectedTicket != null) {
//       this.setState({
//         selectedTicket: null,
//         editing: false
//       });
//     } else {
//       const { dispatch } = this.props;
//       const action = {
//         type: 'TOGGLE_FORM'
//       };
//       dispatch(action);
//     }
//   };

//   handleEditClick = () => {
//     console.log("handleEditClick reached!");
//     this.setState({ editing: true });
//   };

//   handleDeletingTicket = (id) => {
//     const { dispatch } = this.props;
//     const action = {
//       type: 'DELETE_TICKET',
//       id: id,
//     };
//     dispatch(action);
//     this.setState({ selectedTicket: null });
//   };

//   handleChangingSelectedTicket = (id) => {
//     const selectedTicket = this.props.mainTicketList[id];
//     this.setState({ selectedTicket: selectedTicket });
//   };

//   handleEditingTicketInList = (ticketToEdit) => {
//     const { dispatch } = this.props;
//     const { id, names, location, issue } = ticketToEdit;
//     const action = {
//       type: 'ADD_TICKET',
//       id: id,
//       names: names,
//       location: location,
//       issue: issue,
//     };
//     dispatch(action);
//     this.setState({
//       editing: false,
//       selectedTicket: null
//     });
//   };

//   handleAddingNewTicketToList = (newTicket) => {
//     const { dispatch } = this.props;
//     const { id, names, location, issue } = newTicket;
//     const action = {
//       type: 'ADD_TICKET',
//       id: id,
//       names: names,
//       location: location,
//       issue: issue,
//     };
//     dispatch(action);
//     // this.setState({ formVisibleOnPage: false });
//     // It should be clear where we will need to dispatch Redux actions — the exact same place where we previously used setState() to change our form's visibility. When refactoring an application to use Redux instead of React for state, this can be a very helpful way to see where the refactor needs to happen. We don't necessarily need to create new methods in our components. We just need to rewire the relevant methods to use Redux instead of React for state.
//     const action2 = {
//       type: 'TOGGLE_FORM'
//     };
//     dispatch(action2);
//   };

//   render() {
//     let currentlyVisibleState = null;
//     let buttonText = null;

//     if (this.state.editing) {
//       currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket}
//         onEditTicket={this.handleEditingTicketInList} />;
//       buttonText = "Return to Ticket List";
//     }
//     else if (this.state.selectedTicket != null) {
//       currentlyVisibleState =
//         <TicketDetail ticket={this.state.selectedTicket}
//           onClickingDelete={this.handleDeletingTicket}
//           onClickingEdit={this.handleEditClick} />;
//       buttonText = "Return to Ticket List";
//     }
//     else if (this.props.formVisibleOnPage) {
//       currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
//       buttonText = "Return to Ticket List";
//     } else {
//       currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
//       buttonText = "Add Ticket";
//     }
//     return (
//       <React.Fragment>
//         {currentlyVisibleState}
//         <button onClick={this.handleClick}>{buttonText}</button>
//       </React.Fragment>
//     );
//   }

// }

// TicketControl.propTypes = {
//   mainTicketList: PropTypes.object, //The mainTicketList in our Redux store is an object so we define it as that prop type.
//   formVisibleOnPage: PropTypes.bool
// };

// const mapStateToProps = state => {
//   return {
//     // Key-value pairs of state to be mapped from Redux to React component go here.
//     mainTicketList: state.mainTicketList,
//     formVisibleOnPage: state.formVisibleOnPage
//   };
// };

// TicketControl = connect(mapStateToProps)(TicketControl);

// export default TicketControl;