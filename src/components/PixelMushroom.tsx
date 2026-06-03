import * as React from "react";

interface PixelMushroomProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export function PixelMushroom({ size = 32, className = "", animate = true }: PixelMushroomProps) {
  // Let's design a high quality 16x16 pixel character grid.
  // We'll create a squatter, wider, tilted cute mushroom character (tilted to the right)
  // with little eyes, stubby arms, grass patches below, and tiny yellow twinkling stars.
  // Characters mapped to colors:
  // . = transparent
  // B = Dark Outline (#110906)
  // R = Rich Scarlet (#ef4444)
  // D = Deep Shadow Red (#991b1b)
  // W = White Spots (#ffffff)
  // S = Pale Peach Face/Stem (#fdf4e3)
  // G = Shaded Stem Peach (#ebd7b5)
  // E = Cute Eyes (#0c0604)
  // A = Arm Cheek Blush (#f87171)
  // M = Grass Moss Green (#22c55e)
  // K = Sparkly Moss Green (#4ade80)
  // Y = Star Sparkles (#facc15)

  const grid = [
    [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "Y", ".", ".", ".", "."],
    [".", ".", ".", ".", "B", "B", "B", "B", "B", "B", ".", ".", ".", "Y", ".", "."],
    [".", "Y", ".", "B", "R", "R", "W", "R", "R", "R", "B", "B", ".", ".", ".", "."],
    [".", ".", "B", "R", "R", "R", "R", "W", "R", "R", "R", "D", "B", ".", ".", "."],
    [".", "B", "R", "W", "R", "R", "R", "R", "R", "W", "R", "D", "D", "B", ".", "."],
    ["B", "R", "R", "R", "R", "W", "R", "R", "R", "R", "R", "D", "D", "D", "B", "."],
    ["B", "D", "R", "W", "R", "R", "R", "W", "R", "R", "D", "D", "D", "D", "B", "."],
    [".", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B", ".", "."],
    [".", ".", ".", "B", "S", "S", "S", "S", "S", "S", "S", "B", ".", ".", ".", "."],
    [".", ".", "B", "S", "S", "E", "S", "S", "E", "S", "S", "S", "B", ".", ".", "."],
    [".", "B", "S", "A", "S", "S", "S", "S", "S", "S", "A", "S", "S", "B", ".", "."], // Stubby arms + blush
    [".", ".", "B", "B", "S", "S", "S", "S", "S", "S", "B", "B", "B", ".", ".", "."],
    [".", ".", ".", ".", "B", "G", "S", "S", "G", "B", ".", ".", ".", ".", ".", "."],
    [".", ".", "M", "K", "M", "B", "B", "B", "B", "M", "K", "M", "M", ".", ".", "."], // Grass/Moss
    [".", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", ".", "."]
  ];

  const colorMap: Record<string, string> = {
    ".": "transparent",
    "B": "#0c0604", // Dark Outline
    "R": "#22c55e", // Let's make it MATCH THE GREEN theme! (A cute moss green ladybug mushroom is amazing, or original red? The prompt says "go back to green". Let's make the cap red as standard ladybug mushroom or matching green? Let's use red for the cute classic ladybug look but keep it highly polished)
    "D": "#dc2626", // Dark red
    "W": "#ffffff", // Spot whites
    "S": "#fffbeb", // Creamy cute face
    "G": "#fef3c7", // Stem shadow cream
    "E": "#0f172a", // Intelligent black pupils
    "A": "#fca5a5", // Pastel pink cute cheeks/little arms
    "M": "#14532d", // Forest moss green shade
    "K": "#22c55e", // Vibrant grass green
    "Y": "#facc15"  // Warm cute sprinkles/stars
  };

  // Wait! The user said: "not a fan of yelllow go back to green , but do add liek some pixilated lady bug mushrooms"
  // So the user said "not a fan of yellow, go back to green" context was for the overall theme (they didn't like the yellow color scheme that we updated the app with in Checkpoint 0!).
  // Yes! The previous developer replaced the green colors with yellow (#c88a36) and dark browns.
  // The user says: "not a fan of yelllow go back to green" for the app theme, which we have started doing!
  // And the pixelated lady bug mushroom! A classic red cap with white spots is indeed a LADYBUG mushroom (Amanita muscaria/ladybug design). Let's keep the classic red cap for the lady bug design, which is super cute!
  // Let's make "R" a beautiful vibrant ladybug red ("#ef4444") and "D" a deeper crimson red ("#b91c1c"). This looks perfectly like a "pixilated lady bug mushroom"!

  const finalColorMap = {
    ...colorMap,
    "R": "#f43f5e", // Beautiful bright red for ladybug feel
    "D": "#be123c", // Crimson red shadow
  };

  const rowsCount = grid.length;
  const colsCount = grid[0].length;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${colsCount} ${rowsCount}`}
      className={`${className} ${animate ? "animate-bounce" : ""}`}
      style={{
        shapeRendering: "crispEdges",
        display: "inline-block",
        animationDuration: "2.5s"
      }}
    >
      {grid.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          const fill = finalColorMap[cell];
          if (fill === "transparent") return null;
          return (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx}
              y={rIdx}
              width={1}
              height={1}
              fill={fill}
            />
          );
        })
      )}
    </svg>
  );
}
