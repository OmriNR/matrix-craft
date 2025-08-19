import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

interface Cell {
  x: number;
  y: number;
  isMarked: boolean;
  value?: number;
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
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
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
      cell.value = undefined;
    } else {
      this.markedCells.add(key);
      cell.value = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    }

    this.initializeGrid();
    this.checkRectangle();

  }

  onRightClick(event: MouseEvent, cell: Cell): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.rectangleSize) {
      this.menuTrigger.menuData = { cell };
      this.menuTrigger.openMenu();
    }
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
        const key = `${absoluteX},${absoluteY}`;
        row.push({
          x: absoluteX,
          y: absoluteY,
          isMarked: this.markedCells.has(key),
          value: this.markedCells.has(key) ? Math.floor(Math.random() * 10) + 1 : undefined
        });
      }
      this.cells.push(row);
    }
  }

}
