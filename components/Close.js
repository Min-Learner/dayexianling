
const Close = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    {...props}
  >
    <circle
      style={{
        fill: "#ff6643",
      }}
      cx={256}
      cy={256}
      r={256}
    />
    <path
      style={{
        fill: "#ff4f19",
      }}
      d="M256 0v512c141.385 0 256-114.615 256-256S397.385 0 256 0z"
    />
    <path
      style={{
        fill: "#f2f2f4",
      }}
      d="m365.904 184.885-38.789-38.789L256 217.211l-71.115-71.115-38.789 38.789L217.211 256l-71.115 71.115 38.789 38.789L256 294.789l71.115 71.115 38.789-38.789L294.789 256z"
    />
    <path
      style={{
        fill: "#dfdfe1",
      }}
      d="m365.904 184.885-38.789-38.789L256 217.211v77.578l71.115 71.115 38.789-38.789L294.789 256z"
    />
  </svg>
)

export default Close
