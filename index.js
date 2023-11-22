import express from "express";
import users from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
const port = 8000;
const allUsers = users;

app.use(bodyParser.json());

app.get("/allUsers", (req, res) => {
  const htmlResp = `
    <ul>
        ${allUsers.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  return res.send(htmlResp);
});

//REST APIs
app.get("/api/allUsers", (req, res) => {
  return res.status(201).json(allUsers);
});

app.route("/api/user/:id")
  .get((req, resp) => {
    return resp.json(
      allUsers.filter((user) => {
        return user.id == req.params.id;
      })
    );
  })
  .delete((req, res) => {
    let deletedUser = {};
    const newUsers = allUsers.filter((user) => {
      if (user.id === Number(req.params.id)){
        deletedUser = user;
        return false;
      }
      return true;
    });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(newUsers), (err, resp) => {
      res.send(deletedUser.first_name);
    });
  });

app.post("/api/addUser", (req, resp) => {
  let user = req.body;
  console.log("req user", user);
  user.id = allUsers.length + 1;
  console.log("req user", user);

  allUsers.push(user);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(allUsers), (err, res) => {
    resp.json(user.id);
  });
});

app.listen(port, () => console.log("Listening on Port 8000..."));
