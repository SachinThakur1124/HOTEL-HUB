import Resort from "../models/Resort.js";

export const createResort = async (req, res, next) => {
  const newResort = new Resort(req.body);

  try {
    const savedResort = await newResort.save();
    res.status(200).json(savedResort);
  } catch (err) {
    next(err);
  }
};

export const updateResort = async (req, res, next) => {
  try {
    const updatedResort= await Resort.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedResort);
  } catch (err) {
    next(err);
  }
};

export const deleteResort = async (req, res, next) => {
  try {
    await Resort.findByIdAndDelete(req.params.id);
    res.status(200).json("Resort has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getResort = async (req, res, next) => {
  try {
    const resort  = await Resort.findById(req.params.id);
    res.status(200).json(resort);
  } catch (err) {
    next(err);
  }
};
export const getResorts = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const resorts = await Resort.find({
      ...others,
      cheapestPrice: { $gt: min | 0, $lt: max || 18000 },
    }).limit(req.query.limit);
    res.status(200).json(resorts);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Resort.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const resortCount = await Resort.countDocuments({ type: "resort" }); 
    res.status(200).json([
      { type: "resorts", count: resortCount },
    ]);
  } catch (err) {
    next(err);
  }
};
