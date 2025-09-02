import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from './Hero';

describe('Hero component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
  });

  test('renders title, subtitle and description texts', () => {
    expect(screen.getByText(/little lemon/i)).toBeInTheDocument();
    expect(screen.getByText(/chicago/i)).toBeInTheDocument();
    expect(
      screen.getByText(/we are a family owned mediterranean restaurant/i)
    ).toBeInTheDocument();
  });

  test('renders booking button with correct text and link', () => {
    const button = screen.getByRole('button', { name: /book a table/i });
    expect(button).toBeInTheDocument();

    const link = button.closest('a');
    expect(link).toHaveAttribute('href', '/booking');
  });

  test('renders hero image with correct src and alt', () => {
    const image = screen.getByAltText(/hero image/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '../images/hero.png');
  });
});
