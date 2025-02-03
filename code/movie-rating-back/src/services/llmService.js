const axios = require("axios");
const { OpenAI } = require("openai");
const { HfInference } = require("@huggingface/inference");
const cohere = require("cohere-ai");
const { Movie } = require("../models");

/**
 * Function 1: Search using OpenAI embeddings
 */
async function searchMoviesWithOpenAI(keyword) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const movies = await Movie.findAll();
    const titles = movies.map((m) => m.title);

    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: [keyword, ...titles],
    });
    const keywordEmbedding = response.data[0].embedding;
    const titleEmbeddings = response.data.slice(1).map((res) => res.embedding);

    return getTopMovies(movies, keywordEmbedding, titleEmbeddings);
  } catch (error) {
    console.error("OpenAI search error:", error);
    return [];
  }
}

/**
 * Function 2: Search using Hugging Face embeddings
 */
async function searchMoviesWithHuggingFace(keyword) {
  try {
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
    const movies = await Movie.findAll();
    const titles = movies.map((m) => m.title);

    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: [keyword, ...titles],
    });

    const keywordEmbedding = response[0];
    const titleEmbeddings = response.slice(1).map((embedding, index) => ({
      title: titles[index],
      score: cosineSimilarity(keywordEmbedding, embedding),
    }));

    return titleEmbeddings
      .sort((a, b) => b.score - a.score)
      .map((m) => m.title);
  } catch (error) {
    console.error("Hugging Face search error:", error);
    return [];
  }
}

/**
 * Function 3: Search using Cohere embeddings
 */
async function searchMoviesWithCohere(keyword) {
  try {
    cohere.init(process.env.COHERE_API_KEY);
    const movies = await Movie.findAll();
    const titles = movies.map((m) => m.title);

    const response = await cohere.embed({
      texts: [keyword, ...titles],
      model: "embed-english-v3.0",
    });

    const keywordEmbedding = response.body.embeddings[0];
    const titleEmbeddings = response.body.embeddings
      .slice(1)
      .map((embedding, index) => ({
        title: titles[index],
        score: cosineSimilarity(keywordEmbedding, embedding),
      }));

    return titleEmbeddings
      .sort((a, b) => b.score - a.score)
      .map((m) => m.title);
  } catch (error) {
    console.error("Cohere search error:", error);
    return [];
  }
}

/**
 * Cosine Similarity function
 */
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

function getTopMovies(movies, keywordEmbedding, embeddings) {
  return embeddings
    .map((embedding, index) => ({
      id: movies[index].id,
      title: movies[index].title,
      score: cosineSimilarity(keywordEmbedding, embedding),
    }))
    .sort((a, b) => b.score - a.score) // Sort by similarity
    .slice(0, 5); // Return only the top 5
}

module.exports = {
  searchMoviesWithOpenAI,
  searchMoviesWithHuggingFace,
  searchMoviesWithCohere,
};
