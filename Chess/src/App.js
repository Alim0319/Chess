/*import { Container } from "@mui/material";
import Game from "./Game";

export default function App() {
  return (
    <Container>
      <Game />
    </Container>
  );
}*/

import { Container } from "@mui/material";
import Game from "./Game";

export default function App() {
  // Define or obtain the necessary props here
  const level1Props = {
    players: [], // An array of players for level 1
    room: "Level 1", // Room ID or string for level 1
    orientation: "white", // Orientation ("white" or "black") for level 1
    cleanup: () => {
      // Cleanup function logic for level 1
    },
  };
  const level2Props = {
    players: [], // An array of players for level 2
    room: "Level 2", // Room ID or string for level 2
    orientation: "black", // Orientation ("white" or "black") for level 2
    cleanup: () => {
      // Cleanup function logic for level 2
    },
  };
  const level3Props = {
    players: [], // An array of players for level 3
    room: "Level 3", // Room ID or string for level 3
    orientation: "black", // Orientation ("white" or "black") for level 3
    cleanup: () => {
      // Cleanup function logic for level 3
    },
  };
  const level4Props = {
    players: [], // An array of players for level 4
    room: "Level 4", // Room ID or string for level 4
    orientation: "black", // Orientation ("white" or "black") for level 4
    cleanup: () => {
      // Cleanup function logic for level 4
    },
  };
  const level5Props = {
    players: [], // An array of players for level 5
    room: "Level 5", // Room ID or string for level 5
    orientation: "black", // Orientation ("white" or "black") for level 5
    cleanup: () => {
      // Cleanup function logic for level 5
    },
  };

  return (
    <Container>
      <Game {...level1Props} />
      <Game {...level2Props} />
      <Game {...level3Props} />
      <Game {...level4Props} />
      <Game {...level5Props} />

      {/* Add more Game components with different props for other levels */}
    </Container>
  );
}
