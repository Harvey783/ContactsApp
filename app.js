class Contact {
  constructor(name, company, phone) {
    this.name = name;
    this.company = company;
    this.phone = phone;
  }
}

class UI {
  static displayContacts() {
    const StoreDContacts = [
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
    const contacts = StoreDContacts;

    contacts.forEach(contact => UI.addContactToList());
  }
}
