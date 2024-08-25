import { render, screen } from '@testing-library/react'
import Form from '../../components/Form'
import { BrowserRouter } from 'react-router-dom';

test('renders the Form Component', () => {
  render(<BrowserRouter><Form /></BrowserRouter>)
  const linkElement = screen.getByText(/Your email/i)
  const passwordElement = screen.getByTestId('password')
  const submitElement = screen.getByTestId('submit')
  expect(linkElement).toBeInTheDocument()
  expect(passwordElement).toBeInTheDocument()
  expect(submitElement).toBeInTheDocument()
})