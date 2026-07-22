import { useState, useEffect, useRef } from "react";
import Box from "./components/Box";
import Toolbar from "./components/Toolbar";
import "./App.css";
import type { Element } from "./types";
import { resolveCollisions } from "./utils/collisions";

const BOX_SIZE = 60;
const EASE = 0.25;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function App() {
  const [elements, setElements] = useState<Element[]>([
    { id: "1", value: 1, x: 50, y: 100 },
    { id: "2", value: 2, x: 150, y: 100 },
    { id: "3", value: 3, x: 250, y: 100 },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragTarget = useRef({ x: 0, y: 0 });

  function handleDragStart(id: string, offsetX: number, offsetY: number) {
    setDraggingId(id);
    dragOffset.current = { x: offsetX, y: offsetY };

    const current = elements.find(el => el.id === id);
    if (current) {
      dragTarget.current = { x: current.x, y: current.y };
    }
  }

  useEffect(() => {
    if (!draggingId) return;

    const sandbox = document.getElementById("sandbox");
    if (!sandbox) return;

    function handleMouseMove(e: MouseEvent) {
      const rect = sandbox!.getBoundingClientRect();
      const targetX = e.clientX - rect.left - dragOffset.current.x;
      const targetY = e.clientY - rect.top - dragOffset.current.y;

      dragTarget.current = {
        x: Math.max(0, Math.min(targetX, sandbox!.clientWidth - BOX_SIZE)),
        y: Math.max(0, Math.min(targetY, sandbox!.clientHeight - BOX_SIZE)),
      };
    }

    function handleMouseUp() {
      setDraggingId(null);
    }

    let frameId: number;

    function tick() {
      setElements(prev => {
        const moved = prev.map(el =>
          el.id === draggingId
            ? {
                ...el,
                x: lerp(el.x, dragTarget.current.x, EASE),
                y: lerp(el.y, dragTarget.current.y, EASE),
              }
            : el
        );
        return resolveCollisions(moved, sandbox!.clientWidth, sandbox!.clientHeight);
      });
      frameId = requestAnimationFrame(tick);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    frameId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(frameId);
    };
  }, [draggingId]);

  return (
    <div className="app-shell">
      <h1>(un)stacked</h1>
      <div id="canvas-container">
        <Toolbar />
        <div id="sandbox">
          {elements.map(el => (
            <Box
              key={el.id}
              id={el.id}
              value={el.value}
              x={el.x}
              y={el.y}
              isDragging={el.id === draggingId}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;