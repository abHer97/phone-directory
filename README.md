# Javascript: Phone Directory
Complete a partially completed JavaScript rectangles application. Complete the application as shown below in order to pass all the unit tests.

## Environment

- Node Version: 12(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/5E9SKuOCubXLH0_9OZOq4A/phone-directory.gif)

The component should perform the following validations in the form:



The name input field should pass following validations. In case of error, the `Invalid Input!` message should be shown in <div id="error" data-testid="error"></div>.
The field is required.
It should contain only Alphabets and Space.
It should be less than or equal to 20 characters in length.
The mobile input field should pass following validations. In case of error, the `Invalid Input!` message should be shown in <div id="error" data-testid="error"></div>.
The field is required.
It should contain only Numbers.
It should be equal to 10 characters in length.
The email input field should pass following validations. In case of error, the `Invalid Input!` message should be shown in <div id="error" data-testid="error"></div>.
The field is required.
A valid email address should have the following rules:

It should start with a letter and can contain combinations of only letters, digits, and dots until it reaches the symbol @.
It can have 2 to 10 characters before the symbol @.
After the symbol @, it should contain 2 to 20 alphabetic characters before encountering the dot symbol (.).
After the (.) dot symbol, it should contain 2 to 10 alphabetic characters.
Eg: john.doe3@gmail.com is a valid email address.
If the submit button is clicked and any of the above-mentioned validations fail, show the alert box <div id="error" data-testid="error"></div>.
When the submit button is clicked and all the validations pass,
Hide the alert error box if visible
Reset the form data by clearing the inputs for the name, email, and mobile.
Add the new contact to the table.
The list of contacts in the table should be displayed in the order it is added. 
Note: In order to show/hide the alert error box, use the display: none and display: block attribute only. The test cases rely on this fact.


The following data-test-id attributes are required in the component for the tests to pass:

The name input: 'name'
The email input: 'email'
The mobile input: 'mobile'
The submit button: 'submit'
The div containing the error message: 'error'


Please note that the component has the above data-test-id attributes for test cases and certain classes and ids for rendering and manipulation purposes. They should not be changed.

## Project Specifications

**Read Only Files**
- `test/*`

**Commands**
- run:
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install:
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test:
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
