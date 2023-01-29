const regex = /^[a-zA-Z][a-zA-Z0-9\.]{1,8}@[a-zA-Z]{2,10}\.[a-zA-Z]{2,10}$/;

export function isValidEmail(email) {
   if (typeof email !== 'string' || !regex.test(email)) return false;

   return true;
}
