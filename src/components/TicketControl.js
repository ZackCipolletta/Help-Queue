import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      formVisibleOnPage: false
    };
  }

  handleClick = () => {
    if (this.state.questionNumber <= 3) {
      this.setState(prevState => ({
        questionNumber: prevState.questionNumber + 1,
      }));
    } else {
      this.setState(prevState => ({
        questionNumber: 0,
      }));
    }
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null; // new code
    if (this.state.questionNumber === 1) {
      currentlyVisibleState = <Question1 />
      buttonText = "Yes";
    } else if (this.state.questionNumber === 2) {
      currentlyVisibleState = <Question2 />
      buttonText = "Yes";
    } else if (this.state.questionNumber === 3) {
      currentlyVisibleState = <Question3 />
      buttonText = "Yes";
    } else if (this.state.questionNumber === 4) {
      currentlyVisibleState = <NewTicketForm />;
      buttonText = "Return to Ticket List"; // new code
    } else {
      currentlyVisibleState = <TicketList />;
      buttonText = "Add Ticket"; // new code
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> { /* new code */}
      </React.Fragment>
    );
  }

}

export default TicketControl;