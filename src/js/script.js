import { state } from './state/state';
import { ui } from './ui/ui';
import { isValidForm } from './validations/form';

document.addEventListener('DOMContentLoaded', function () {
   ui.error.hide();
   const button = ui.submitButton.getElement();

   if (!button) return;

   button.onclick = function () {
      const contactData = {
         name: ui.inputName.getValue(),
         mobile: ui.inputMobile.getValue(),
         email: ui.inputEmail.getValue(),
      };

      state.setFormValues(contactData);

      if (!isValidForm(state.formValues)) {
         ui.error.show();
         return;
      }

      state.addContact(contactData);
      ui.reset();
      ui.contactsTable.render(state.contacts);
   };
});
