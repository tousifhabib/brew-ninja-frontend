import React from 'react';
import {IContact} from '../../data/contacts/types';
import ContactListItem from './ContactListItem';
import './ContactList.css';

export interface ContactListProps {
    contacts: IContact[];
    onDeleteContact: (id: string) => Promise<void>;
    onEditContact: (contact: IContact) => void;
}

function ContactList({contacts, onDeleteContact, onEditContact}: ContactListProps) {
    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name)); // Sort contacts by name
    return (
        <div className="contact-list">
            {sortedContacts.map(contact => (
                <ContactListItem
                    key={contact.id}
                    contact={contact}
                    onDeleteContact={onDeleteContact}
                    onEditContact={onEditContact}
                />
            ))}
        </div>
    );
}

export default ContactList;
