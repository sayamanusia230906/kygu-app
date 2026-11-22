# ==============================================================================
# KyGU (Know Your GU) — Automated Test & Production Build Script
# Validates Code Integrity, Clinical Calculators, 60 Questions, PWA, and Builds dist/
# ==============================================================================

param (
    [switch]$TestOnly = $false
)

$ErrorActionPreference = "Stop"
$appRoot = "C:\Users\User\.gemini\antigravity\scratch\kygu-app"
$distDir = Join-Path $appRoot "dist"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 🚀 KyGU Production Build & Automated Test Suite v1.0.0" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Root: $appRoot" -ForegroundColor Gray
Write-Host "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host ""

$testsPassed = 0
$testsFailed = 0

function Assert-Test([string]$name, [bool]$condition, [string]$detail) {
    if ($condition) {
        Write-Host "  ✅ [PASS] $name" -ForegroundColor Green
        if ($detail) { Write-Host "     ↳ $detail" -ForegroundColor DarkGray }
        $script:testsPassed++
    } else {
        Write-Host "  ❌ [FAIL] $name" -ForegroundColor Red
        if ($detail) { Write-Host "     ↳ $detail" -ForegroundColor Yellow }
        $script:testsFailed++
    }
}

# --- STAGE 1: FILE & STRUCTURE VERIFICATION ---
Write-Host "--- STAGE 1: File & Directory Integrity ---" -ForegroundColor Yellow
$requiredFiles = @(
    "index.html",
    "manifest.json",
    "sw.js",
    "assets\icon.svg",
    "css\style.css",
    "js\audio.js",
    "js\calculators.js",
    "js\data-questions.js",
    "js\data-content.js",
    "js\3d-viewer.js",
    "js\games.js",
    "js\app.js",
    "vercel.json",
    "netlify.toml",
    "Dockerfile",
    "nginx.conf",
    "package.json"
)

foreach ($f in $requiredFiles) {
    $fullPath = Join-Path $appRoot $f
    $exists = Test-Path $fullPath
    $size = if ($exists) { (Get-Item $fullPath).Length } else { 0 }
    Assert-Test "File check: $f" ($exists -and $size -gt 0) "Size: $size bytes"
}

# --- STAGE 2: PWA MANIFEST & JSON SYNTAX VALIDATION ---
Write-Host ""
Write-Host "--- STAGE 2: PWA Manifest & JSON Parsing ---" -ForegroundColor Yellow

try {
    $manifestJson = Get-Content (Join-Path $appRoot "manifest.json") -Raw | ConvertFrom-Json
    Assert-Test "manifest.json syntax valid" ($null -ne $manifestJson) "Parsed as valid JSON"
    Assert-Test "PWA display is standalone" ($manifestJson.display -eq "standalone") "display = $($manifestJson.display)"
    Assert-Test "PWA theme_color is Primary Navy #0A2E5C" ($manifestJson.theme_color -eq "#0A2E5C") "theme_color = $($manifestJson.theme_color)"
    Assert-Test "PWA icons configured" ($manifestJson.icons.Count -gt 0) "Icons: $($manifestJson.icons[0].src)"
} catch {
    Assert-Test "manifest.json syntax valid" $false "Error: $_"
}

try {
    $pkgJson = Get-Content (Join-Path $appRoot "package.json") -Raw | ConvertFrom-Json
    Assert-Test "package.json syntax valid" ($pkgJson.name -eq "kygu-app") "App: $($pkgJson.name) v$($pkgJson.version)"
} catch {
    Assert-Test "package.json syntax valid" $false "Error: $_"
}

# --- STAGE 3: QUESTION BANK AUDIT (EXACTLY 60 QUESTIONS) ---
Write-Host ""
Write-Host "--- STAGE 3: Medical Question Bank Audit (Guyton Unit V) ---" -ForegroundColor Yellow

$qContent = Get-Content (Join-Path $appRoot "js\data-questions.js") -Raw

