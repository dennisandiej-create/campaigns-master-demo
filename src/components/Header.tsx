type Props = {
  office: string;
  onBack: () => void;
};

export default function Header({ office, onBack }: Props) {
  return (
    <header className="header">

      <div>

        <h1>{office} Command Centre</h1>

        <p>
          AI Powered Campaign Intelligence Platform
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >

        <div
          style={{
            color: "#FFD86B",
            fontWeight: 700,
          }}
        >
          Demo Mode
        </div>

        <button
          className="backButton"
          onClick={onBack}
        >
          Change Office
        </button>

      </div>

    </header>
  );
}