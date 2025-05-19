import * as contractService from './contracts.service.js';

export const getAllContracts = async (req, res, next) => {
    try {
        const contracts = await contractService.getAll();
        res.status(200).json(contracts);
    } catch (error) {
        next(error);
    }
};

export const getContractById = async (req, res, next) => {
    try {
        const contract = await contractService.getById(req.params.id);
        if (!contract) {
            return res.status(404).json({ message: "Contract not found" });
        }
        res.status(200).json(contract);
    } catch (error) {
        next(error);
    }
};

export const createContract = async (req, res, next) => {
    try {
        const newContract = await contractService.create(req.body);
        res.status(201).json(newContract);
    } catch (error) {
        next(error);
    }
};

export const updateContract = async (req, res, next) => {
    try {
        const updatedContract = await contractService.update(req.params.id, req.body);
        res.status(200).json(updatedContract);
    } catch (error) {
        next(error);
    }
};

export const deleteContract = async (req, res, next) => {
    try {
        await contractService.deleteContract(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
