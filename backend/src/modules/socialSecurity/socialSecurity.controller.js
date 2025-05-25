import * as socialSecurityService from "./socialSecurity.service.js";

export const getAllSocialSecurity = async (req, res, next) => {
  try {
    const records = await socialSecurityService.getAll();
    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};

export const getSocialSecurityById = async (req, res, next) => {
  try {
    const record = await socialSecurityService.getById(req.params.id);
    if (!record) {
      return res
        .status(404)
        .json({ message: "Social security record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};

export const createSocialSecurity = async (req, res, next) => {
  console.log("Creating social security record with data:", req.body);

  try {
    const newRecord = await socialSecurityService.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("❌ Error al registrar seguridad social:", error);
    next(error);
  }
};

export const updateSocialSecurity = async (req, res, next) => {
  try {
    const updatedRecord = await socialSecurityService.update(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};

export const deleteSocialSecurity = async (req, res, next) => {
  try {
    await socialSecurityService.deleteRecord(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
