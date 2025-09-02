import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  test('renders footer image with correct alt text', () => {
    const image = screen.getByAltText(/little lemon/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/footer.png');
  });

  test('renders navigation section with all links', () => {
    expect(screen.getByText(/navigation/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /menu/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reservations/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /order online/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  test('renders contact section', () => {
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
    expect(screen.getByText(/123 updown st./i)).toBeInTheDocument();
    expect(screen.getByText(/\+44 785 459 785/i)).toBeInTheDocument();
    expect(screen.getByText(/little-lemon@lemon.com/i)).toBeInTheDocument();
  });

  test('renders social media section', () => {
    expect(screen.getByText(/social media/i)).toBeInTheDocument();
    expect(screen.getByText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByText(/instagram/i)).toBeInTheDocument();
    expect(screen.getByText(/tiktok/i)).toBeInTheDocument();
    expect(screen.getByText(/twitter/i)).toBeInTheDocument();
  });
});
