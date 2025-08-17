import { Component, OnInit, HostListener } from '@angular/core';

interface Cell {
  x: number;
  y: number;
  isMarked: boolean;
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

  constructor() {
    this.initializeGrid();
  }

  ngOnInit() {
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

  onCellClick(cell: Cell): void {
    const key = `${cell.x},${cell.y}`;
    if (this.markedCells.has(key)) {
      this.markedCells.delete(key);
    } else {
      this.markedCells.add(key);
    }
    this.initializeGrid(); // Refresh the grid to update marked states
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const container = document.querySelector('.grid-container');
    if (container) {
      const scrollLeft = container.scrollLeft;
      const scrollTop = container.scrollTop;

      const newOffsetX = Math.floor(scrollLeft / this.cellSize);
      const newOffsetY = Math.floor(scrollTop / this.cellSize);

      if (newOffsetX !== this.offsetX || newOffsetY !== this.offsetY) {
        this.offsetX = newOffsetX;
        this.offsetY = newOffsetY;
        this.initializeGrid();
      }
    }
  }
}
