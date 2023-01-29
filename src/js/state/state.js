export const state = {
   formValues: {
      name: '',
      mobile: '',
      email: '',
   },
   contacts: [],
   setFormValues(data) {
      if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
         Object.entries(data).forEach(([name, value]) => {
            if (typeof value === 'string' || typeof value === 'number') {
               this.formValues[name] = value;
            }
         });
      }
   },
   addContact(contact) {
      this.contacts.push(contact);
   },
   reset() {
      this.formValues = {
         name: '',
         mobile: '',
         email: '',
      };
      this.contacts = [];
   },
};
