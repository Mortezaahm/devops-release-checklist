### Production Environment Configuration

The production environment is configured through Render environment variables.

| Variable | Production value         | Purpose                               |
| -------- | ------------------------ | ------------------------------------- |
| APP_ENV  | production               | Identifies the production environment |
| APP_NAME | DevOps Release Checklist | Defines the application name          |

These variables are configured in the Render Dashboard and injected into the Docker container at runtime.
They are not hardcoded in the application source code.
This allows the same Docker image to run with different environment configurations without rebuilding the application specifically for each environment.

## Cost-aware Operations

### 1. Which Render plan are you using?
The application uses Render's Free web service compute plan.
The Free plan provides 0.1 CPU and 512 MB RAM. It also has a shared monthly allocation of 750 free instance hours per workspace.

### 2. Why did you choose this plan?
I chose the Free plan because this project is an educational application with a relatively small workload. The main purpose is to demonstrate Docker containerization, CI/CD automation, environment configuration and cloud deployment.
The application does not require a database or significant computing resources. Therefore, a paid compute plan is not necessary for this demonstration.

### 3. Which factors affect the operating cost?
The main cost factors:
- CPU and RAM allocation.
- Number of running service instances.
- Service running time.
- Outbound bandwidth.
- Build pipeline usage.
- Additional storage and managed database services.
Paid compute plans are billed according to the selected resources and actual usage.

### 4. How can resource usage be reduced?
Resource usage can be reduced by several things like using a multi-stage Docker build and selecting a lightweight Node.js base image. it can be also by excluding unnecessary files with `.dockerignore` and installing dependencies with `npm ci`. Avoiding unnecessary server-side processing and using browser storage for data that does not require server persistence as well as monitoring application logs and resource usage help this purpose.

### 5. What limitations does the current deployment have?
The Free web service has several limitations. It spins down after 15 minutes without incoming traffic and the first request after inactivity can take approximately one minute to respond. It has also limited CPU and RAM resources which supports only one running instance. It does not support persistent disks or horizontal scaling.
The application also stores checklist data in browser localStorage. Therefore, data is not shared between different users or devices.

### 6. What would you change if the application received significantly more users?
I would consider some improvements like upgrading to a paid compute plan with more CPU and RAM. In addition I would introduce a PostgreSQL database for shared and persistent data and implement user authentication and authorization. Moreover, I would add database connection pooling and query optimization.
I would also introduce caching and CDN-based delivery where appropriate and finally improve monitoring and add automated testing to the development pipeline.
These changes would improve scalability, performance, availability and data reliability.


## Deployment Evidence

### GitHub Actions

![Successful CI/CD pipeline](docs/screenshots/github-actions-success.png)

### Render Deployment

![Successful Render deployment](docs/screenshots/render-deployment-live.png)

### Application Logs

![Render application logs](docs/screenshots/render-logs-info-error.png)
