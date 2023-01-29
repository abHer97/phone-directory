import { isValidEmail } from './email';
import { isValidMobile } from './mobile';
import { isValidName } from './name';

export function isValidForm(data) {
   return isValidName(data.name) && isValidMobile(data.mobile) && isValidEmail(data.email);
}
