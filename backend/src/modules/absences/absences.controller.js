import * as absencesService from './absences.service.js';

export const getAllAbsences = async (req, res, next) => {
    try {
        const absences = await absencesService.getAll();
        res.status(200).json(absences);
    } catch (error) {
        next(error);
    }
};

export const getAbsenceById = async (req, res, next) => {
    try {
        const absence = await absencesService.getById(req.params.id);
        if (!absence) return res.status(404).json({ message: "Absence not found" });
        res.status(200).json(absence);
    } catch (error) {
        next(error);
    }
};

export const createAbsence = async (req, res, next) => {
    try {
        const newAbsence = await absencesService.create(req.body);
        res.status(201).json(newAbsence);
    } catch (error) {
        next(error);
    }
};

export const updateAbsence = async (req, res, next) => {
    try {
        const updatedAbsence = await absencesService.update(req.params.id, req.body);
        res.status(200).json(updatedAbsence);
    } catch (error) {
        next(error);
    }
};

export const deleteAbsence = async (req, res, next) => {
    try {
        await absencesService.deleteAbsence(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
