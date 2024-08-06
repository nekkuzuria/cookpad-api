const fastify = require("fastify")({ logger: true });
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

// Route to handle recipe search
fastify.get("/api/search", async (request, reply) => {
  const { ingredients } = request.query;

  if (typeof ingredients !== "string" || !ingredients.trim()) {
    return reply.status(400).send({ error: "Invalid or missing ingredients" });
  }

  try {
    // Get random page
    const maxPages = 10;
    const randomPage = Math.floor(Math.random() * maxPages) + 1;

    const apiKey = process.env.API_KEY;
    const url = `https://scrape.abstractapi.com/v1/?api_key=${apiKey}&url=https://cookpad.com/id/cari/${encodeURIComponent(
      ingredients
    )}?event=search.typed_query&page=${randomPage}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Get list recipes
    const recipes = $('li[data-search-tracking-target="result"]').toArray();

    if (recipes.length > 0) {
      // Get random recipe
      const randomRecipeIndex = Math.floor(Math.random() * recipes.length);
      const randomRecipe = $(recipes[randomRecipeIndex]);

      // Extract Title ===
      const title = $(randomRecipe).find("h2 a").text().trim();

      // Extract Summary ===
      const summary = $(randomRecipe)
        .find('[data-ingredients-highlighter-target="ingredients"]')
        .text()
        .trim();

      // Extract URL ===
      const url = $(randomRecipe).find("a.block-link__main").attr("href");
      const fullUrl = `https://cookpad.com${url}`;

      // Extract Image ===
      const imageSrcSet = $(randomRecipe)
        .find(
          'div.flex-none.w-20.xs\\:w-auto.h-auto picture source[type="image/jpeg"]'
        )
        .attr("srcset");

      let image;
      if (imageSrcSet) {
        const imageUrls = imageSrcSet.split(", ");
        const bestQualityImageUrl =
          imageUrls[imageUrls.length - 1].split(" ")[0];
        image = bestQualityImageUrl;
      }

      // Response ===
      reply.send({
        title,
        image,
        summary,
        url: fullUrl,
      });
    } else {
      reply.status(404).send({ error: "No recipe found" });
    }
  } catch (error) {
    console.log(error.message);
    reply.status(500).send({ error: `Failed to fetch recipes` });
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
