import { render, screen } from '@testing-library/react'
import Nav from '../../components/Nav'
import { BrowserRouter } from 'react-router-dom';

test('renders the Nav Component', () => {
  render(<BrowserRouter><Nav /></BrowserRouter>)
  const logo = screen.getByTestId('logo')
  const menuToggle = screen.getByTestId('menu-nav-toggle')
  expect(logo).toBeInTheDocument()
  expect(menuToggle).toBeInTheDocument()
})