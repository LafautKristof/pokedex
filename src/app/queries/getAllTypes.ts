import Type from "../models/Type";
import { TypeRes } from "../types/TypeTypes";

export const getAllTypes = async (): Promise<TypeRes[]> => {
    try {
        const types = await Type.find().lean<TypeRes[]>();
        return types;
    } catch (err) {
        console.error(err);
        return [];
    }
};
