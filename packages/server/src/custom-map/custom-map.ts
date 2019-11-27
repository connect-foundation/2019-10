export class CustomMap<T> {
  public readonly table: Map<string, T>;

  public constructor() {
    this.table = new Map<string, T>();
  }

  public insert(id: string, value: T): void {
    this.table.set(id, value);
  }

  public find(id: string): T {
    return this.table.get(id);
  }

  public remove(id: string): boolean {
    return this.table.delete(id);
  }

  public contains(id: string): boolean {
    return this.table.has(id);
  }
}
