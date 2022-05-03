import { Request, Response } from 'express';
import User from '../models/models.user';

const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password, publicKey } = req.body;
        const user = new User({
            email,
            password,
            publicKey,
        });
        await user.save();
        res.send({
            message: 'User created successfully',
        });
    } catch (err) {
        res.status(500).send(err);
    }
    // return res.send('some crap');
};

const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                message: 'User not found',
            });
        } else if (user.password !== password) {
            return res.status(401).send({
                message: 'Password is incorrect',
            });
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

export { signUp, signIn };
