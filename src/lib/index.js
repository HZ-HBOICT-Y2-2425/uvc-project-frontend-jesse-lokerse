let data = "niks";

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3011/goals");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow the error so it can be caught by the caller
  }
}

const fetchPromise = fetchData(); // Fetch data and return the promise

export { fetchPromise };
