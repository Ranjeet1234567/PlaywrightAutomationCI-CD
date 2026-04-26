pipeline {
    agent any
    
    options {
        ansiColor('xterm')
    }

    stages {
        stage('build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('test') {
            parallel {
                stage('unit tests') {
                    agent {
                        docker {
                            image 'node:22-alpine'
                            reuseNode true
                        }
                    }
                    steps {
                        // Unit tests with Vitest
                        sh 'npx vitest run --reporter=verbose'
                    }
                }
                stage('integration tests') {
                    agent {
                        docker {
                            image 'mcr.microsoft.com/playwright:v1.59.1-jammy'
                            reuseNode true
                        }
                    }
                    steps {
                        sh 'npx playwright test'
                    }
                }
            }
        }

        stage('deploy') {
            agent {
                docker {
                    image 'alpine'
                }
            }
            steps {
                // Mock deployment which does nothing
                echo 'Mock deployment was successful!'
            }
        }

        stage('e2e') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.59.1-jammy'
                    reuseNode true
                }
            }
            environment {
                E2E_BASE_URL ='http://localhost:8080/login?from=%2F'
                //'https://spanish-cards.netlify.app/'
            }
            steps {
                sh 'npx playwright test'
            }
            post{
                always{
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        icon:'',
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: "Playwright HTML Report",
                        reportTitles:'',
                        useWrappeerFilesDirectory: true
                    ])
                    junit stdioRetention: 'All', testResults: 'reports-e2e/junit.xml'
                }
            }
        }
    }
}