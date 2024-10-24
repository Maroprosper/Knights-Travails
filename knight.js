
const knightMovement = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];
  
  // Helper function to check if a position is within the chessboard bounds
  function isWithinBounds(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
  
  // BFS algorithm to find the shortest path for knight moves
  function knightMovesBFS(start, target) {
    // Edge case: if start and target are the same
    if (start[0] === target[0] && start[1] === target[1]) {
      return [start];
    }
  
    // Initialize the queue for BFS
    let queue = [[...start]]; // Start position
    // Object to track predecessors for path reconstruction
    let predecessors = {};
    predecessors[start] = null;
  
    while (queue.length > 0) {
      let [currentX, currentY] = queue.shift();
  
      // Explore all possible knight moves from the current position
      for (let move of knightMovement) {
        let nextX = currentX + move[0];
        let nextY = currentY + move[1];
        let nextPos = [nextX, nextY];
  
        // Check if the move is within the board and hasn't been visited
        if (isWithinBounds(nextX, nextY) && !(nextPos in predecessors)) {
          predecessors[nextPos] = [currentX, currentY];
  
          // If we reach the target, reconstruct the path and return it
          if (nextX === target[0] && nextY === target[1]) {
            return reconstructPath(predecessors, start, target);
          }
  
          // Otherwise, add the new position to the queue
          queue.push([nextX, nextY]);
        }
      }
    }
  }
  
  // Helper function to reconstruct the path from the predecessors object
  function reconstructPath(predecessors, start, target) {
    let path = [];
    let current = target;
  
    while (current) {
      path.push(current);
      current = predecessors[current];
    }
  
    return path.reverse();
  }
  
  // Main function to print the knight's path
  function knightMoves(start, target) {
    let path = knightMovesBFS(start, target);
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach(step => console.log(step));
  }
  
  // Test the function
  knightMoves([3, 3], [4, 3]);
  