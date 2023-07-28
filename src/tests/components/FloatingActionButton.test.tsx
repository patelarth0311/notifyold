import { cleanup, getByText, render, fireEvent, act, waitFor} from '@testing-library/react';
import {    FloatingActionButton } from '../../components/FloatingActionButton';
import { log } from 'console';


test('log out', async () => {

    var logout = render(<FloatingActionButton></FloatingActionButton>)
    expect(logout).toMatchSnapshot()

    act(() => {
        logout.getByRole('button', {name: 'fab'}).click()
    })
    logout = render(<FloatingActionButton></FloatingActionButton>)
    act(() => {
        logout.getByRole('button', {name: 'logout'}).click()
    })
    logout = render(<FloatingActionButton></FloatingActionButton>)
    

    expect(logout).toMatchSnapshot()
    cleanup()
})
