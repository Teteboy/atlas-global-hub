import { Router, type IRouter } from "express";
import healthRouter from "./health";
import servicesRouter from "./services";
import projectsRouter from "./projects";
import insightsRouter from "./insights";
import sectorsRouter from "./sectors";
import contactRouter from "./contact";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(servicesRouter);
router.use(projectsRouter);
router.use(insightsRouter);
router.use(sectorsRouter);
router.use(contactRouter);
router.use(statsRouter);

export default router;
