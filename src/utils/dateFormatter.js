/**
 * Convert epoch timestamp to DD/MM format
 * @param {number} epoch - Epoch timestamp in seconds or milliseconds
 * @returns {string} Formatted date string in DD/MM format
 */
export function epochToDDMMYY(epoch, interval) {
  // If epoch is in seconds, convert to milliseconds
  if (epoch.toString().length === 10) {
    epoch *= 1000;
  }

  const date = new Date(epoch);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hour = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  if(interval == "15m" || interval == "30m" || interval == "1h"){
    return `${hour}:${minutes}`
  }

  return `${day}/${month}`;
}
