import express from "express";
import {
  addUser,
  deleteUserById,
  getAllUser,
  getAllUserJson,
  getUserById,
  patchUserById,
} from "../controllers/user.js";

export const router = express.Router();

router.get("/", getAllUser);

//REST APIs
router.get("/allUsers", getAllUserJson);

router
  .route("/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .patch(patchUserById);

router.post("/addUser", addUser);
