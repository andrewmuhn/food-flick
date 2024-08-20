import "./LoadingState.css";

interface LoadingStateProps {
  loadingMessage: string | null;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingMessage }) => {
  return (
    <div className="loading-container">
      <img
        src="/src/assets/fork-and-knife.svg"
        alt="Loading"
        className="loading-icon"
      />
      <p>{loadingMessage}</p>
    </div>
  );
};
export default LoadingState;
