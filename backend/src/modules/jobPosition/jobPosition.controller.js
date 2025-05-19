import * as jobPositionService from './jobPosition.service.js';

export const getAllJobPositions = async (req, res, next) => {
    try {
        const positions = await jobPositionService.getAll();
        res.status(200).json(positions);
    } catch (error) {
        next(error);
    }
};

export const getJobPositionById = async (req, res, next) => {
    try {
        const position = await jobPositionService.getById(req.params.id);
        if (!position) {
            return res.status(404).json({ message: "Job position not found" });
        }
        res.status(200).json(position);
    } catch (error) {
        next(error);
    }
};

export const createJobPosition = async (req, res, next) => {
    try {
        const newPosition = await jobPositionService.create(req.body);
        res.status(201).json(newPosition);
    } catch (error) {
        next(error);
    }
};

export const updateJobPosition = async (req, res, next) => {
    try {
        const updatedPosition = await jobPositionService.update(req.params.id, req.body);
        res.status(200).json(updatedPosition);
    } catch (error) {
        next(error);
    }
};

export const deleteJobPosition = async (req, res, next) => {
    try {
        await jobPositionService.deleteJobPosition(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
