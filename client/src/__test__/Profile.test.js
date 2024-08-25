import { render, screen } from '@testing-library/react'
import Profile from '../pages/profile'
import { BrowserRouter } from 'react-router-dom';

test('renders the Profile', () => {
  const { container } = render(<BrowserRouter><Profile /></BrowserRouter>)
  expect(container).toMatchSnapshot()
})