import express from "express";
import users from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 8000;
// const allUsers = users;

mongoose
  .connect("mongodb://localhost:27017/user-app")
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => console.log("Mongo Error", err));
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    gender: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
const User = mongoose.model("user", userSchema);

app.use(bodyParser.json());

app.get("/allUsers", async (req, res) => {
  const allUsers = await User.find({})  
  const htmlResp = `
    <ul>
        ${allUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
    `;
  return res.send(htmlResp);
});

//REST APIs
app.get("/api/allUsers", async (req, res) => {
  const allUsers = await User.find({})
  res.setHeader('X-User-Name','Test User')
  return res.status(200).json(allUsers);
});

app
  .route("/api/user/:id")
  .get(async (req, resp) => {
    const user = await User.findById(req.params.id)
    if(!user){
      return resp.status(200).json({msg:"User not found"})
    }
    return resp.status(200).json(user);
  })
  .delete(async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    console.log("Deleted User", user)
    return res.status(201).json(user)    
  })
  .patch(async (req, res)=>{
    const user = await User.findByIdAndUpdate(req.params.id,{
      lastName:req.body.lastName
    })
    console.log("Updated User:", user)
    return res.status(200).json({msg:'Success'})
  })

app.post("/api/addUser", async (req, resp) => {
  let user = req.body;
  // allUsers.push(user);

  const result = await User.create({
    firstName: user.first_name,
    lastName: user?.last_name,
    email: user.email,
    gender: user.gender,
  });

  console.log("Result", result);
  return resp.status(201).json({ msg: "Success" });
});

app.listen(port, () => console.log("Listening on Port 8000..."));