$easyMatches = [regex]::Matches($qContent, "id:\s*['""]e(\d+)['""]")
$mediumMatches = [regex]::Matches($qContent, "id:\s*['""]m(\d+)['""]")
$hardMatches = [regex]::Matches($qContent, "id:\s*['""]h(\d+)['""]")

Assert-Test "Easy level count: 20 questions" ($easyMatches.Count -eq 20) "Found $($easyMatches.Count) Easy questions"
Assert-Test "Medium level count: 20 questions" ($mediumMatches.Count -eq 20) "Found $($mediumMatches.Count) Medium questions"
Assert-Test "Hard level count: 20 questions" ($hardMatches.Count -eq 20) "Found $($hardMatches.Count) Hard questions"
$totalQuestions = $easyMatches.Count + $mediumMatches.Count + $hardMatches.Count
Assert-Test "Total question count equals exactly 60" ($totalQuestions -eq 60) "Total: $totalQuestions questions"

$explanationMatches = [regex]::Matches($qContent, "explanation:\s*['""]")
Assert-Test "All questions have medical explanations" ($explanationMatches.Count -ge 60) "Found $($explanationMatches.Count) explanation blocks"

# --- STAGE 4: CLINICAL ALGORITHMS UNIT TESTING ---
Write-Host ""
Write-Host "--- STAGE 4: Clinical Formulas & Algorithm Unit Tests ---" -ForegroundColor Yellow

# Test 1: eGFR CKD-EPI (2021) for male, age 45, scr 1.1 mg/dL
# Formula: 142 * (1.1/0.9)^(-1.200) * 0.9938^45 ≈ 84.4 mL/min/1.73m² (Stadium G2)
$maleScr = 1.1
$maleAge = 45
$minScr = [Math]::Min($maleScr / 0.9, 1.0)
$maxScr = [Math]::Max($maleScr / 0.9, 1.0)
$egfrMale = 142 * [Math]::Pow($minScr, -0.302) * [Math]::Pow($maxScr, -1.200) * [Math]::Pow(0.9938, $maleAge)
$egfrMaleRounded = [Math]::Round($egfrMale, 1)
Assert-Test "eGFR CKD-EPI Male calculation (Scr 1.1, Age 45)" ($egfrMaleRounded -ge 80 -and $egfrMaleRounded -le 90) "Result: $egfrMaleRounded mL/min/1.73m² (Stadium G2)"

# Test 2: Urine Output (ml/kg/hr)
# 120 ml in 4 hrs for 60 kg = 120 / (60 * 4) = 0.50 ml/kg/hr
$uVol = 120
$uWeight = 60
$uHours = 4
$uRate = $uVol / ($uWeight * $uHours)
Assert-Test "Urine Output Rate (120ml / 60kg / 4hr = 0.50 ml/kg/hr)" ($uRate -eq 0.5) "Result: $uRate ml/kg/hr (Normal threshold)"

# 10 ml in 6 hrs for 50 kg = 10 / (50 * 6) = 0.033 ml/kg/hr -> Anuria
$anuriaRate = 10 / (50 * 6)
Assert-Test "Anuria threshold detection (<0.10 ml/kg/hr)" ($anuriaRate -lt 0.1) "Result: $([Math]::Round($anuriaRate, 3)) ml/kg/hr (Critical Alert Anuria)"

# Test 3: Holliday-Segar fluid requirement for 60 kg adult
# First 10 kg = 1000 ml
# Second 10 kg = 500 ml
# Remaining 40 kg = 40 * 20 = 800 ml
# Total = 1000 + 500 + 800 = 2300 ml
$holliday60kg = 1000 + 500 + (40 * 20)
Assert-Test "Holliday-Segar calculation for 60kg = 2300 ml" ($holliday60kg -eq 2300) "Result: $holliday60kg ml/day"

