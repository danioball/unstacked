interface BoxProps {
  id: string;
  value: string | number;
  x: number;
  y: number;
  isDragging: boolean;
  onDragStart: (id: string, offsetX: number, offsetY: number) => void;
}

function Box({ id, value, x, y, isDragging, onDragStart }: BoxProps) {
  function handleMouseDown(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    onDragStart(id, offsetX, offsetY);
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "60px",
        height: "60px",
        boxSizing: "border-box",
        border: "2px solid var(--border)",
        borderRadius: "6px",
        backgroundColor: "var(--box-2)",
        color: "var(--text-h)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
        userSelect: "none",
        zIndex: isDragging ? 10 : 1,
        boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
      }}
    >
      {value}
    </div>
  );
}

export default Box;