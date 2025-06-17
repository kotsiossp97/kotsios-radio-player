export const looksLikeMangledGreek = (input: string): boolean => {
  // List of suspicious Latin1 chars that often appear in mangled Greek
  const suspicious = "ÃÅÉËÎÏÑÓÔ×ØÝÞàáâäãåæçèéêëìíîïñòóôõö÷øùúûüýþ";
  let suspectCount = 0;
  let greekCount = 0;

  for (const ch of input) {
    const code = ch.charCodeAt(0);
    if (suspicious.includes(ch)) suspectCount++;
    if (code >= 0x0370 && code <= 0x03ff) greekCount++;
  }

  // If there are suspicious chars and no Greek letters, it's likely mangled
  return suspectCount > 0 && greekCount === 0;
};

export const handleGreekDecode = (input: string): string => {
  if (!looksLikeMangledGreek(input)) {
    return input;
  }
  try {
    const bytes = Uint8Array.from([...input].map((c) => c.charCodeAt(0)));
    const decoder = new TextDecoder("windows-1253");
    return decoder.decode(bytes);
  } catch {
    // Decoding not supported
    return input;
  }
};
