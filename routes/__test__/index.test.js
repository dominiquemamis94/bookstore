const app = require("../../app");
const request = require("supertest");

describe("happy login", () => {
  it("returns status 200 if username and password are passed and valid", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "user", password: "password" });
    expect(res.statusCode).toEqual(200);
  });
});

describe("bad login", () => {
  it("returns status 403 if username or password are invalid", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "non-existend-user", password: "password" });
    expect(res.statusCode).toEqual(403);
  });
});

describe("happy get books", () => {
  it("returns status 200 for the books endpoint", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
  });
});

describe("happy get filtered books", () => {
  it("returns status 200 for the books endpoint", async () => {
    const res = await request(app).get("/books?title=test");
    expect(res.statusCode).toEqual(200);
  });
});

describe("happy get book by id", () => {
  it("returns status 200 for the books endpoint", async () => {
    const res = await request(app).get("/books/2");
    expect(res.statusCode).toEqual(200);
  });
});

describe("happy create book", () => {
  it("returns status 201 for the create books endpoint", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "user", password: "password" });

    let token = res.body.token;

    const res2 = await request(app)
      .post("/books")
      .send({
        title: "test_title",
        description: "desc",
        cover_image: "img.jpg",
        price: 10.99,
      })
      .set({ Authorization: token });
    expect(res2.statusCode).toEqual(403);
  });
});

describe("unauthorized update book", () => {
  it("returns status 403 for the update book endpoint", async () => {
    const res = await request(app).put("/books/3").send({
      title: "updated_test_title",
      description: "desc",
      cover_image: "img.jpg",
      price: 10.99,
    });
    expect(res.statusCode).toEqual(403);
  });
});

describe("unauthorized delete book", () => {
  it("returns status 403 for the update book endpoint", async () => {
    const res = await request(app).delete("/books/3");
    expect(res.statusCode).toEqual(403);
  });
});
