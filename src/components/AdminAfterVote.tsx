const AdminAfterVote: React.FC = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-4 text-green">
        The polls are still open. Hit the lock button to count the votes!
      </h2>
      <div className="flex justify-center items-center mt-4">
        <img
          src="https://foodflickimages.s3.us-east-2.amazonaws.com/lockstress.jpg"
          alt="Lock 'Em"
          className="w-80 h-auto mt-6"
        />
      </div>
    </>
  );
};

export default AdminAfterVote;
