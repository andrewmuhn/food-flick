import React, { useState } from 'react';
import { postNewDinnerParty } from '../services/DinnerPartyService';
import { createDinnerParty } from '../utils/DinnerPartyApiMappers';
import { DinnerParty } from '../models/DinnerParty';

interface CreatePartyModalProps {
    isOpen: boolean;
    onClose: () => void;
    handlePartyModalSubmit: (dinnerParty: DinnerParty) => void;
}

const CreatePartyModal: React.FC<CreatePartyModalProps> = ({ isOpen, onClose, handlePartyModalSubmit }) => {
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [strategy, setStrategy] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dinnerPartyResponse = await postNewDinnerParty(createDinnerParty(name, date, time, strategy));
        console.log(dinnerPartyResponse);
        handlePartyModalSubmit(dinnerPartyResponse)
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 h-50">
                <h2 className="text-xl font-bold mb-4">Party Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                            type="time"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Voting Strategy</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={strategy}
                            onChange={(e) => setStrategy(e.target.value)}
                            required
                        >
                            <option value="">Select strategy</option>
                            <option value="DEFAULT">Default</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-dark focus:bg-green-dark focus:outline-none"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePartyModal;

