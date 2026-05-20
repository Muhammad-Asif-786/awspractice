pipeline {
    agent any

    environment {
        SERVER_IMAGE = "awspractice-server"
        CLIENT_IMAGE = "awspractice-client"
        SERVER_CONTAINER = "awspractice-server-container"
        CLIENT_CONTAINER = "awspractice-client-container"
        PORT = "1000"
        EMAIL = "masifmeyo786@gmail.com"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        /* =========================
           🔥 SERVER BUILD
        ========================= */
        stage('Build Server Image') {
            steps {
                sh """
                docker build -t ${SERVER_IMAGE} ./server
                """
            }
        }

        stage('Run Server Container') {
            steps {
                sh """
                docker stop ${SERVER_CONTAINER} || true
                docker rm ${SERVER_CONTAINER} || true

                docker run -d -p ${PORT}:${PORT} \
                --name ${SERVER_CONTAINER} ${SERVER_IMAGE}
                """
            }
        }

        /* =========================
           🔥 CLIENT BUILD
        ========================= */
        stage('Build Client Image') {
            steps {
                sh """
                docker build -t ${CLIENT_IMAGE} ./client
                """
            }
        }

        stage('Run Client Container') {
            steps {
                sh """
                docker stop ${CLIENT_CONTAINER} || true
                docker rm ${CLIENT_CONTAINER} || true

                docker run -d -p 80:80 \
                --name ${CLIENT_CONTAINER} ${CLIENT_IMAGE}
                """
            }
        }

        /* =========================
           📩 EMAIL NOTIFICATION
        ========================= */
        stage('Send Email') {
            steps {
                emailext (
                    subject: "🚀 MERN App Deployed Successfully",
                    body: """
                    Deployment Successful!

                    Backend: http://<EC2-IP>:${PORT}
                    Frontend: http://<EC2-IP>

                    Regards,
                    Jenkins CI/CD
                    """,
                    to: "${EMAIL}"
                )
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline Successful"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}


// pipeline {
//     agent any

//     environment {
//         CONTAINER_NAME = 'awspractice-container'
//         IMAGE_NAME = 'awspractice-image'
//         EMAIL = "masifmeyo786@gmail.com"
//         PORT = "1000"
//     }

//     stages {
//         stage('Clone Repo') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Muhammad-Asif-786/awspractice.git'
//             }
//         }
//         stage('Build Docker Image') {
//             steps {
//                 sh "docker build -t ${IMAGE_NAME} ."
//             }
//         }
//         stage('Stop & Remove Previous Container') {
//             steps {
//                 sh """
//                 docker stop ${CONTAINER_NAME} || true
//                 docker rm ${CONTAINER_NAME} || true
//                 """
//             }
//         }
//         stage('Docker Container Run') {
//             steps {
//                 sh """
//                 docker run -d -p ${PORT}:${PORT} \
//                 --name ${CONTAINER_NAME} ${IMAGE_NAME}
//                 """
//             }
//         }
//         stage('Send Email Notification') {
//             steps {
//                 emailext (
//                     subject: "Mern App Deployed Successful on EC2.!",
//                     body: """Your mern app deployed!
//                     http://51.20.191.176:${PORT}/                 
//                     """,
//                     to: "${EMAIL}"
//                 )
//             }
//         }
//     }
// }