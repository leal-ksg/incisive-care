/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../database/mysql/models/user';

const saltRounds = 10;

export const userController = {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      return res.json(users);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on fetching services: ${err}` });
    }
  },

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide an ID to be found' });

      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });
      if (!user) return res.status(204).send();

      return res.json(user);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on finding a user: ${err}` });
    }
  },

  async create(req: Request, res: Response): Promise<any> {
    const { password, email, ...rest } = req.body;

    try {
      const registeredUser = await User.findOne({
        where: {
          email,
        },
      });

      if (registeredUser)
        return res
          .status(400)
          .send({ error: 'There is already a user with this e-mail' });

      const hash = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        password: hash,
        email,
        ...rest,
      });

      const { password: _, ...userWithoutPassword } = user.toJSON();

      return res.json(userWithoutPassword);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on creating a user: ${err}` });
    }
  },

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(400).send({ error: 'Provide an ID for the update' });

      if (!req.body.password) {
        delete req.body.password;
      } else {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      }

      await User.update(req.body, { where: { id } });

      return res.status(200).send({});
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on updating the user: ${err}`,
      });
    }
  },

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide the ID to be deleted' });

      await User.destroy({ where: { id } });

      return res.status(200).send({});
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on deleting the user: ${err}`,
      });
    }
  },

  async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) return res.sendStatus(501);

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user)
        return res.status(401).send({ error: 'Wrong password or e-mail' });

      const passwordIsValid = await bcrypt.compare(
        password,
        user.get('password') as string
      );

      if (!passwordIsValid)
        return res.status(401).send({ error: 'Wrong password or e-mail' });

      const accessToken = jwt.sign(
        {
          email: user.get('email'),
          role: user.get('role'),
          name: user.get('name'),
        },
        secret
      );

      const { password: _, ...userWithoutPassword } = user.toJSON();

      return res.json({ accessToken, user: userWithoutPassword });
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on login: ${err}`,
      });
    }
  },
};
