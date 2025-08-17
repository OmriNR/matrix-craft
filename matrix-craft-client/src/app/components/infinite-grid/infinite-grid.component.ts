import { Component } from '@angular/core';

interface Cell {
  x: number;
  y: number;
  isMarked: boolean;
}

interface Rectangle {
  width: number;
  height: number;
}

@Component({
  selector: 'app-infinite-grid',
  templateUrl: './infinite-grid.component.html',
  styleUrls: ['./infinite-grid.component.css']
})
export class InfiniteGridComponent {
  cells: Cell[][] = [];
  viewportWidth = 20;
  viewportHeight = 20;
  cellSize = 20;
  offsetX = 0;
  offsetY = 0;
  markedCells: Set<string> = new Set();
  rectangleSize: Rectangle | null = null;

  constructor() {
    this.initializeGrid();
  }

  onCellClick(cell: Cell): void {
    const key = `${cell.x},${cell.y}`;

    if (this.markedCells.has(key)) {
      this.markedCells.delete(key);
    } else if (this.markedCells.size === 0 || this.isAdjacentToMarkedCell(cell)) {
      this.markedCells.add(key);
    }

    this.initializeGrid();
    this.checkRectangle();
  }

  private isAdjacentToMarkedCell(cell: Cell): boolean {
    const adjacentPositions = [
      { x: cell.x - 1, y: cell.y },
      { x: cell.x + 1, y: cell.y },
      { x: cell.x, y: cell.y - 1 },
      { x: cell.x, y: cell.y + 1 },
      { x: cell.x - 1, y: cell.y - 1 },
      { x: cell.x + 1, y: cell.y - 1 },
      { x: cell.x - 1, y: cell.y + 1 },
      { x: cell.x + 1, y: cell.y + 1 }
    ];

    return adjacentPositions.some(pos =>
      this.markedCells.has(`${pos.x},${pos.y}`)
    );
  }

  private checkRectangle(): void {
    if (this.markedCells.size === 0) {
      this.rectangleSize = null;
      return;
    }

    // Get all marked coordinates
    const coordinates = Array.from(this.markedCells).map(key => {
      const [x, y] = key.split(',').map(Number);
      return { x, y };
    });

    // Find bounds
    const minX = Math.min(...coordinates.map(c => c.x));
    const maxX = Math.max(...coordinates.map(c => c.x));
    const minY = Math.min(...coordinates.map(c => c.y));
    const maxY = Math.max(...coordinates.map(c => c.y));

    const width = maxX - minX + 1;
    const height = maxY - minY + 1;

    const isRectangle = coordinates.length === width * height;

    this.rectangleSize = isRectangle ? { width, height } : null;
  }

  private initializeGrid(): void {
    this.cells = [];
    for (let y = 0; y < this.viewportHeight; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < this.viewportWidth; x++) {
        const absoluteX = x + this.offsetX;
        const absoluteY = y + this.offsetY;
        row.push({
          x: absoluteX,
          y: absoluteY,
          isMarked: this.markedCells.has(`${absoluteX},${absoluteY}`)
        });
      }
      this.cells.push(row);
    }
  }
}
