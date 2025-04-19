import { Router } from "express";
import { appointmentController } from "./controllers/appointment-controller";
import { serviceController } from "./controllers/service-controller";
import { validateSchema } from "./middlewares/validate-schema";
import { createServiceSchema } from "../../common/validation/service/createServiceSchema";

const router = Router();

// APPOINTMENTS
router.get("/appointments", appointmentController.findAll);

// SERVICES
router.get("/services", serviceController.findAll);
router.post(
  "/services",
  (req, res, next) => validateSchema(req, res, next, createServiceSchema),
  serviceController.create
);

export default router;
