import Villa from "../models/Villa.js";
 
export const createVilla = async (req, res, next) => {
  const newVilla = new Villa(req.body);

  try {
    const savedVilla = await newVilla.save();
    res.status(200).json(savedVilla);
  } catch (err) {
    next(err);
  }
};

export const updateVilla = async (req, res, next) => {
  try {
    const updatedVilla= await Villa.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVilla);
  } catch (err) {
    next(err);
  }
};

export const deleteVilla = async (req, res, next) => {
  try {
    await Villa.findByIdAndDelete(req.params.id);
    res.status(200).json("Villa has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getVilla = async (req, res, next) => {
  try {
    const villa  = await Villa.findById(req.params.id);
    res.status(200).json(villa);
  } catch (err) {
    next(err);
  }
};
export const getVillas = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const villas = await Villa.find({
      ...others,
      cheapestPrice: { $gt: min | 0, $lt: max || 28000 },
    }).limit(req.query.limit);
    res.status(200).json(villas);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Villa.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const villaCount = await Villa.countDocuments({ type: "villa" }); 
    res.status(200).json([
      { type: "villas", count: villaCount },
    ]);
  } catch (err) {
    next(err);
  }
};
