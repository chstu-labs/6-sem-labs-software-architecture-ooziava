const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error(error?.message);
  }
}

async function closeMongo() {
  try {
    await client.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw new Error(error?.message);
  }
}

async function getUser(query) {
  const database = client.db("swat-lab3");
  const collection = database.collection("users");
  const user = await collection.findOne(query);
  return user;
}

async function insertUser(user) {
  const database = client.db("swat-lab3");
  const collection = database.collection("users");
  const result = await collection.insertOne(user);
  return result;
}

async function updateUser(query, update) {
  if (update?._id) {
    delete update._id;
  } else if (query?._id) {
    query._id = ObjectId.createFromHexString(query._id);
  }

  const database = client.db("swat-lab3");
  const collection = database.collection("users");
  const result = await collection.updateOne(query, {
    $set: update,
  });

  return result;
}

async function deleteUser(query) {
  if (query?._id) {
    query._id = ObjectId.createFromHexString(query._id);
  }

  const database = client.db("swat-lab3");
  const collection = database.collection("users");
  const result = await collection.deleteOne(query);
  if (result.deletedCount === 0) {
    throw new Error("User not found");
  }

  return result;
}

async function getUsers(query) {
  if (query?._id) {
    query._id = ObjectId.createFromHexString(query._id);
  }

  const database = client.db("swat-lab3");
  const collection = database.collection("users");
  const users = await collection.find(query).toArray();
  return users;
}

async function bulkDeleteUsers(ids) {
  if (!ids?.length) throw new Error("No IDs provided");

  const database = client.db("swat-lab3");
  const collection = database.collection("users");
  const result = await collection.deleteMany({
    _id: {
      $in: ids.map((id) => ObjectId.createFromHexString(id)),
    },
  });
  return result;
}

module.exports = {
  connectToMongo,
  closeMongo,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
  getUsers,
  deleteUsers: bulkDeleteUsers,
};
