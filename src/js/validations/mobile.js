const regex = /^[0-9]+$/;
const MAX_CHARACTERS = 10;

export function isValidMobile(mobile) {
   if (Number.isNaN(Number(mobile))) return false;

   if (!regex.test(mobile)) return false;

   if (String(mobile).length > MAX_CHARACTERS) return false;

   return true;
}
