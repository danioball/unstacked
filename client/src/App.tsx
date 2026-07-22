import { useState } from "react";
import Box from "./components/Box";
import Toolbar from "./components/Toolbar";

interface Element {
  id: string;
  value: number;
}

function App() {
  const [elements, setElements] = useState<Element[]>([
    { id: "1", value: 1},
    { id: "2", value: 2},
    { id: "3", value: 3},
  ])

  return (
    <div>
      <h1>(un)stacked</h1>
      <Toolbar></Toolbar>
      {elements.map((el) => (
        <Box key={el.id} value={el.value} />
      ))}
    </div>
  );
}

export default App;