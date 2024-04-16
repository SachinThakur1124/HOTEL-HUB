import Cabin from "../models/Cabin.js";
 
export const createCabin = async (req, res, next) => {
  const newCabin = new Cabin(req.body);

  try {
    const savedCabin = await newCabin.save();
    res.status(200).json(savedCabin);
  } catch (err) {
    next(err);
  }
};

export const updateCabin = async (req, res, next) => {
  try {
    const updatedCabin= await Cabin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCabin);
  } catch (err) {
    next(err);
  }
};

export const deleteCabin = async (req, res, next) => {
  try {
    await Cabin.findByIdAndDelete(req.params.id);
    res.status(200).json("Cabin has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getCabin = async (req, res, next) => {
  try {
    const cabin  = await Cabin.findById(req.params.id);
    res.status(200).json(cabin);
  } catch (err) {
    next(err);
  }
};
export const getCabins = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const cabins = await Cabin.find({
      ...others,
      cheapestPrice: { $gt: min | 0, $lt: max || 8000 },
    }).limit(req.query.limit);
    res.status(200).json(cabins);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Cabin.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const cabinCount = await Cabin.countDocuments({ type: "cabin" }); 
    res.status(200).json([
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
