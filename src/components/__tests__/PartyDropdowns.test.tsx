import React from 'react';
import { render, screen } from '@testing-library/react';
import PartyDropdowns from '../PartyDropdowns';

test('renders PartyDropdowns component', () => {
  const mockSetSelectedDinnerParty = jest.fn();
  const mockSetSelectedHostedParty = jest.fn();
  const mockHandleCreateParty = jest.fn();

  render(
    <PartyDropdowns
      selectedDinnerParty=""
      setSelectedDinnerParty={mockSetSelectedDinnerParty}
      selectedHostedParty=""
      setSelectedHostedParty={mockSetSelectedHostedParty}
      handleCreateParty={mockHandleCreateParty}
    />
  );

  // Check if labels are rendered
  const dinnerPartyLabel = screen.getByLabelText(/Dinner Parties/i);
  const hostedPartyLabel = screen.getByLabelText(/Your hosted parties/i);
  expect(dinnerPartyLabel).not.toBeNull();
  expect(hostedPartyLabel).not.toBeNull();

  // Check if button is rendered
  const createPartyButton = screen.getByRole('button', { name: /Create party/i });
  expect(createPartyButton).not.toBeNull();
});