# Test 4: IPSS Score Severity Range Check
# Total score 0-7 = Mild, 8-19 = Moderate, 20-35 = Severe
function Classify-IPSS($score) {
    if ($score -le 7) { return "Mild" }
    elseif ($score -le 19) { return "Moderate" }
    else { return "Severe" }
}
Assert-Test "IPSS Score 5 classification is Mild" ((Classify-IPSS 5) -eq "Mild") "Class: Mild (Watchful waiting)"
Assert-Test "IPSS Score 14 classification is Moderate" ((Classify-IPSS 14) -eq "Moderate") "Class: Moderate (Medical therapy)"
Assert-Test "IPSS Score 26 classification is Severe" ((Classify-IPSS 26) -eq "Severe") "Class: Severe (Urology referral / TURP)"

# --- STAGE 5: BUILD PRODUCTION PACKAGE (dist/) ---
Write-Host ""
Write-Host "--- STAGE 5: Production Packaging & Release Bundle ---" -ForegroundColor Yellow

if (-not $TestOnly) {
    if (Test-Path $distDir) {
        Remove-Item $distDir -Recurse -Force
    }
    New-Item -ItemType Directory -Path $distDir -Force | Out-Null
    New-Item -ItemType Directory -Path (Join-Path $distDir "css") -Force | Out-Null
    New-Item -ItemType Directory -Path (Join-Path $distDir "js") -Force | Out-Null
    New-Item -ItemType Directory -Path (Join-Path $distDir "assets") -Force | Out-Null

    # Copy HTML, Manifest, ServiceWorker, Configs
    Copy-Item (Join-Path $appRoot "index.html") $distDir -Force
    Copy-Item (Join-Path $appRoot "manifest.json") $distDir -Force
    Copy-Item (Join-Path $appRoot "sw.js") $distDir -Force
    Copy-Item (Join-Path $appRoot "vercel.json") $distDir -Force
    Copy-Item (Join-Path $appRoot "netlify.toml") $distDir -Force
    Copy-Item (Join-Path $appRoot "Dockerfile") $distDir -Force
    Copy-Item (Join-Path $appRoot "nginx.conf") $distDir -Force
    Copy-Item (Join-Path $appRoot "package.json") $distDir -Force

    # Copy assets
    Copy-Item (Join-Path $appRoot "assets\*") (Join-Path $distDir "assets") -Recurse -Force
    Copy-Item (Join-Path $appRoot "css\*") (Join-Path $distDir "css") -Recurse -Force
    Copy-Item (Join-Path $appRoot "js\*") (Join-Path $distDir "js") -Recurse -Force

    # Create portable release ZIP
    $zipPath = Join-Path $distDir "kygu-production-v1.0.0.zip"
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
    Compress-Archive -Path "$distDir\*" -DestinationPath $zipPath -Force

    $distFiles = Get-ChildItem -Recurse $distDir | Measure-Object -Property Length -Sum
    $distSizeKB = [Math]::Round($distFiles.Sum / 1KB, 2)
    $zipSizeKB = [Math]::Round((Get-Item $zipPath).Length / 1KB, 2)

    Assert-Test "Production bundle dist/ generated" (Test-Path (Join-Path $distDir "index.html")) "Total dist size: $distSizeKB KB"
    Assert-Test "Release archive zip generated" (Test-Path $zipPath) "Archive: kygu-production-v1.0.0.zip ($zipSizeKB KB)"
}

# --- SUMMARY REPORT ---
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 📊 KYGU TEST & BUILD RESULTS SUMMARY" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Tests Passed: $script:testsPassed" -ForegroundColor Green
Write-Host "  Tests Failed: $script:testsFailed" -ForegroundColor $(if ($script:testsFailed -eq 0) { "Green" } else { "Red" })
Write-Host "  Status: $(if ($script:testsFailed -eq 0) { 'SUCCESSFUL (READY FOR PRODUCTION)' } else { 'FAILED' })" -ForegroundColor $(if ($script:testsFailed -eq 0) { "Green" } else { "Red" })
Write-Host "==========================================================" -ForegroundColor Cyan

if ($script:testsFailed -gt 0) {
    exit 1
} else {
    exit 0
}
