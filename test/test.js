import {fireEvent, getByTestId} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import jsdom, {JSDOM} from 'jsdom'
import path from 'path'

const BASE = path.resolve(__dirname, '../src');

let virtualConsole
let dom
let container

const loadDom = (dom) => {
    return new Promise((resolve, _) => {
        virtualConsole.on("log", log => {
            if (log === "DOM Loaded") resolve(dom)
        })
    })
}

const getComputedStyle = (node) => {
    return dom.window.getComputedStyle(node, null)
}


describe('Phone Directory', () => {
    let nameInput
    let emailInput
    let mobileInput
    let submitBtn
    let errorBox
    let table

    const IDMAPS = {
        NAME_INPUT: 'name',
        EMAIL_INPUT: 'email',
        MOBILE_INPUT: 'mobile',
        SUBMIT_BTN: 'submit',
        ALERT_BOX: 'error',
        TABLE: 'summaryTable'
    }

    const addInput = (input, text) => {
        fireEvent.input(input, {
            target: {value: text}
        })
        fireEvent.change(input, {
            target: {value: text}
        })
    }

    beforeEach(async () => {
        virtualConsole = new jsdom.VirtualConsole();
        dom = await JSDOM.fromFile(BASE + '/index.html', {
            runScripts: 'dangerously',
            resources: 'usable',
            pretendToBeVisual: true,
            virtualConsole
        })
        await loadDom(dom)
        container = dom.window.document.body;
        nameInput = getByTestId(container, IDMAPS.NAME_INPUT);
        emailInput = getByTestId(container, IDMAPS.EMAIL_INPUT);
        mobileInput = getByTestId(container, IDMAPS.MOBILE_INPUT);
        submitBtn = getByTestId(container, IDMAPS.SUBMIT_BTN);
        errorBox = getByTestId(container, IDMAPS.ALERT_BOX);
        table = getByTestId(container, IDMAPS.TABLE);
    })

    const getTableBody = () => table.getElementsByTagName('tbody')[0];


    it('should show error when input fields are empty', () => {
        let computed1 = getComputedStyle(errorBox);
        expect(computed1.getPropertyValue('display')).toEqual('none');
        fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('block');
        expect(getTableBody().children.length).toEqual(0);
    });

    it('should show error when Invalid Inputs are given', async () => {
        // Invalid Name
        addInput(nameInput, '12345678')
        addInput(mobileInput, '9898989898')
        addInput(emailInput, 'admin@xyzcompany.com')
        await fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('block');
        expect(getTableBody().children.length).toEqual(0);

        addInput(nameInput, 'John doe of South california State')
        addInput(mobileInput, '9898989898')
        addInput(emailInput, 'admin@xyzcompany.com')
        await fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('block');
        expect(getTableBody().children.length).toEqual(0);

        // Invalid Mobile
        addInput(nameInput, 'John doe')
        addInput(mobileInput, '98989898989')
        addInput(emailInput, 'admin@xyzcompany.com')
        await fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('block');
        expect(getTableBody().children.length).toEqual(0);

        addInput(nameInput, 'John doe')
        addInput(mobileInput, 'abcdefghi')
        addInput(emailInput, 'admin@xyzcompany.com')
        await fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('block');
        expect(getTableBody().children.length).toEqual(0);
        //  Invalid Email
        addInput(nameInput, 'John doe')
        addInput(mobileInput, '9898989898')
        addInput(emailInput, '#!_@xyz.com')
        await fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('block');
        expect(getTableBody().children.length).toEqual(0);

        addInput(nameInput, 'John doe')
        addInput(mobileInput, '9898989898')
        addInput(emailInput, 'abc zyx@xyz.com')
        await fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('block');
        expect(getTableBody().children.length).toEqual(0);

        addInput(nameInput, 'John doe')
        addInput(mobileInput, '9898989898')
        addInput(emailInput, 'adminadminadminadminadminadmin87767868765856567fhfhjadminadminadmin@xyzcompany.com')
        await fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('block');
        expect(getTableBody().children.length).toEqual(0);


        addInput(nameInput, 'John doe')
        addInput(mobileInput, '9898989898')
        addInput(emailInput, 'adminadminadminadminadminadmin87767868765856567fhfhjadminadminadmin@xyzcompany.commmmaaaaaaa')
        await fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('block');
        expect(getTableBody().children.length).toEqual(0);

        // Success case
        addInput(nameInput, 'John doe q')
        addInput(mobileInput, '9898989898')
        addInput(emailInput, 'admin@xyzcompany.com')
        await fireEvent.click(submitBtn);
        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('none');
        expect(getTableBody().children.length).toEqual(1);
    });

    it('should add the contact on clicking Add Contact', async () => {
        expect(getTableBody().children.length).toEqual(0);

        const users = [
            {name: 'John doe', mobile: '9898989898', email: 'admin@xyzcompany.com'},
            {name: 'John', mobile: '8989898989', email: 'admin2@xyzcompany.com'},
        ];

        addInput(nameInput, users[0].name)
        addInput(mobileInput, users[0].mobile)
        addInput(emailInput, users[0].email)
        await fireEvent.click(submitBtn);

        addInput(nameInput, users[1].name)
        addInput(mobileInput, users[1].mobile)
        addInput(emailInput, users[1].email)
        await fireEvent.click(submitBtn);

        // await Promise.all(
        //     users.map(
        //         async user => {
        //             addInput(nameInput, user.name)
        //             addInput(mobileInput, user.mobile)
        //             addInput(emailInput, user.email)
        //             console.log('user', user)
        //             await fireEvent.click(submitBtn);
        //         }
        //     )
        // )

        expect(getComputedStyle(errorBox).getPropertyValue('display')).toEqual('none');
        // expect(getTableBody().children.length).toEqual(2);

        const tbody = getTableBody();
        Array.from(tbody.children).forEach((tr, index) => {
            console.log('tr', tr.textContent)
            const td = tr.getElementsByTagName('td');
            expect(td[0].textContent).toEqual(users[index].name);
            expect(td[1].textContent).toEqual(users[index].mobile);
            expect(td[2].textContent).toEqual(users[index].email);
        })
    });

    it('should reset after adding a contact', async function () {
        addInput(nameInput, 'John doe')
        addInput(mobileInput, '9898989898')
        addInput(emailInput, 'admin@xyzcompany.com')
        await fireEvent.click(submitBtn);
        expect(nameInput.value).toBeFalsy();
        expect(emailInput.value).toBeFalsy();
        expect(mobileInput.value).toBeFalsy();
    });

});
