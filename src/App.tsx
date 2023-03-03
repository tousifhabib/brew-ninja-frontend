import React, {useEffect, useState} from 'react';
import ContactList from './components/ContactList/ContactList';
import AddContactForm from './components/AddContactForm/AddContactForm';
import EditContactModal from './components/EditContactModal/EditContactModal';
import {IContact} from './data/contacts/types';
import {getContacts, saveContacts} from './data/contacts/storage';
import './App.css';

function App() {
    const [showAddContact, setShowAddContact] = useState(false); // State for showing/hiding AddContactForm
    const [showEditContact, setShowEditContact] = useState(false); // State for showing/hiding EditContactModal
    const [selectedContact, setSelectedContact] = useState<IContact | null>(null); // State for selected contact to edit
    const [contacts, setContacts] = useState<IContact[]>([]); // State for all contacts

    useEffect(() => {
        setContacts(getContacts()); // Fetch contacts from storage when component mounts
    }, []);

    const handleAddContact = async (newContact: IContact) => { // Function for adding a new contact
        const updatedContacts = [...contacts, newContact]; // Create a new array with the updated contacts
        setContacts(updatedContacts); // Update the contacts state with the new array
        saveContacts(updatedContacts); // Save the new array to local storage
        setShowAddContact(false); // Hide the AddContactForm
    };

    const handleUpdateContact = async (updatedContact: IContact) => { // Function for updating an existing contact
        const updatedContacts = contacts.map((contact) =>
            contact.id === updatedContact.id ? updatedContact : contact
        ); // Map through the contacts and replace the updated contact with the existing one
        setContacts(updatedContacts); // Update the contacts state with the updated array
        saveContacts(updatedContacts); // Save the updated array to local storage
        setShowEditContact(false); // Hide the EditContactModal
    };

    const handleDeleteContact = async (id: string) => { // Function for deleting a contact
        const updatedContacts = contacts.filter((contact) => contact.id !== id); // Filter out the contact with the specified ID
        setContacts(updatedContacts); // Update the contacts state with the updated array
        saveContacts(updatedContacts); // Save the updated array to local storage
    };

    const handleEditContact = (contact: IContact) => { // Function for opening the EditContactModal with the selected contact
        setSelectedContact(contact); // Update the selected contact state with the selected contact
        setShowEditContact(true); // Show the EditContactModal
    };

    useEffect(() => {
    }, [selectedContact]);

    return (
        <div className="App container">
            <h1 className="text-center">Brew Ninja Test App</h1>
            {showAddContact && (
                <AddContactForm onAddContact={handleAddContact} onCancel={() => setShowAddContact(false)}/> // Show the AddContactForm if showAddContact is true
            )}
            {showEditContact && selectedContact && (
                <EditContactModal
                    contact={selectedContact}
                    onUpdateContact={handleUpdateContact}
                    onClose={() => setShowEditContact(false)}
                /> // Show the EditContactModal with the selected contact if showEditContact is true and there is a selected contact
            )}
            {!showAddContact && (
                <div className="add-contact-button-container">
                    <button className="btn btn-primary mb-3" onClick={() => setShowAddContact(!showAddContact)}>
                        Add Contact
                    </button>
                </div>
            )}
            <ContactList
                key={contacts.length}
                contacts={contacts}
                onDeleteContact={handleDeleteContact}
                onEditContact={handleEditContact}
            />
            {/*// Render the ContactList component with the contacts, onDeleteContact, and onEditContact props*/}
        </div>
    );
}

export default App; // Export the App component as the default export of the module