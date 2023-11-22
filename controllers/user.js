import User from "../models/user.js";

export async function getAllUser(req, res) {
  const allUsers = await User.find({});
  const htmlResp = `
      <ul>
          ${allUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
      </ul>
      `;
  return res.send(htmlResp);
}

export async function getAllUserJson(req, res) {
  const allUsers = await User.find({});
  res.setHeader("X-User-Name", "Test User");
  return res.status(200).json(allUsers);
}

export async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(200).json({ msg: "User not found" });
  }
  return res.status(200).json(user);
}

export async function deleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  console.log("Deleted User", user);
  return res.status(201).json(user);
}

export async function patchUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    lastName: req.body.lastName,
  });
  console.log("Updated User:", user);
  return res.status(200).json({ msg: "Success" });
}

export async function addUser(req, resp) {
  let user = req.body;

  const result = await User.create({
    firstName: user.first_name,
    lastName: user?.last_name,
    email: user.email,
    gender: user.gender,
  });

  console.log("Added User:", result);
  return resp.status(201).json({ msg: "Success" });
}
