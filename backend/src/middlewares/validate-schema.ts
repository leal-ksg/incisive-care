import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "yup";

export const validateSchema = async (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: ObjectSchema<any>
): Promise<any> => {
  try {
    req.body = await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      errors: (error as ValidationError).errors,
    });
  }
};
