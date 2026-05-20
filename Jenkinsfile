pipeline {
    agent any

    environment {
        DOCKER_HUB = "tharun118wizard"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/tharun118-wizard/PD-Devops-CICD.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh '''
                    docker build \
                    -t $DOCKER_HUB/pd-cicd-backend:$BUILD_NUMBER \
                    -t $DOCKER_HUB/pd-cicd-backend:latest .
                    '''
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh '''
                    docker build \
                    -t $DOCKER_HUB/pd-cicd-frontend:$BUILD_NUMBER \
                    -t $DOCKER_HUB/pd-cicd-frontend:latest .
                    '''
                }
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                sh '''
                docker push $DOCKER_HUB/pd-cicd-backend:$BUILD_NUMBER
                docker push $DOCKER_HUB/pd-cicd-backend:latest
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh '''
                docker push $DOCKER_HUB/pd-cicd-frontend:$BUILD_NUMBER
                docker push $DOCKER_HUB/pd-cicd-frontend:latest
                '''
            }
        }
       stage('Run Containers') {
    steps {
        sh '''
        docker stop pd-backend || true
        docker rm pd-backend || true

        docker stop pd-frontend || true
        docker rm pd-frontend || true

        docker run -d -p 5000:5000 \
        --name pd-backend \
        tharun118wizard/pd-cicd-backend:latest

        docker run -d -p 3001:3000 \
        --name pd-frontend \
        tharun118wizard/pd-cicd-frontend:latest
        '''
    }
}
    }
}
