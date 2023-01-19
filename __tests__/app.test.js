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

describe("GET: /api/reviews/:review_id", () => {
  it("should return the correct object of the specified review_id which contains review_id , title, review_body, designer, review_img_url, votes, category,owner, created_at", () => {
    const review_id = 1;
    const expectedReview = {
      review_id: review_id,
      title: expect.any(String),
      review_body: expect.any(String),
      designer: expect.any(String),
      review_img_url: expect.any(String),
      votes: expect.any(Number),
      category: expect.any(String),
      owner: expect.any(String),
      created_at: expect.any(String),
    };
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toMatchObject(expectedReview);
      });
  });
  it("should return 404 error when the review ID doesnt exist", () => {
    const reviewID = 999999;
    return request(app)
      .get(`/api/reviews/${reviewID}`)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toEqual("Review not found");
      });
  });
  it("should return a 400 error when the review ID is not valid", () => {
    const reviewID = "katherinerules";
    return request(app)
      .get(`/api/reviews/${reviewID}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toEqual("Invalid data type used");
      });
  });
});

// describe("GET: /api/reviews/:review_id/comments", () => {
//   it("should return an array of comments for the specified review_id with the most recent comment first", () => {
//     const review_id = 1;
//     const expectedComment = {
//       comment_id: expect.any(Number),
//       votes: expect.any(Number),
//       created_at: expect.any(String),
//       author: expect.any(String),
//       body: expect.any(String),
//       review_id: expect.any(Number),
//     };
//     return request(app)
//       .get(`/api/reviews/${review_id}/comments`)
//       .expect(200)
//       .then((res) => {
//         expect(Array.isArray(res.body)).toBe(true);
//         res.body.forEach((comment) => {
//           expect(comment).toMatchObject(expectedComment);
//         });
//       });
//   });
// });
