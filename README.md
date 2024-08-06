## Cookpad Recipe Scraper API
This project is a simple API to scrape recipes from Cookpad based on provided ingredients. It uses Fastify, Axios, and Cheerio for web scraping.

**Prerequisites**
- Node.js (version 14 or higher)
- npm or yarn
- API Key from [AbstractAPI](https://www.abstractapi.com/)

**Getting Started**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cookpad-api
   cd cookpad-api
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create Environment Configuration:
   - Copy the .env.example file to .env:
     ```bash
     cp .env.example .env
     ```
   - Open the .env file and add your AbstractAPI key:
     ```bash
     API_KEY=your_abstractapi_key_here
     ```
     You need to generate an API key from [AbstractAPI](https://www.abstractapi.com/)

4. Start the server:
    ```bash
    node server.js  
    ```
    The server will start on http://localhost:3000.

<br>
<br>

**API Endpoint**

To search for recipes using specific ingredients, send a GET request to:
```bash
http://localhost:3000/recipes?ingredients=your_ingredients
```
Replace your_ingredients with the ingredients you want to search for.

<br>
<br>

**Functionality**
- The API fetches a list of recipes from Cookpad based on the provided ingredients.
- It randomly selects a recipe from the list and returns the recipe details.
- The returned data includes the recipe title, image URL, summary, and the Cookpad recipe URL.

<br>
<br>

**Example Request and Response**

Request:
```bash
http://localhost:3000/api/search?ingredients=tepung%20telur
```

Response:
```json
{
  "title": "Telur Dadar Buncis Kentang Tepung Beras",
  "image": "https://img-global.cpcdn.com/recipes/96d390d8744a5391/160x176cq30/telur-dadar-buncis-kentang-tepung-beras-foto-resep-utama.jpg",
  "ingredients": "telur ayam,\n      buncis,\n      kentang,\n      Tepung beras,\n      Bahan lainya :,\n      cabe giling,\n      garam,\n      kaldu bubuk,\n      lada bubuk,\n      air putih,\n      minyak goreng",
  "url": "https://cookpad.com/id/resep/17196667-telur-dadar-buncis-kentang-tepung-beras"
}
```
