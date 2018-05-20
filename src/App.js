import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './components/ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './components/CreateContact';

class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount = () => {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts });
    })
  }
  
  removeContact = (contact) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((c) => c.id !== contact.id)
    }))
    ContactsAPI.remove(contact);
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}/>
        <Route path="/create" component={CreateContact}/>
      </div>  
    )
  }
}

export default App;
