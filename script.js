// Sample unsolved Sudoku puzzle (0 represents empty cells)
const unsolvedSudoku = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Function to solve Sudoku
function solveSudoku() {
    const solvedSudoku = solve(unsolvedSudoku);
    displaySudoku(solvedSudoku);
}

// Function to display Sudoku grid
function displaySudoku(grid) {
    const sudokuGrid = document.getElementById('sudoku-grid');
    sudokuGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            cell.textContent = grid[i][j] === 0 ? '' : grid[i][j];
            sudokuGrid.appendChild(cell);
        }
    }
}

// Function to solve Sudoku using backtracking
function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidMove(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solve(grid)) {
                            return grid;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return grid;
}

// Function to check if a move is valid
function isValidMove(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Initial display of the unsolved Sudoku puzzle
displaySudoku(unsolvedSudoku);
