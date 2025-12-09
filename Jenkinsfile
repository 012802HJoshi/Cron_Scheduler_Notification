pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage("Environment Setup") {
            steps {
               script {
                    withCredentials([file(credentialsId: 'ENV_PRODUCTION', variable: 'ENV_FILE')]) {
                        // Ensure the .env file exists and has the correct permissions
                        sh 'touch .env'
                        sh 'chown jenkins:jenkins .env'
                        sh 'chmod 664 .env'

                        // Copy the entire .env file instead of echoing a single variable
                        sh 'cp $ENV_FILE .env'
                    }
               }
            }
        }

         stage('Create Network If Not Exists') {
            steps {
                sh '''
                    echo "✅ Required network: db-network-mongo"

                    if ! docker network ls | grep -q db-network-mongo; then
                        echo "✅ Creating Docker network: db-network-mongo"
                        docker network create db-network-mongo
                    else
                        echo "✅ Docker network already exists"
                    fi
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t notification-cron:${BUILD_NUMBER} -t notification-cron:latest .'
            }
        }
        
        stage('Deploy') {
            steps {
               sh 'docker stop notification-cron || true'
               sh 'docker rm notification-cron || true'
               sh 'docker run -d --name notification-cron --network db-network-mongo -p 2025:2025 notification-cron:latest'
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
