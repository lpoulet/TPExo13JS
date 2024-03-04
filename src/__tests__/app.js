import * as React from 'react'
import {render, screen,waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../app'
import { server } from '../../tests/server'; // Import the 'server' module

beforeAll(() => server.listen()) 
afterAll(() => server.close()) 
afterEach(() => server.resetHandlers())

test('utilisateur clique sur le lien', async() => {
  window.history.pushState({}, 'Home', '/')
  render(<App />)
  //Test 2
  expect(screen.getByText(/Welcome home/i)).toBeInTheDocument()
  //test 3
  expect(screen.getByText(/Fill out the form/i)).toBeInTheDocument()
  //Test 4
  userEvent.click(screen.getByText(/Fill out the form/i))
  //Test 5-6
  expect(screen.getByRole('heading')).toHaveTextContent(/page 1/i)
  //Test 7
  expect(screen.getByText(/Go Home/i)).toBeInTheDocument()
  //Test 8
  expect(screen.getByLabelText(/Favorite food/i)).toBeInTheDocument()
  //Test 9
  const input = screen.getByLabelText(/Favorite food/i)
  userEvent.type(input, 'Les pâtes')
  expect(input).toHaveValue('Les pâtes')
  //Test 10
  expect(screen.getByText(/Next/i)).toBeInTheDocument()
  //Test 11
  userEvent.click(screen.getByText(/next/i))
  //Test 12-13
  expect(screen.getByRole('heading')).toHaveTextContent(/page 2/i) //12-13
  //Test 14
  expect(screen.getByText(/Go back/i)).toBeInTheDocument()
  //Test 15
  expect(screen.getByLabelText(/Favorite drink/i)).toBeInTheDocument()
  //Test 16
  const favoriteDrinkInput = screen.getByLabelText(/Favorite drink/i)
  userEvent.type(favoriteDrinkInput, 'Bière')
  expect(favoriteDrinkInput).toHaveValue('Bière')
  //Test 17
  expect(screen.getByText(/Review/i)).toBeInTheDocument()
  //Test 18
  userEvent.click(screen.getByText(/review/i))
  //Test 19-20
  expect(screen.getByRole('heading')).toHaveTextContent(/confirm/i)
  //Test 21
  expect(screen.getByText(/Please confirm your choices/i)).toBeInTheDocument()
  //Test 22
  expect(screen.getByLabelText(/Favorite food/i)).toHaveTextContent('Les pâtes')
  //Test 23
  expect(screen.getByLabelText(/Favorite drink/i)).toHaveTextContent('Bière')
  //Test 24
  expect(screen.getByText(/Go back/i)).toBeInTheDocument()
  //Test 25
  const button1 = screen.getByRole('button', {name: /Confirm/i})
  expect(button1).toHaveTextContent(/Confirm/i)
  //Test 26
  userEvent.click(button1)
  //Test 27-28
  await waitFor(() => expect(screen.queryByRole('heading')).toHaveTextContent(/Congrats. You did it./i))
  //Test 29
  expect(screen.getByText(/Go home/i)).toBeInTheDocument()
  //Test 30
  userEvent.click(screen.getByText(/Go Home/i))
  //Test 31-32
  expect(screen.getByText(/Welcome home/i)).toBeInTheDocument()
})

test('Cas non passant', async() => {
  window.history.pushState({}, 'Home', '/')
  render(<App />)

  //Test 4
  userEvent.click(screen.getByText(/Fill out the form/i))
  //Test 5-6
  expect(screen.getByRole('heading')).toHaveTextContent(/page 1/i)

  //Test 7
  expect(screen.getByText(/Go Home/i)).toBeInTheDocument()

  //Test 8
  expect(screen.getByLabelText(/Favorite food/i)).toBeInTheDocument()

  //Test 9
  const input = screen.getByLabelText(/Favorite food/i)
  userEvent.type(input, '')
  expect(input).toHaveValue('')

  //Test 10
  expect(screen.getByText(/Next/i)).toBeInTheDocument()

  //Test 11-12-13
  userEvent.click(screen.getByText(/next/i)) //11
  expect(screen.getByRole('heading')).toHaveTextContent(/page 2/i) //12-13

  //Test 14
  expect(screen.getByText(/Go back/i)).toBeInTheDocument()

  //Test 15
  expect(screen.getByLabelText(/Favorite drink/i)).toBeInTheDocument()

  //Test 16
  const favoriteDrinkInput = screen.getByLabelText(/Favorite drink/i)
  userEvent.type(favoriteDrinkInput, 'Bière')
  expect(favoriteDrinkInput).toHaveValue('Bière')

  //Test 17
  expect(screen.getByText(/Review/i)).toBeInTheDocument()

  //Test 18
  userEvent.click(screen.getByText(/review/i))

  //Test 19-20
  expect(screen.getByRole('heading')).toHaveTextContent(/confirm/i)

  //Test 21
  expect(screen.getByText(/Please confirm your choices/i)).toBeInTheDocument()

  //Test 22
  expect(screen.getByLabelText(/Favorite food/i)).toHaveTextContent('')
  //Test 23
  expect(screen.getByLabelText(/Favorite drink/i)).toHaveTextContent('Bière')
  //Test 24
  expect(screen.getByText(/Go back/i)).toBeInTheDocument()
  //Test 25
  const button1 = screen.getByRole('button', {name: /Confirm/i})
  expect(button1).toHaveTextContent(/Confirm/i)
  //Test 26
  userEvent.click(button1)
  //Test 27-28
  await waitFor(() => expect(screen.getByText(/Oh no. There was an error./i)).toBeInTheDocument())
  //Test 29
  expect(screen.getByText(/Oh no. There was an error./i)).toBeInTheDocument()
  //Test 30
  expect(screen.getByText(/Go home/i)).toBeInTheDocument()
  //Test 31
  expect(screen.getByText(/Try again/i)).toBeInTheDocument()
  //Test 32
  userEvent.click(screen.getByText(/Try again/i))
  //Test 33-34
  expect(screen.getByRole('heading')).toHaveTextContent(/page 1/i)
})
