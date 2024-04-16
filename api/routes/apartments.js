import express from "express";
import {
    countByCity,
  countByType,
  createApartment,
  deleteApartment,
  getApartment,
  getApartmentRooms,
  getApartments,
  updateApartment,
} from "../controllers/apartment.js";
import { verifyAdmin } from "./utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createApartment);
//UPDATE
router.put("/:id", verifyAdmin, updateApartment);
//DELETE
router.delete("/:id", verifyAdmin, deleteApartment);
//GET
router.get("/find/:id", getApartment);
//GET ALL
router.get("/", getApartments);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getApartmentRooms);

export default router;
