import request from "supertest";
import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send("API TO-DO");
});

test("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("API TO-DO");
});
