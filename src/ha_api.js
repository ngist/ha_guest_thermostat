// Copyright (c) 2025 Nat Gist
// See license information contained in LICENSE file in project repository
// at https://github.com/ngist/ha_guest_thermostat/

async function fetchEntityState(entity, token) {
  const apiEndpoint = `${root_endpoint}/states/${entity}`;
  try {
    // Make the API request
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
      },
    });

    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Return the parsed data
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch operation
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}


async function triggerWebhook(webhook_id, body) {

  const apiEndpoint = `${root_endpoint}/webhook/${webhook_id}`;
  try {
    // Make the API request
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  } catch (error) {
    // Handle any errors that occurred during the fetch operation
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}
