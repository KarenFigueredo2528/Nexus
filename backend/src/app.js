import express from "express";
import bodyParser from "body-parser";
import cors from "cors";  // <--- Importar cors
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import morgan from "morgan";

import employeeRoutes from "./modules/employees/employees.routes.js";
import departmentRoutes from "./modules/departments/departments.routes.js";
import contractRoutes from "./modules/contracts/contracts.routes.js";
import socialSecurityRoutes from "./modules/socialSecurity/socialSecurity.routes.js";
import payrollRoutes from "./modules/payroll/payroll.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import absencesRoutes from "./modules/absences/absences.routes.js";
import jobPositionRoutes from "./modules/jobPosition/jobPosition.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

// Configurar CORS
app.use(cors());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/social-security", socialSecurityRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/job-positions", jobPositionRoutes);
app.use("/api/absences", absencesRoutes);

app.use(errorHandler);

export default app;