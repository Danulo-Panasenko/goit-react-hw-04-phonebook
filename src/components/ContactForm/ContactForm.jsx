import { useState, useEffect } from 'react';
import css from 'components/ContactForm/ContactForm.module.css';
import { nanoid } from 'nanoid';

import ContactList from 'components/Contact/Contact';
import Filter from 'components/Filter/Filter';
import Form from 'components/Form/Form';

const ContactForm = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
    return true;
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  const handleChange = ({ target }) => setFilter(target.value);
  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  };
  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.style}>
      <h4>Phonebook</h4>
      <div className={css.wrapper}>
        <div className={css.block}>
          <Form onSubmit={addContact} />
        </div>
        <div>
          <h4>Contacts</h4>
          <Filter value={filter} handleChange={handleChange} />
          <ContactList
            removeContact={removeContact}
            contacts={filteredContacts}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
// class ContactForm extends Component {
//   state = {
//     contacts: [...contacts],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('contacts'));
//     if (contacts?.length) {
//       this.setState({ contacts });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (prevState.contacts.length !== contacts.length) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }

//   removeContact = id => {
//     this.setState(({ contacts }) => {
//       const newContacts = contacts.filter(contact => contact.id !== id);
//       return { contacts: newContacts };
//     });
//   };
//   addContact = ({ name, number }) => {
//     if (this.isDublicate(name)) {
//       return alert(`${name} is already in contacts`);
//     }
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(prevState => {
//       return {
//         contacts: [newContact, ...prevState.contacts],
//       };
//     });
//   };
//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({ [name]: value });
//   };

//   isDublicate(name) {
//     const normalizedName = name.toLowerCase();
//     const { contacts } = this.state;
//     const result = contacts.find(({ name }) => {
//       return name.toLowerCase() === normalizedName;
//     });
//     return Boolean(result);
//   }
//   getFilteredContacts() {
//     const { filter, contacts } = this.state;
//     if (!filter) {
//       return contacts;
//     }
//     const normalizedFilter = filter.toLowerCase();
//     const result = contacts.filter(({ name }) => {
//       return name.toLowerCase().includes(normalizedFilter);
//     });
//     return result;
//   }
//   render() {
//     const { addContact, handleChange, removeContact } = this;
//     const contacts = this.getFilteredContacts();

//     return (
//       <div className={css.style}>
//         <h4>Phonebook</h4>
//         <div className={css.wrapper}>
//           <div className={css.block}>
//             <Form onSubmit={addContact}></Form>
//           </div>
//           <div>
//             <h4>Contacts</h4>
//             <Filter handleChange={handleChange}></Filter>
//             <ContactList
//               removeContact={removeContact}
//               contacts={contacts}
//             ></ContactList>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default ContactForm;
