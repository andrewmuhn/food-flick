import "./LoadingState.css";

interface LoadingStateProps {
  loadingMessage: string | null;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingMessage }) => {
  return (
    <div className="loading-container">
      <img
        src="https://foodflickimages.s3.us-east-2.amazonaws.com/assets/fork-and-knife.svg"
        alt="Loading"
        className="loading-icon"
      />
      <p>{loadingMessage}</p>
    </div>
  );
};
export default LoadingState;
