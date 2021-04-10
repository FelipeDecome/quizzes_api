interface IService<T, R> {
  execute(data: T): Promise<R>;
}

export { IService };
