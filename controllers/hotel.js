import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  const newRoom = new Room(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};


export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};


export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};


export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};


export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  // const cities = req.query.cities?.split(",");
  
  // try {
  //   const list = await Promise.all(
  //     cities.map((city) => {
  //       return Hotel.countDocuments({ city: city });
  //     })
  //   );
  //   res.status(200).json(list);
  // } catch (err) {
  //   next(err);
  // }

  const { city } = req.query;
  
  try {
    const hotels = await Hotel.find({ city: city });
    const count = await Hotel.countDocuments({ city: city });
    res.status(200).json({count,hotels});
} catch (error) {
    res.status(500).json({ message: error.message });
}

}



export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    const photos = {
      hotel: "https://www.addressguru.in/images/1326315228.jpg",
      apartment: "https://wallpapercave.com/wp/wp2449363.jpg",
      resort: "https://cdn.wallpapersafari.com/66/1/HXNijp.jpg",
      villa: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZpbGxhfGVufDB8fDB8fHww",
      cabin: "https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/creek-cabin-chromebook-wallpaper.jpg",
    };

    res.status(200).json([
      { type: "hotel", count: hotelCount, photo: photos.hotel },
      { type: "apartment", count: apartmentCount, photo: photos.apartment },
      { type: "resort", count: resortCount, photo: photos.resort },
      { type: "villa", count: villaCount, photo: photos.villa },
      { type: "cabin", count: cabinCount, photo: photos.cabin },
    ]);

  } catch (err) {
    next(err);
  }
};


export const getHotelRooms = async (req, res, next) => {
  try {
    // Find the hotel by ID and populate the rooms field
    const hotel = await Hotel.findById(req.params.id).populate('rooms');

    // Check if the hotel exists
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Check if the rooms property is defined and is an array
    if (!hotel.rooms || !Array.isArray(hotel.rooms)) {
      return res.status(200).json([]);
    }

    // Fetch details of each room
    const list = await Promise.all(
      hotel.rooms.map(async (room) => {
        const roomData = await Room.findById(room._id);
        return roomData || { message: "No Room found" };
      })
    );

    // Return the list of rooms
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
  