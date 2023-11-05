export interface IPaginationType<DataType> {
  count: number;
  next: string | null;
  previous: string | null;
  results: DataType[];
}
