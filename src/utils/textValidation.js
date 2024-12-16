export function validateEnglishText(event) {
  const input = event.target;
  // Allow only English letters and basic punctuation
  input.value = input.value.replace(/[^a-zA-Z\s.,!?'"-]/g, "");
}
