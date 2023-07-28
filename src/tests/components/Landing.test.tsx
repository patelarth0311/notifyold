import React from "react";
import { cleanup, getByText, render, fireEvent, act} from '@testing-library/react';
import { Landing } from "../../components/Landing";
import { UserForm } from "../../components/UserForm";
import { shallow } from 'enzyme';

test('render landing', () => {
    const landing = render(<Landing/>);

   
    expect(landing.getByRole('button',{name: 'registrationoption'})).toHaveTextContent(/Sign up/)
    act(() => {
        landing.getByRole('button',{name: 'registrationoption'}).click()
    })

   expect(landing.getByRole('button',{name: 'registrationoption'})).toHaveTextContent(/Log in/)


    cleanup()
})



it ('landing snapshot', async () => {
    var landing =  render(<Landing/>);
  

    expect(landing).toMatchSnapshot()

    act(() => {
    landing.getByRole('button',{name: 'registrationoption'}).click()
    })
    landing =  render(<Landing/>)

    expect(landing).toMatchSnapshot()
    cleanup()
})

