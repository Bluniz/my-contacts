import express from "express";
import ContactController from "./app/controllers/ContactController.js";
import CategoryController from "./app/controllers/CategoryController.js";

const router = express.Router();

router.get("/contacts", ContactController.index);
router.get("/contacts/:id", ContactController.show);
router.delete("/contacts/:id", ContactController.delete);
router.post("/contacts/", ContactController.store);
router.put("/contacts/:id", ContactController.update);

router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.put("/categories/:id", CategoryController.update);
router.post("/categories", CategoryController.store);
router.delete("/categories/:id", CategoryController.delete);

export default router;
