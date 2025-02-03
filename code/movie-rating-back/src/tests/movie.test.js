const request = require("supertest");
const app = require("../server");
const { sequelize, Movie, Comment } = require("../models");

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true }); // Ensure the database is reset before testing
  } catch (error) {
    console.error("Database sync error:", error);
  }
});

afterAll(async () => {
  await sequelize.close();
});

describe("Movie API", () => {
  let movieId, commentId;

  // Test 1: Add a new movie
  it("should add a new movie", async () => {
    const res = await request(app).post("/api/movies").send({
      title: "Inception",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Inception");
    movieId = res.body.id;
  });

  // Test 2: Retrieve movie list
  it("should retrieve the list of movies", async () => {
    const res = await request(app).get("/api/movies");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("title", "Inception");
  });

  // Test 3: Rate a movie
  it("should rate a movie", async () => {
    const res = await request(app).patch(`/api/movies/${movieId}/rate`).send({
      rating: 4,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("rating", 4);
  });

  // Test 4: Prevent invalid ratings
  it("should return error for invalid rating", async () => {
    const res = await request(app).patch(`/api/movies/${movieId}/rate`).send({
      rating: 6,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe("Rating must be between 1-5");
  });

  // Test 5: Add a comment to a movie
  it("should add a comment to a movie", async () => {
    const res = await request(app)
      .post(`/api/movies/${movieId}/comments`)
      .send({
        content: "Great movie!",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.content).toBe("Great movie!");
    commentId = res.body.id;
  });

  // Test 6: Delete a comment
  it("should delete a comment", async () => {
    const res = await request(app).delete(`/api/comments/${commentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Comment deleted");
  });

  // Test 7: Delete a movie
  it("should delete a movie", async () => {
    const res = await request(app).delete(`/api/movies/${movieId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Movie deleted");
  });

  // Test 8: Ensure movie is deleted
  it("should return an empty movie list after deletion", async () => {
    const res = await request(app).get("/api/movies");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });

  // Test 9: Prevent deleting a non-existing movie
  it("should return an error for deleting a non-existing movie", async () => {
    const res = await request(app).delete(`/api/movies/${movieId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Movie deleted");
  });

  // Test 10: Prevent commenting on a non-existing movie
  it("should return an error for commenting on a non-existing movie", async () => {
    const res = await request(app).post("/api/movies/999/comments").send({
      content: "This should fail",
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Movie not found");
  });

  // Test 11: Prevent repeating movie titles
  it("should prevent duplicate movie titles", async () => {
    // First movie creation
    await request(app).post("/api/movies").send({ title: "Inception" });

    // Attempt duplicate movie
    const res = await request(app)
      .post("/api/movies")
      .send({ title: "Inception" });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe("Movie title must be unique");
  });
});
