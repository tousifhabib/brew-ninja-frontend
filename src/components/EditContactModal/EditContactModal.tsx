import React, {FormEvent, useState} from 'react';
import {apiUpdateContact} from '../../data/contacts/api';
import {IContact} from '../../data/contacts'; // Import the interface for a contact object
import './EditContactModal.css';

interface EditContactModalProps {
    contact: IContact;
    onUpdateContact: (updatedContact: IContact) => void; // callback function for updating a contact
    onClose: () => void; // callback function for closing the modal
}

export default function EditContactModal({contact, onUpdateContact, onClose}: EditContactModalProps) {
    const [name, setName] = useState(contact.name);
    const [phone, setPhone] = useState(contact.phone || '');
    const [email, setEmail] = useState(contact.email || '');
    const [age, setAge] = useState(contact.age?.toString() || '');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Input validation
        if (!name.trim()) {
            alert('Please enter a name');
            return;
        }
        if (!/^[a-zA-Z\s-]+$/.test(name)) {
            alert('Please enter a valid name');
            return;
        }
        if (!/^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone || '')) {
            alert('Please enter a valid phone number');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email || '')) {
            alert('Please enter a valid email address');
            return;
        }
        if (typeof age !== 'string' || age.trim() === '' || Number.isNaN(Number(age)) || Number(age) < 0 || Number(age) > 150) {
            alert('Please enter a valid age');
            return;
        }

        const updatedContact: IContact = {
            ...contact, name, phone, email, age: Number(age),
        };

        try {
            await apiUpdateContact(updatedContact);
            onUpdateContact(updatedContact);
            onClose();
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (<div className="modal"> {/* Container div for the modal */}
            <div className="modal-dialog"> {/* The modal dialog */}
                <div className="modal-content"> {/* The modal content */}
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Contact</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body"> {/* The modal body */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input type="text" className="form-control" id="name" value={name}
                                       onChange={(e) => setName(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>
                                <input type="tel" className="form-control" id="phone" value={phone}
                                       onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input type="email" className="form-control" id="email" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">
                                    Age
                                </label>
                                <input
                                    type="number" className="form-control" id="age" value={age}
                                    onChange={(e) => setAge(e.target.value)}/>
                            </div>
                        </div>
                        <div className="modal-footer"> {/* The modal footer */}
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}