class Contact {
  constructor(name, company, phone) {
    this.name = name;
    this.company = company;
    this.phone = phone;
  }
}

class UI {
  static displayContacts() {
    const StoredContacts = [
      {
        name: "Jack Ryan",
        company: "CIA",
        phone: "867-5309"
      },
      {
        name: "Sharon Harvey",
        company: "Conner & Webber",
        phone: "610-613-8734"
      }
    ];
    const contacts = StoredContacts;

    contacts.forEach(contact => UI.addContactToList(contact));
  }

  static addContactToList(contact) {
    const list = document.querySelector("#list-app-table");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.company}</td>
      <td>${contact.phone}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
    list.appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded", UI.displayContacts);
