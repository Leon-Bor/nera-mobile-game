import { useEffect, useState } from "react";
import { v4 } from "uuid";

export const usePlayerId = () => {
  const [id, setId] = useState(localStorage.getItem("playerId") || v4);

  useEffect(() => {
    if (!localStorage.getItem("playerId")) {
      localStorage.setItem("playerId", id);
    }
  }, [id]);

  return id;
};
