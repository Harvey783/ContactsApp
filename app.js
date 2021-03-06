class Contact {
  constructor(name, company, phone) {
    this.name = name;
    this.company = company;
    this.phone = phone;
  }
}

class UI {
  static displayContacts() {
    const contacts = Store.getContacts();
    contacts.forEach(contact => UI.addContactToList(contact));
  }

  static addContactToList(contact) {
    const list = document.querySelector("#contact-list");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.company}</td>
      <td>${contact.phone}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
    list.appendChild(row);
  }

  static deleteContact(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#contact-form");
    container.insertBefore(div, form);
    // Lasts three seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  // Clear fields after submit
  static clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#company").value = "";
    document.querySelector("#phone").value = "";
  }
}

class Store {
  static getContacts() {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    return contacts;
  }

  static addContact(contact) {
    const contacts = Store.getContacts();
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  static removeContact(phone) {
    const contacts = Store.getContacts();

    contacts.forEach((contact, index) => {
      if (contact.phone === phone) {
        contacts.splice(index, 1);
      }
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}

// Display contacts
document.addEventListener("DOMContentLoaded", UI.displayContacts);
// Add a contact
document.querySelector("#contact-form").addEventListener("submit", e => {
  // Prevent submit action
  e.preventDefault();
  // Get form values
  const name = document.querySelector("#name").value;
  const company = document.querySelector("#company").value;
  const phone = document.querySelector("#phone").value;

  //Validate
  if (name === "" || company === "" || phone === "") {
    UI.showAlert("Fill in all fields", "danger");
  } else {
    //Instantiate a contact
    const contact = new Contact(name, company, phone);
    // Add contact to UI
    UI.addContactToList(contact);
    // Add contact to store
    Store.addContact(contact);
    // Success message
    UI.showAlert("Contact Added", "success");
    // Clear fields
    UI.clearFields();
  }
});

// Delete contact event listener
document.querySelector("#contact-list").addEventListener("click", e => {
  // Remove from UI
  UI.deleteContact(e.target);
  // Remove from store
  Store.removeContact(
    e.target.parentElement.previousElementSibling.textContent
  );
});
