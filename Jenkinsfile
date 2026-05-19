pipeline {
    agent any

    environment {
        CONTAINER_NAME = 'awspractice-container'
        IMAGE_NAME = 'awspractice-image'
        EMAIL = "masifmeyo786@gmail.com"
        PORT = "1000"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Muhammad-Asif-786/awspractice.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }
        stage('Stop & Remove Previous Container') {
            steps {
                sh """
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                """
            }
        }
        stage('Docker Container Run') {
            steps {
                sh """
                docker run -d -p ${PORT}:${PORT} \
                --name ${CONTAINER_NAME} ${IMAGE_NAME}
                """
            }
        }
        stage('Send Email Notification') {
            steps {
                emailext (
                    subject: "Mern App Deployed Successful on EC2.!",
                    body: """Your mern app deployed!
                    http://51.20.191.176:${PORT}/                 
                    """,
                    to: "${EMAIL}"
                )
            }
        }
        
    }


}