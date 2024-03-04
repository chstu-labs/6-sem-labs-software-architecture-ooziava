const app = require("./server");

const host = process.env.HOST || "http://localhost";
const port = process.env.API_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`);
});
