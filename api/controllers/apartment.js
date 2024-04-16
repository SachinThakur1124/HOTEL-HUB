import Apartment from "../models/Apartment.js";

export const createApartment = async (req, res, next) => {
  const newApartment = new Apartment(req.body);

  try {
    const savedApartment = await newApartment.save();
    res.status(200).json(savedApartment);
  } catch (err) {
    next(err);
  }
};

export const updateApartment = async (req, res, next) => {
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedApartment);
  } catch (err) {
    next(err);
  }
};

export const deleteApartment = async (req, res, next) => {
  try {
    await Apartment.findByIdAndDelete(req.params.id);
    res.status(200).json("Apartment has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    res.status(200).json(apartment);
  } catch (err) {
    next(err);
  }
};
export const getApartments = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const apartments = await Apartment.find({
      ...others,
      cheapestPrice: { $gt: min | 0, $lt: max || 8000 },
    }).limit(req.query.limit);
    res.status(200).json(apartments);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Apartment.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const apartmentCount = await Apartment.countDocuments({
      type: "apartment",
    });
    res.status(200).json([{ type: "apartments", count: apartmentCount }]);
  } catch (err) {
    next(err);
  }
};

export const getApartmentRooms = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    const list = await Promise.all(
      apartment.rooms.map((room) => {
        return room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
