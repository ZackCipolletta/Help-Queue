import React, { useEffect, useState } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketDetail from "./TicketDetail";
import TicketList from "./TicketList";
import EditTicketForm from "./EditTicketForm";
import { db, auth } from "../firebase"; // Now, we're exporting an object with two variables inside of it. With this change, the db variable is no longer a default export. Instead, both db and auth are now called named exports. This means that when we import these variables in other files, the names of the imports need to exactly match the names of the exported variables. So, our very next step needs to be updating the import statement for db in TicketControl.js to destructure the db variable from the object we exported from firebase.js:
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";


function TicketControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot( // the side effect that we run is creating the onSnapshot() listener that listens to changes in our db.
      // The onSnapshot() function takes three arguments:
      // 1. A document or collection reference that we want our listener to listen to.
      // 2. A callback function to handle a successful request. This function will be called the first time that we set up our listener, and anytime there's a change to the tickets collection.
      // 3. A callback function to handle errors that happen when making a database request.
      collection(db, "tickets"), // First note that we can set up a database listener to listen for changes on a document, a set of documents, or an entire collection. In our case, we're listening for changes to the tickets collection.
      (collectionSnapshot) => {
        const tickets = [];
        collectionSnapshot.forEach((doc) => {
          tickets.push({
            names: doc.data().names,
            location: doc.data().location,
            issue: doc.data().issue,
            id: doc.id
          });
        });
        setMainTicketList(tickets);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe(); // we return a cleanup function for the useEffect() hook to run. useEffect() will call this function when the TicketControl component unmounts and it will unsubscribe (or stop) our db listener.
    // The onSnapshot() function returns a function that we can call at any point to stop the listener. We save this returned function in a variable called unSubscribe. We could call this variable anything, like stop or clearListener.
  }, []); // We pass in an empty array as the second arg, which means our effect will only run once after the components first render. We do this because we only want to create the Firestore database listener once.

  const handleClick = () => {
    if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      setSelectedTicket(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleDeletingTicket = async (id) => {
    await deleteDoc(doc(db, "tickets", id));
    setSelectedTicket(null);
  };

  const handleEditingTicketInList = async (ticketToEdit) => {
    const ticketRef = doc(db, "tickets", ticketToEdit.id);
    await updateDoc(ticketRef, ticketToEdit);
    setEditing(false);
    setSelectedTicket(null);
  };

  const handleAddingNewTicketToList = async (newTicketData) => {
    await addDoc(collection(db, "tickets"), newTicketData);
    setFormVisibleOnPage(false);
  };

  const handleChangingSelectedTicket = (id) => {
    const selection = mainTicketList.filter(ticket => ticket.id === id)[0];
    // updated variable name to 'selection'
    // so there's no clash with the state variable 'selectedTicket'
    setSelectedTicket(selection);
  };

  let currentlyVisibleState = null;
  let buttonText = null;

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the queue.</h1>
      </React.Fragment>
    );
  } else if (auth.currentUser != null) {
  
    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>;
    }
    else if (editing) {
      currentlyVisibleState =
        <EditTicketForm
          ticket={selectedTicket}
          onEditTicket={handleEditingTicketInList} />;
      buttonText = "Return to Ticket List";
    }
    else if (selectedTicket != null) {
      currentlyVisibleState =
        <TicketDetail
          ticket={selectedTicket}
          onClickingDelete={handleDeletingTicket}
          onClickingEdit={handleEditClick} />;
      buttonText = "Return to Ticket List";
    }
    else if (formVisibleOnPage) {
      currentlyVisibleState =
        <NewTicketForm
          onNewTicketCreation={handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState =
        <TicketList
          onTicketSelection={handleChangingSelectedTicket}
          ticketList={mainTicketList} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>}
      </React.Fragment>
    );
  }
}

export default TicketControl;