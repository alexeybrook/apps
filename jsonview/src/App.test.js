import { render, screen } from '@testing-library/react';
import App from './App';

test('renders JSON Extractor & Beautifier UI', () => {
  render(<App />);
  expect(screen.getByText(/JSON Extractor & Beautifier/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Paste or type text containing JSON/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Beautified JSON will appear here/i)).toBeInTheDocument();
});
