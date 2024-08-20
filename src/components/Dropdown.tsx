import { DinnerParty } from "../models/DinnerParty";

interface dropdownProps {
  dinnerParties: DinnerParty[];
  handleRedirect: (number: number) => void;
}

const Dropdown: React.FC<dropdownProps> = ({
  handleRedirect,
  dinnerParties,
}) => {
  console.log(dinnerParties);
  return (
    <select
      id="dinnerParties"
      value=""
      onChange={(e) => handleRedirect(Number(e.target.value))}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option disabled value="">
        Select a dinner party
      </option>
      {dinnerParties.map((dinnerParty) => (
        <option
          key={dinnerParty.dinner_party_id}
          value={dinnerParty.dinner_party_id}
        >
          {dinnerParty.party_name}
        </option>
      ))}
      {/* Add options dynamically or statically */}
    </select>
  );
};

export default Dropdown;
