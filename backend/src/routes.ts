import { Router } from "express";
import { appointmentController } from "./controllers/appointment-controller";
import { serviceController } from "./controllers/service-controller";
import { validateSchema } from "./middlewares/validate-schema";
import { createServiceSchema } from "../../common/validation/service/create-service-schema";
import { createAppointmentSchema } from "../../common/validation/appointment/create-appointment-schema";
import { createDentistSchema } from "../../common/validation/dentist/create-dentist-schema";
import { dentistController } from "./controllers/dentist-controller";
import { createPatientSchema } from "../../common/validation/patient/create-patient-schema";
import { patientController } from "./controllers/patient-controller";
import { userController } from "./controllers/user-controller";
import { createUserSchema } from "../../common/validation/user/create-user-schema";

const router = Router();

// APPOINTMENTS
router.get("/appointments", appointmentController.findAll);
router.get("/appointments/count", appointmentController.getAppointmentsCount);
router.get("/appointments/:id", appointmentController.findOne);
router.post(
  "/appointments",
  (req, res, next) => validateSchema(req, res, next, createAppointmentSchema),
  appointmentController.create
);
router.put("/appointments/:id", appointmentController.update);
router.delete("/appointments/:id", appointmentController.delete);

// SERVICES
router.get("/services", serviceController.findAll);
router.get("/services/:id", serviceController.findOne);
router.post(
  "/services",
  (req, res, next) => validateSchema(req, res, next, createServiceSchema),
  serviceController.create
);
router.put("/services/:id", serviceController.update);
router.delete("/services/:id", serviceController.delete);

// DENTISTS
router.get("/dentists", dentistController.findAll);
router.get("/dentists/:id", dentistController.findOne);
router.post(
  "/dentists",
  (req, res, next) => validateSchema(req, res, next, createDentistSchema),
  dentistController.create
);
router.put("/dentists/:id", dentistController.update);
router.delete("/dentists/:id", dentistController.delete);

// PATIENTS
router.get("/patients", patientController.findAll);
router.get("/patients/:idType/:id", patientController.findOne);
router.post(
  "/patients",
  (req, res, next) => validateSchema(req, res, next, createPatientSchema),
  patientController.create
);
router.put("/patients/:id", patientController.update);
router.delete("/patients/:id", patientController.delete);

// USERS
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.post(
  "/users",
  (req, res, next) => validateSchema(req, res, next, createUserSchema),
  userController.create
);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

export default router;
