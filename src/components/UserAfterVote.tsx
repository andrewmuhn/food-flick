const UserAfterVote: React.FC = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-4 text-green">
        Votes are still being counted, check back to see the results!
      </h2>
      <div className="flex justify-center items-center mt-4">
        <img
          src="/sad-pablo-lonely.gif"
          alt="Count the votes"
          className="w-120 h-auto mt-6"
        />
      </div>
    </>
  );
};
export default UserAfterVote;
