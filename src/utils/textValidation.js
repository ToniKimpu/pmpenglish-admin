export function validateEnglishText(event) {
  const input = event.target;
  // Allow English letters, numbers, spaces, and basic punctuation
  input.value = input.value.replace(/[^a-zA-Z0-9\s.,!?'"-]/g, "");
}
