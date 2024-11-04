export async function guard<T>(
  promiser: Promise<T>
): Promise<[undefined, T] | [Error]> {
  return promiser
    .then((value) => [undefined, value] as [undefined, T])
    .catch((error) => [error]);
}

export async function guardWithCustomError<
  T,
  E extends new (msg?: string) => Error
>(
  promiser: Promise<T>,
  errorsToCatch: E[]
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promiser
    .then((value) => [undefined, value] as [undefined, T])
    .catch((error) => {
      if (errorsToCatch === undefined) {
        return [error];
      }
      if (errorsToCatch.some((E) => error instanceof E)) {
        return [error as InstanceType<E>];
      }
      throw error;
    });
}
