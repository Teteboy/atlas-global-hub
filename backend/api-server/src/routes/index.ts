import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import servicesRouter from "./services";
import projectsRouter from "./projects";
import insightsRouter from "./insights";
import sectorsRouter from "./sectors";
import contactRouter from "./contact";
import statsRouter from "./stats";
import siteContentRouter from "./site_content";
import siteSettingsRouter from "./site_settings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(servicesRouter);
router.use(projectsRouter);
router.use(insightsRouter);
router.use(sectorsRouter);
router.use(contactRouter);
router.use(statsRouter);
router.use(siteContentRouter);
router.use(siteSettingsRouter);

export default router;
