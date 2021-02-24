import "./LoadingSpinner.scss";

function LoadingSpinner({ msg }) {
  return (
    <div className="LoadingSpinner">
      <div className="sbl-circ-path"></div>
      <div className="loading-message">{msg && msg}</div>
    </div>
  );
}

export default LoadingSpinner;
