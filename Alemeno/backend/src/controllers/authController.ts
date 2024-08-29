import { Request, Response } from 'express';
import Student from '../models/studentModel';

export const loginUser = async (req: Request, res: Response) => {
    const { email, name } = req.body;

    try {
        const student = await Student.findOne({
            email: { $regex: new RegExp(`^${email}$`, 'i') }, // Case insensitive search
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });

        if (!student) {
            return res.status(401).json({ message: 'Invalid email or name' });
        }

        return res.status(200).json({ message: 'Login successful', student });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Fetch student data by email function
export const getStudentByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;

    try {
        const student = await Student.findOne({
            email: { $regex: new RegExp(`^${email}$`, 'i') } // Case insensitive search
        });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json(student);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
