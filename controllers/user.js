import User from "../models/User.js";
import bcrypt from "bcryptjs";



export const updateUser = async (req, res, next) => {

    // try {
    //     const updatedUser = await User.findByIdAndUpdate(
    //         req.params.id,
    //         { $set: req.body},
    //          {new: true}
    //         );
    //         res.status(200).json(updatedUser);
    // } catch (err) {
    //     next(err);
    // }
    try {
        // Retrieve the updated user data from the request body
        const userData = req.body;

        // Check if the request includes a new password
        if (userData.password) {
            // Hash the new password using bcrypt
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(userData.password, salt);
            // Replace the plain-text password with the hashed password
            userData.password = hash;
        }

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userData },
            { new: true }
        );

        // If the user was not found, return an error
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the updated user
        res.status(200).json(updatedUser);
    } catch (err) {
        // Pass any errors to the error handling middleware
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(
            req.params.id,
            );
           res.status(200).json("User has been deleted")
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const getUsers = async (req, res, next) => {

    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        // next(err);
        res.status(500).json({ error: "Could not fetch users" });
    }
}