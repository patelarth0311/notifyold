import { cleanup, getByText, render, fireEvent, act, waitFor} from '@testing-library/react';
import { UserForm } from '../../components/UserForm';
import { UserFormFields } from '../../types/types';


describe('forms',  () => { 

    const data  = {
        email: 'random03@gmail.com',
        password: 'abc123',
        hasConfirmPassword: false,
        buttonText: '',
        messageText: '',
        optionText: '',
        setShow: function (): void {
            throw new Error('Function not implemented.');
        },
        buttonAction: function (): void {
            throw new Error('Function not implemented.');
        },
        setForm: function (e: any): void {
            throw new Error('Function not implemented.');
        },
        showErrorMessage: false
    }
    const form =  render(<UserForm {...data}></UserForm>)

    test('Check if email passed', async () => {
        expect(await form.findByRole('textbox', {name: 'email'})).toHaveValue("random03@gmail.com")

    })


    expect(form).toMatchSnapshot()

    

 

 })