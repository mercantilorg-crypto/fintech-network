# 🚀 Deployment Guide - Fintech Platform

Guía completa para el deployment de la plataforma fintech en diferentes entornos.

## 📋 Tabla de Contenidos

- [Prerequisitos](#prerequisitos)
- [Configuración de Ambientes](#configuración-de-ambientes)
- [Deployment Local](#deployment-local)
- [Deployment con Docker](#deployment-con-docker)
- [Deployment en Cloud](#deployment-en-cloud)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoreo y Logs](#monitoreo-y-logs)
- [Rollback](#rollback)

## 🔧 Prerequisitos

### Software Requerido

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **MongoDB**: >= 6.0
- **Redis**: >= 7.0
- **Docker**: >= 24.0 (opcional)
- **Kubernetes**: >= 1.28 (para producción)

### Cuentas y Servicios

- [ ] Cuenta en proveedor de cloud (AWS/GCP/Azure)
- [ ] Cuenta de Stripe (para pagos)
- [ ] Cuenta de SendGrid (para emails)
- [ ] Cuenta de Twilio (para SMS)
- [ ] Cuenta de OneSignal (para push notifications)
- [ ] Container registry (Docker Hub, ECR, GCR)

## ⚙️ Configuración de Ambientes

### Development

```bash
# Backend
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fintech-dev
REDIS_URL=redis://localhost:6379

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_ENV=development
```

### Staging

```bash
# Backend
NODE_ENV=staging
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/fintech-staging
REDIS_URL=redis://staging-redis:6379

# Frontend
NEXT_PUBLIC_API_URL=https://api-staging.fintech-platform.com/api/v1
NEXT_PUBLIC_ENV=staging
```

### Production

```bash
# Backend
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/fintech-prod
REDIS_URL=redis://prod-redis:6379

# Frontend
NEXT_PUBLIC_API_URL=https://api.fintech-platform.com/api/v1
NEXT_PUBLIC_ENV=production
```

## 💻 Deployment Local

### Con npm

```bash
# 1. Instalar dependencias
cd backend && npm install
cd ../frontend && npm install
cd ../mobile && npm install

# 2. Configurar variables de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
cp mobile/.env.example mobile/.env

# Editar los archivos .env con tus valores

# 3. Iniciar servicios
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Mobile (opcional)
cd mobile
npm start
```

## 🐳 Deployment con Docker

### Docker Compose (Desarrollo)

```bash
# 1. Configurar variables de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 2. Construir y levantar servicios
docker-compose up -d

# 3. Ver logs
docker-compose logs -f

# 4. Detener servicios
docker-compose down

# 5. Limpiar volúmenes (¡cuidado con datos!)
docker-compose down -v
```

### Docker Production Build

```bash
# Backend
cd backend
docker build -t fintech-backend:latest .
docker run -p 3000:3000 \
  -e MONGODB_URI=$MONGODB_URI \
  -e REDIS_URL=$REDIS_URL \
  -e JWT_SECRET=$JWT_SECRET \
  fintech-backend:latest

# Frontend
cd frontend
docker build -t fintech-frontend:latest \
  --build-arg NEXT_PUBLIC_API_URL=$API_URL .
docker run -p 3001:3001 fintech-frontend:latest
```

## ☁️ Deployment en Cloud

### AWS Deployment

#### 1. ECS (Elastic Container Service)

```bash
# Install AWS CLI and ECS CLI
brew install awscli ecs-cli

# Configure AWS credentials
aws configure

# Create ECS cluster
ecs-cli up --cluster fintech-cluster --region us-east-1

# Push images to ECR
aws ecr create-repository --repository-name fintech-backend
aws ecr create-repository --repository-name fintech-frontend

# Build and push
docker tag fintech-backend:latest $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/fintech-backend:latest
docker push $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/fintech-backend:latest

# Deploy with ECS
ecs-cli compose --file docker-compose.production.yml service up
```

#### 2. EC2 Manual Setup

```bash
# Connect to EC2
ssh -i key.pem ubuntu@ec2-instance

# Install dependencies
sudo apt update
sudo apt install -y docker.io docker-compose nodejs npm mongodb redis

# Clone repository
git clone https://github.com/your-org/fintech-platform.git
cd fintech-platform

# Configure environment
cp backend/.env.example backend/.env
# Edit .env with production values

# Start with Docker Compose
docker-compose -f docker-compose.production.yml up -d
```

### GCP Deployment

#### 1. Cloud Run

```bash
# Install gcloud CLI
brew install --cask google-cloud-sdk

# Authenticate
gcloud auth login

# Set project
gcloud config set project fintech-platform

# Build and deploy Backend
gcloud builds submit --tag gcr.io/fintech-platform/backend ./backend
gcloud run deploy backend \
  --image gcr.io/fintech-platform/backend \
  --platform managed \
  --region us-central1 \
  --set-env-vars MONGODB_URI=$MONGODB_URI

# Build and deploy Frontend
gcloud builds submit --tag gcr.io/fintech-platform/frontend ./frontend
gcloud run deploy frontend \
  --image gcr.io/fintech-platform/frontend \
  --platform managed \
  --region us-central1
```

### Kubernetes (Production)

#### 1. Setup Cluster

```bash
# Create cluster (AWS EKS example)
eksctl create cluster \
  --name fintech-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 2 \
  --nodes-max 4
```

#### 2. Deploy Application

```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: fintech-backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: backend-secrets
              key: mongodb-uri
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: LoadBalancer
  selector:
    app: backend
  ports:
  - port: 80
    targetPort: 3000
```

```bash
# Apply configurations
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Create secrets
kubectl create secret generic backend-secrets \
  --from-literal=mongodb-uri=$MONGODB_URI \
  --from-literal=jwt-secret=$JWT_SECRET

# Check status
kubectl get pods
kubectl get services
```

## 🔄 CI/CD Pipeline

### GitHub Actions

El pipeline está configurado en `.github/workflows/ci.yml` y se ejecuta automáticamente en:

- Push a `main` o `develop`
- Pull requests

**Stages:**
1. ✅ Linting y type checking
2. 🧪 Tests unitarios e integración
3. 🔒 Security audit
4. 🐳 Build Docker images
5. 🚀 Deploy (solo en main)

### Configurar Secrets

En GitHub, ve a Settings > Secrets y agrega:

```
DOCKER_USERNAME
DOCKER_PASSWORD
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
MONGODB_URI
REDIS_URL
JWT_SECRET
STRIPE_SECRET_KEY
SENDGRID_API_KEY
```

### Manual Deploy

```bash
# Trigger deployment
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# O usar GitHub Actions workflow_dispatch
gh workflow run deploy.yml --ref main
```

## 📊 Monitoreo y Logs

### Configurar Logging

```javascript
// backend/src/config/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// In production, use cloud logging
if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.CloudWatch({
    // AWS CloudWatch config
  }));
}
```

### Métricas con Prometheus

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'backend'
    static_configs:
      - targets: ['backend:3000']
```

### Alertas

```yaml
# alertmanager.yml
route:
  receiver: 'team-notifications'

receivers:
  - name: 'team-notifications'
    email_configs:
      - to: 'team@fintech-platform.com'
    slack_configs:
      - api_url: $SLACK_WEBHOOK_URL
        channel: '#alerts'
```

## 🔙 Rollback

### Kubernetes Rollback

```bash
# Ver historial de deployments
kubectl rollout history deployment/backend

# Rollback a versión anterior
kubectl rollout undo deployment/backend

# Rollback a versión específica
kubectl rollout undo deployment/backend --to-revision=2

# Verificar status
kubectl rollout status deployment/backend
```

### Docker Rollback

```bash
# Listar imágenes disponibles
docker images fintech-backend

# Cambiar a versión anterior
docker stop fintech-backend
docker run -d --name fintech-backend \
  fintech-backend:previous-version
```

### Database Rollback

```bash
# Restaurar backup de MongoDB
mongorestore --uri=$MONGODB_URI --archive=backup-2025-11-10.gz

# Restaurar backup de Redis
redis-cli --rdb /path/to/backup.rdb
```

## 🔐 Security Checklist

Antes de deployment a producción:

- [ ] Todas las variables de entorno están configuradas
- [ ] Secrets no están en el código
- [ ] TLS/SSL está habilitado
- [ ] Firewall configurado correctamente
- [ ] Database backups automáticos habilitados
- [ ] Rate limiting configurado
- [ ] CORS configurado apropiadamente
- [ ] Security headers habilitados (Helmet)
- [ ] Input validation en todos los endpoints
- [ ] Logs de auditoría habilitados
- [ ] Monitoring y alertas configurados
- [ ] Plan de disaster recovery documentado

## 📝 Comandos Útiles

```bash
# Ver logs de un servicio
docker-compose logs -f backend

# Acceder a shell de contenedor
docker exec -it fintech-backend /bin/sh

# Ver recursos de Kubernetes
kubectl top pods
kubectl top nodes

# Escalar deployment
kubectl scale deployment backend --replicas=5

# Ver logs en Kubernetes
kubectl logs -f deployment/backend

# Port forwarding para debug
kubectl port-forward service/backend 3000:80
```

## 🆘 Troubleshooting

### Backend no inicia

```bash
# Verificar logs
docker logs fintech-backend

# Verificar conectividad a MongoDB
docker exec -it fintech-backend sh
ping mongodb
nc -zv mongodb 27017

# Verificar variables de entorno
docker exec fintech-backend env
```

### Frontend no puede conectar a API

1. Verificar CORS en backend
2. Verificar `NEXT_PUBLIC_API_URL`
3. Verificar network en Docker Compose
4. Revisar logs del navegador

### Database connection issues

```bash
# Test MongoDB connection
mongosh $MONGODB_URI

# Test Redis connection
redis-cli -u $REDIS_URL ping
```

## 📞 Soporte

Para problemas de deployment:
- 📧 Email: devops@fintech-platform.com
- 💬 Slack: #deployment-support
- 📖 Docs: https://docs.fintech-platform.com

---

**Última actualización:** 2025-11-10
