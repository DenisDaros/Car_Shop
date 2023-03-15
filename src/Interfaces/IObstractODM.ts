interface IAbstractODM<T> {
  create(object: T): Promise<T>,
  getAll(): Promise<T[]>,
  getById(_id: string): Promise<T | null>,
  update(_id: string, object: T): Promise<T | null>,
}

export default IAbstractODM;