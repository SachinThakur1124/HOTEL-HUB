import express from "express";
import { verifyAdmin } from "./utils/verifyToken.js";
import { countByCity, countByType, createVilla, deleteVilla, getVilla, getVillas, updateVilla } from "../controllers/villa.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createVilla);
//UPDATE
router.put("/:id", verifyAdmin, updateVilla);
//DELETE
router.delete("/:id", verifyAdmin, deleteVilla);
//GET
router.get("/find/:id", getVilla);
//GET ALL
router.get("/", getVillas);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
