import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import CreatePartyModal from '../CreatePartyModal';
import { postNewDinnerParty } from '../../services/DinnerPartyService';
import { DinnerParty } from '../../models/DinnerParty';

// Mocking the API call
jest.mock('../../services/DinnerPartyService', () => ({
  postNewDinnerParty: jest.fn(),
}));

describe('CreatePartyModal', () => {
  const mockOnClose = jest.fn();
  const mockHandlePartyModalSubmit = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous calls and results
  });

  it('should render the modal when isOpen is true', () => {
    render(
      <CreatePartyModal
        isOpen={true}
        onClose={mockOnClose}
        handlePartyModalSubmit={mockHandlePartyModalSubmit}
      />
    );
    
    // Check if modal content is rendered
    expect(screen.getByText('Party Details')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Time')).toBeInTheDocument();
  });

  it('should not render the modal when isOpen is false', () => {
    render(
      <CreatePartyModal
        isOpen={false}
        onClose={mockOnClose}
        handlePartyModalSubmit={mockHandlePartyModalSubmit}
      />
    );
    
    // Modal content should not be rendered
    expect(screen.queryByText('Party Details')).not.toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    // Mock implementation of postNewDinnerParty
    (postNewDinnerParty as jest.Mock).mockResolvedValueOnce({} as DinnerParty);
    
    render(
      <CreatePartyModal
        isOpen={true}
        onClose={mockOnClose}
        handlePartyModalSubmit={mockHandlePartyModalSubmit}
      />
    );
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Dinner Party' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-09-01' } });
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
    
    // Submit the form
    fireEvent.click(screen.getByText('Submit'));
    
    // Wait for async actions to complete
    await waitFor(() => {
      expect(postNewDinnerParty).toHaveBeenCalled();
      expect(mockHandlePartyModalSubmit).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should show an error message for past dates', () => {
    render(
      <CreatePartyModal
        isOpen={true}
        onClose={mockOnClose}
        handlePartyModalSubmit={mockHandlePartyModalSubmit}
      />
    );

    // Set a past date
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2020-01-01' } });

    // Check for error message
    expect(screen.getByText('Please choose a current or future date.')).toBeInTheDocument();
  });
});