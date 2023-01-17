const { app } = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const sorted = require("jest-sorted");
beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  if (db.end) {
    db.end();
  }
});

describe("GET: /api/categories", () => {
  it("should return an array of objects with slug and descption", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.categories)).toBe(true);
        if (res.body.categories.length > 0) {
          res.body.categories.forEach((category) => {
            expect(category).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        }
      });
  });
});

describe("GET: /api/reviews", () => {
  it("should return an array of objects with owner, title, review_id, category, review_img_url,created_at,votes,designer,comment_count", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.reviews)).toBe(true);
        if (res.body.reviews.length > 0) {
          res.body.reviews.forEach((review) => {
            expect(review).toMatchObject({
              review_id: expect.any(Number),
              title: expect.any(String),
              category: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
            });
          });
        }
      });
  });
  it("should return an array of reviews sorted by date in descending order", () => {
    return request(app)
      .get("/api/reviews")
      .then((res) => {
        expect(Array.isArray(res.body.reviews)).toBe(true);
        expect(res.body.reviews).toBeSorted(
          (a, b) => b.created_at - a.created_at
        );
      });
  });
});

// describe.only("GET: /api/reviews/:review_id", () => {
//   it("should return an object containing review_id, title, review_body, designer, review_img_url, votes, category,owner, created_at", () => {
//     return request(app)
//       .get("/api/reviews/1")
//       .then((res) => {
//         expect(Array.isArray(res.body.review)).toBe(true);
//       });
//   });
// });
