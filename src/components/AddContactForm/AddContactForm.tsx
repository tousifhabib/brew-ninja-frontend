import React, {FormEvent, useState} from 'react';
import {apiAddContact} from '../../data/contacts/api';
import {generateUUID} from '../../util/guid';
import {IContact} from '../../data/contacts';
import FormInput from './FormInput';
import './AddContactForm.css';

function AddContactForm({
                            onAddContact, // callback function for adding a new contact
                            onCancel, // callback function for canceling the form
                        }: {
    onAddContact: (newContact: IContact) => void;
    onCancel: () => void;
}) {
    const [formData, setFormData] = useState<IContact>({
        id: '',
        name: '',
        phone: '',
        email: '',
        age: 0,
    }); // Initialize the form data state with empty strings and 0 for age

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: id === 'age' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, phone, email, age} = formData;

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
        if (typeof age !== 'number' || age < 0 || age > 150) {
            alert('Please enter a valid age');
            return;
        }

        const newContact: IContact = {...formData, id: generateUUID()};

        try {
            await apiAddContact(newContact);
            onAddContact(newContact);
            setFormData({id: '', name: '', phone: '', email: '', age: 0});
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <form className="add-contact-form" onSubmit={handleSubmit}>
            <div className="add-contact-form-header">
                <h2>Add Contact</h2>
            </div>
            <FormInput label="Name" type="text" id="name" value={formData.name} onChange={handleChange} required/>
            <FormInput label="Phone" type="tel" id="phone" value={formData.phone} onChange={handleChange} required/>
            <FormInput label="Email" type="email" id="email" value={formData.email} onChange={handleChange} required/>
            <FormInput label="Age" type="number" id="age" value={formData.age} onChange={handleChange} required/>
            <div className="add-contact-form-buttons-container text-center">
                <button type="submit" className="btn btn-primary add-contact-form-submit-button">
                    Add Contact
                </button>
                <button type="button" className="btn btn-secondary add-contact-form-cancel-button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default AddContactForm; // Export the AddContactForm component as the default export of the module