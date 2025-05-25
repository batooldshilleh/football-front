
# ⚽ Football Today - React Frontend App

A modern React app to display football leagues info, teams, and matches.  
Supports selecting leagues, viewing their details, teams, and upcoming matches.  
Deployed with Docker, Jenkins CI/CD, and Kubernetes.

---

## 📚 Table of Contents

- [About the Project](#about-the-project)
- [Live Features](#live-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Run Locally](#2-run-locally)
  - [3. Build & Run with Docker](#3-build--run-with-docker)
- [CI/CD Pipeline with Jenkins](#cicd-pipeline-with-jenkins)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [To Do](#to-do)
- [License](#license)
- [Author](#author)

---

## About the Project

This React app fetches football league information from a backend API and displays:

- League info (name, country, season, type, round)
- League teams with logos and details
- Upcoming league matches with time and venue

The app supports right-to-left Arabic layout and modern UI styles.

---

## Live Features

- Select league from dropdown
- View league info with logo and details
- View list of teams with logos and country info
- View upcoming matches with formatted date/time and venue
- Responsive design with cards and grid layout

---

## Tech Stack

| Technology         | Purpose               |
|--------------------|-----------------------|
| React 18           | Frontend Framework    |
| React Router DOM   | Routing               |
| Axios              | API Requests          |
| CSS (with RTL)     | Styling & Layout      |
| Docker             | Containerization      |
| Jenkins            | CI/CD Pipeline        |
| Kubernetes         | Deployment            |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/batooldshilleh/football-front.git
cd football-front
````

### 2. Run Locally

```bash
npm install
npm start
```

Open your browser at: `http://localhost:3000`

### 3. Build & Run with Docker

Build the Docker image:

```bash
docker build -t batoolsh2001/my-react-app .
```

Run the container:

```bash
docker run -p 80:80 batoolsh2001/my-react-app
```

---

## CI/CD Pipeline with Jenkins

The Jenkins pipeline includes the following stages:

* Checkout source code from GitHub
* Build Docker image
* Push Docker image to Docker Hub
* Deploy to Kubernetes cluster

### Example `Jenkinsfile` snippet:

```groovy
pipeline {
  agent any

  environment {
    DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
    IMAGE_NAME = 'batoolsh2001/my-react-app'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', credentialsId: 'github-pat', url: 'https://github.com/batooldshilleh/football-front.git'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME .'
      }
    }
    stage('Push to Docker Hub') {
      steps {
        script {
          sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
          sh 'docker push $IMAGE_NAME'
        }
      }
    }
    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig-minikube', variable: 'KUBECONFIG')]) {
          sh 'kubectl --kubeconfig=$KUBECONFIG apply -f frontend-deployment.yaml'
        }
      }
    }
  }
}
```

---

## Kubernetes Deployment

Use the following manifest to deploy the React app:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: batoolsh2001/my-react-app:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

Apply the deployment:

```bash
kubectl apply -f frontend-deployment.yaml
```

---

## Project Structure

```
football-front/
│
├── src/
│   ├── components/
│   │   └── LeagueSelector.js
│   ├── pages/
│   │   ├── LeagueInfo.js
│   │   ├── LeagueMatches.js
│   │   └── LeagueTeams.js
│   ├── App.js
│   └── App.css
│
├── Dockerfile
├── Jenkinsfile
├── frontend-deployment.yaml
├── package.json
└── README.md
```

---

## Screenshots

![Football Today Screenshot](https://github.com/user-attachments/assets/f6829d19-9400-46c3-b648-1dd55f43f28d)

---

## To Do

* Add unit and integration tests
* Connect with live backend API (or add mock server)
* Enhance UI responsiveness and accessibility
* Support multiple languages (Arabic/English)
* Add more football leagues and features

---

## License

This project is licensed under the MIT License.

---

## Author

Batool Shilleh
[GitHub](https://github.com/batooldshilleh) | [LinkedIn](https://www.linkedin.com/in/batool-shilleh/)

---

*Thank you for checking out this project! Feel free to contribute or open issues for suggestions.*

```

