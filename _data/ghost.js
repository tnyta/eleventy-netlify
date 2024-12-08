// Import the Ghost Content API module
const GhostContentAPI = require("@tryghost/content-api");

// Initialize the Ghost API client with environment variables for secure configuration
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL, // The base URL of your Ghost CMS instance
  key: process.env.GHOST_CONTENT_API_KEY, // The Content API key for authenticating requests
  version: "v3.0" // The version of the Ghost Content API to use
});

// Export an asynchronous function to fetch and return posts
module.exports = async function() {
  try {
    // Use the Ghost Content API to fetch posts with specific criteria
    const posts = await api.posts.browse({
      filter: "tag:lab+tag:destination", // Fetch posts with both 'lab' and 'destination' tags
      include: "tags,authors", // Include related tag and author data in the response
      limit: "all" // Fetch all matching posts (no pagination)
    });

    // Return the fetched posts
    return posts;
  } catch (error) {
    // Log an error message to the console if fetching posts fails
    console.error("Error fetching posts:", error);

    // Return an empty array as a fallback to avoid breaking the application
    return [];
  }
};