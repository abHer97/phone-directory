const regex = /^[a-zA-Z\s]+$/;

const MAX_CHARACTERS = 20;

export function isValidName(name) {
   if (typeof name !== 'string' || name === '') return false;

   if (!regex.test(name)) return false;

   if (name.length > MAX_CHARACTERS) return false;

   return true;
}
