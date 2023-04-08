const express = require("express")
const mongoose = require("mongoose")
const { json } = require("express")
const cors = require("cors")

const userModel = require("./module/user")



const app = express()
app.use(cors())
app.use(json())


mongoose.connect("mongodb://localhost:27017/todo")
  .then(() => console.log("database is connected successfully to the server"))
  .catch((error) => console.log(error))




app.get("/", async (req, res) => {
  const result = await userModel.find({})
  res.send(result)
})

app.post("/user", async (req, res) => {
  const newuser = new userModel(req.body)
  await newuser.save()
  res.send("successfully added......")
})

app.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  const result = await userModel.find({});
  const remaining = result.filter((item) => item.id !== id);

  //Update the database with the new list of users
  await userModel.deleteMany({});
  await userModel.insertMany(remaining);

  res.send("Successfully deleted user with ID: " + id);
});


app.patch("/:id/update", async (req, res) => {
  const id = req.params.id;
  const { name, email, mobile } = req.body;

  try {
    const result = await userModel.findById(id)
    const result2 = await result.updateOne(

      { $set: { "name": name, "email": email, "mobile": mobile } }
    );
    res.send("Successfully updated user with ID: " + id);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



app.listen(8000, () => {
  console.log("server is running on port 8000")
})