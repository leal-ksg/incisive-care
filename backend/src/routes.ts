import { Router } from "express";
import { AppointmentController } from "./controllers/appointment-controller";

const router = Router();

router.get("/appointments", AppointmentController.findAll);
