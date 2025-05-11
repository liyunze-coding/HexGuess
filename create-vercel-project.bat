@echo off
echo Creating and linking Vercel project...

REM Unlink any existing project
vercel unlink --yes

REM Create a new project with a valid name
echo { "name": "hexguess-app", "version": 2, "buildCommand": "npm run build", "devCommand": "npm run dev", "installCommand": "npm install --no-optional --legacy-peer-deps", "framework": "nextjs", "outputDirectory": ".next" } > vercel.json

REM Link to the new project
vercel link --confirm --yes --project hexguess-app

echo Project created and linked successfully.
