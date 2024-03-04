require("./schemes");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  closeMongo,
  connectToMongo,
  deleteUsers,
} = require("./mongodb");

const localhost = "http://localhost";
const host = process.env.HOST || localhost;
const port = 3000;

const app = express();

if (host === localhost) {
  app.use(cors());
  console.log("CORS enabled");
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const defaultErrorHandler = (error, _req, res, _next) => {
  console.error("Error in request:", error?.message);
  res.sendStatus(500);
};

// API Routes
app.get("/api/users", async (_req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    defaultErrorHandler(error, _req, res);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = req.body;
    const result = await insertUser(newUser);
    res.json(result);
  } catch (error) {
    defaultErrorHandler(error, req, res);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser({ _id: id });
    res.json(result);
  } catch (error) {
    defaultErrorHandler(error, req, res);
  }
});

// New API routes for bulk operations
app.delete("/api/users", async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await deleteUsers(ids);
    res.json(result);
  } catch (error) {
    defaultErrorHandler(error, req, res);
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newUserData = req.body;
    const result = await updateUser({ _id: id }, newUserData);
    res.json(result);
  } catch (error) {
    defaultErrorHandler(error, req, res);
  }
});

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectToMongo();
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Server is shutting down...");
  await closeMongo();
  process.exit(0);
});
