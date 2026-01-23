import fs from "fs/promises";

/**
 * Load and parse JSON data from file
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<Array>} Parsed JSON data
 * @throws {Error} If file cannot be read or parsed
 */
export async function loadJSONData(filePath) {
  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContents);
    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw error;
  }
}
