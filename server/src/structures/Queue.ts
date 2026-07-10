export class Queue<T> {
  private items: T[] = [];
  private head: number = 0;
  private tail: number = 0;
  private static readonly SHIFT_THRESHOLD = 25;


  enqueue(item: T): void {
    this.items[this.tail++] = item
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.items[this.head];
    delete this.items[this.head];
    this.head++;

    if (this.head === this.tail) {
      this.head = 0;
      this.tail = 0;
    }

    if (this.head >= Queue.SHIFT_THRESHOLD) {
      this.items = this.items.slice(this.head, this.tail);
      this.tail -= this.head
      this.head = 0;
      
    }

    return value;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    } else {
      return this.items[this.head];
    }
  }

  isEmpty(): boolean {
    return this.tail == this.head;
  }

  size(): number {
    return this.tail - this.head;
  }

  toArray(): T[] {
    return structuredClone(this.items.slice(this.head, this.tail));
  }
}