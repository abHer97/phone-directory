function newContactChild(data) {
   const row = document.createElement('tr');
   const cellName = document.createElement('td');
   const cellMobile = document.createElement('td');
   const cellEmail = document.createElement('td');

   cellName.innerHTML = data.name;
   cellMobile.innerHTML = data.mobile;
   cellEmail.innerHTML = data.email;

   row.appendChild(cellName);
   row.appendChild(cellMobile);
   row.appendChild(cellEmail);

   return row;
}

export const ui = {
   error: {
      getElement() {
         return document.getElementById('error');
      },
      show() {
         const el = ui.error.getElement();

         if (el) el.style.display = 'block';
      },
      hide() {
         const el = ui.error.getElement();

         if (el) el.style.display = 'none';
      },
   },
   inputName: {
      getElement() {
         return document.getElementById('name');
      },
      reset() {
         const el = ui.inputName.getElement();

         if (el) el.value = '';
      },
      getValue() {
         const el = ui.inputName.getElement();

         if (el) return el.value;
      },
   },
   inputMobile: {
      getElement() {
         return document.getElementById('mobile');
      },
      reset() {
         const el = ui.inputMobile.getElement();

         if (el) el.value = '';
      },
      getValue() {
         const el = ui.inputMobile.getElement();

         if (el) return el.value;
      },
   },
   inputEmail: {
      getElement() {
         return document.getElementById('email');
      },
      reset() {
         const el = ui.inputEmail.getElement();

         if (el) el.value = '';
      },
      getValue() {
         const el = ui.inputEmail.getElement();

         if (el) return el.value;
      },
   },
   submitButton: {
      getElement() {
         return document.getElementById('submit');
      },
   },
   contactsTable: {
      getElement() {
         return document.getElementById('summaryTable').getElementsByTagName('tbody')[0];
      },
      render(contacts) {
         const table = ui.contactsTable.getElement();

         if (!Array.isArray(contacts) || !table) return;

         table.innerHTML = '';

         contacts.forEach((contact) => {
            const row = newContactChild(contact);

            table.appendChild(row);
         });
      },
   },
   reset() {
      ui.error.hide();
      ui.inputName.reset();
      ui.inputMobile.reset();
      ui.inputEmail.reset();
   },
};
