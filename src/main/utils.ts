export function UpsertKeyValue(
  obj: Record<string, unknown> | undefined,
  keyToChange: string,
  value: unknown,
): void {
  if (!obj) return;
  const keyToChangeLower = keyToChange.toLowerCase();
  for (const key of Object.keys(obj)) {
    if (key.toLowerCase() === keyToChangeLower) {
      // Reassign old key
      obj[key] = value;
      // Done
      return;
    }
  }
  // Insert at end instead
  obj[keyToChange] = value;
}
