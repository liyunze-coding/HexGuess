pipeline {
    agent any

    environment {
        SONAR_TOKEN  = credentials('SONAR_TOKEN')
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
    }

    stages {
        stage('Checkout') { 
            steps { 
                git branch: 'main', url: 'https://github.com/liyunze-coding/HexGuess.git' 
            } 
        } 
        
        stage('Install dependencies') {
            steps {
                bat 'npm install'
                
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test'
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                bat '''
                set "SCANNER_DIR=sonar-scanner\\sonar-scanner-7.1.0.4889-windows-x64"
                if "%FORCE_INSTALL%"=="true" (
                    echo FORCE_INSTALL is true — removing existing scanner...
                    rmdir /s /q "%SCANNER_DIR%"
                )
                
                if not exist "%SCANNER_DIR%" (
                    echo Downloading and extracting SonarScanner...
                    powershell -Command "Invoke-WebRequest -Uri https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-7.1.0.4889-windows-x64.zip -OutFile sonar-scanner.zip"
                    powershell -Command "Expand-Archive -Path sonar-scanner.zip -DestinationPath sonar-scanner"
                ) else (
                    echo SonarScanner already exists, skipping download.
                )
        
                "%SCANNER_DIR%\\bin\\sonar-scanner.bat" -Dsonar.token=%SONAR_TOKEN% -Dsonar.projectKey=liyunze-coding_HexGuess -Dsonar.organization=liyunze-coding
                '''
            }
        }

        stage('Security Analysis') {
            steps {
                script {
                    def status = bat(script: '''
                        set "DEPENDENCY_CHECK_DIR=dependency-check"
                        if not exist "%DEPENDENCY_CHECK_DIR%" (
                            echo Downloading OWASP Dependency-Check...
                            powershell -Command "Invoke-WebRequest -Uri https://github.com/dependency-check/DependencyCheck/releases/download/v12.1.1/dependency-check-12.1.1-release.zip -OutFile dependency-check.zip"
                            powershell -Command "Expand-Archive -Path dependency-check.zip -DestinationPath dependency-check"
                        ) else (
                            echo Dependency-Check already exists, skipping download.
                        )

                        echo Running Dependency-Check...

                        "%DEPENDENCY_CHECK_DIR%\\dependency-check\\bin\\dependency-check.bat" --scan . --out .
                    ''', returnStatus: true)

                    if (status in [2, 3]) {
                        error "Dependency-Check failed with critical exit code ${status}. Failing build."
                    } else if (status != 0) {
                        echo "Dependency-Check returned non-critical code ${status}. Continuing build."
                    }
                }
            }
        }
        
        stage('Install Vercel CLI') {
            steps {
                bat '''
                echo Installing Vercel CLI...
                npm install -g vercel
                '''
            }
        }

        stage('Deploy to Staging via Vercel') {
            steps {
                // Clean build artifacts before deploying
                bat '''
                if exist node_modules rmdir /s /q node_modules
                if exist .next rmdir /s /q .next
                if exist out rmdir /s /q out
                '''
                
                // Deploy to the linked project
                bat 'vercel --no-color --token %VERCEL_TOKEN% deploy --yes --name hexguess'
            }
        }

        stage('Manual Approval') {
            steps {
                input message: 'Deploy to production?', ok: 'Approve'
            }
        }

        stage('Deploy to Prod via Vercel') {
            steps {
                // Deploy to the linked project
                bat 'vercel --no-color --token %VERCEL_TOKEN% deploy --prod --yes --name hexguess'
            }
        }

        stage('Monitoring') {
            steps {
                // Monitor the project
                echo 'Monitoring on https://vercel.com/liyunzecodings-projects/hexguess/analytics?environment=all'
            }
        }
    }
}
