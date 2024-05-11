import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/create-hotel", verifyAdmin, createHotel);

//UPDATE
router.put("/update-hotel/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/delete-hotel/:id", verifyAdmin, deleteHotel);
//GET

router.get("/find-hotel/:id", getHotel);
//GET ALL

router.get("/hotels", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
