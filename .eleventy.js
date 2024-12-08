const GhostContentAPI = require("@tryghost/content-api");

module.exports = function(eleventyConfig) {
  require('dotenv').config();

  // Initialize Ghost API
  const api = new GhostContentAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_CONTENT_API_KEY,
    version: "v3.0"
  });

  // Add a custom Nunjucks filter to slice arrays
  eleventyConfig.addNunjucksFilter("slice", function(array, start, end) {
    return array.slice(start, end);
  });
  

  // Define collections for Eleventy using the Ghost API
  eleventyConfig.addCollection("labPosts", async () => {
    try {
      return await api.posts.browse({
        filter: "tag:lab",
        include: "tags,authors",
        formats: ["html"],
        limit: "all"
      });
    } catch (error) {
      console.error("Error fetching lab posts:", error);
      return [];
    }
  });

  eleventyConfig.addCollection("destinationPosts", async () => {
    try {
      return await api.posts.browse({
        filter: "tag:destination",
        include: "tags,authors",
        limit: "all"
      });
    } catch (error) {
      console.error("Error fetching destination posts:", error);
      return [];
    }
  });

  // Copy styles directory to the output
  eleventyConfig.addPassthroughCopy("styles");

  // Configuration for input, includes, data, and output directories
  return {
    dir: {
      input: ".",             // Root directory for source files
      includes: "_includes",  // Directory for includes
      data: "_data",          // Directory for data files
      output: "_site"         // Directory where the site will build
    }
  };
};