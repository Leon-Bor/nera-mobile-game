import React, { useState } from "react";
import { useScreenResolution } from "./hooks/useScreenResolution";
import "./styles/main.scss";

export const App = () => {
  const { size, scale } = useScreenResolution();
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  console.log("size", scale);
  return (
    <div className="ui">
      <div
        className="container"
        style={{
          width: size.width,
          height: size.height,
          transform: `scale3d(${scale}, ${scale},1)`,
        }}
      >
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </div>
  );
};
