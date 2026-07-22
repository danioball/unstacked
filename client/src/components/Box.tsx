interface BoxProps {
  value: string | number;
}

function Box({ value }: BoxProps) {
  return (
    <div style={{
      width: "60px",
      height: "60px",
      border: "2px solid black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {value}
    </div>
  );
}

export default Box;