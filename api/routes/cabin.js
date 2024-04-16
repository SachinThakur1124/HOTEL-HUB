import express from "express";
import { verifyAdmin } from "./utils/verifyToken.js";
import { countByCity, countByType, createCabin, deleteCabin, getCabin, getCabins, updateCabin } from "../controllers/cabin.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createCabin);
//UPDATE
router.put("/:id", verifyAdmin, updateCabin);
//DELETE
router.delete("/:id", verifyAdmin, deleteCabin);
//GET
router.get("/find/:id", getCabin);
//GET ALL
router.get("/", getCabins);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
