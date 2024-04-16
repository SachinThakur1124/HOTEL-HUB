import express from "express";
import { verifyAdmin } from "./utils/verifyToken.js";
import { countByCity, countByType, createResort, deleteResort, getResort, getResorts, updateResort } from "../controllers/resort.js";


const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createResort);
//UPDATE
router.put("/:id", verifyAdmin, updateResort);
//DELETE
router.delete("/:id", verifyAdmin, deleteResort);
//GET
router.get("/find/:id", getResort);
//GET ALL
router.get("/", getResorts);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
