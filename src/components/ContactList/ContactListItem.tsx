import React from 'react';
import {IContact} from '../../data/contacts/types'; // import the interface for a contact object
import './ContactListItem.css';

export interface ContactListItemProps {
    contact: IContact;
    onDeleteContact: (id: string) => Promise<void>; // callback function for deleting a contact
    onEditContact: (contact: IContact) => void; // callback function for editing a contact
}

function ContactListItem({contact, onDeleteContact, onEditContact}: ContactListItemProps) {
    return (
        <div className="contact-list-item">
            <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">
                    <strong>Email:</strong> {contact.email}
                </p>
                <p className="card-text">
                    <strong>Phone:</strong> {contact.phone}
                </p>
                <p className="card-text">
                    <strong>Age:</strong> {contact.age}
                </p>
                <div>
                    <button className="btn btn-primary" onClick={() => onEditContact(contact)}>
                        Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => onDeleteContact(contact.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContactListItem; // Export the ContactListItem component as the default export of the module
