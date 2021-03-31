// https://stackoverflow.com/a/38340730
export function removeEmptyProperty(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null)
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyProperty(v) : v])
  );
}
