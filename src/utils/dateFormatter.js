/**
 * Convert epoch timestamp to DD/MM format
 * @param {number} epoch - Epoch timestamp in seconds or milliseconds
 * @returns {string} Formatted date string in DD/MM format
 */
export function epochToDDMMYY(epoch) {
  // If epoch is in seconds, convert to milliseconds
  if (epoch.toString().length === 10) {
    epoch *= 1000;
  }

  const date = new Date(epoch);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}`;
}
