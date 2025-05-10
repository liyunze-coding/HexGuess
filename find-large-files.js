import fs from "fs/promises"
import path from "path"

// Configuration
const MIN_SIZE_MB = 1 // Only show files larger than this size in MB
const IGNORE_PATTERNS = [
  "node_modules",
  ".git",
  ".next",
  "out",
  "build",
  "dist",
  ".vercel",
  "dependency-check",
  "sonar-scanner",
]

async function getFileSizeInMB(filePath) {
  const stats = await fs.stat(filePath)
  return stats.size / (1024 * 1024) // Convert bytes to MB
}

async function findLargeFiles(dir, results = [], depth = 0) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    // Skip ignored directories
    if (IGNORE_PATTERNS.some((pattern) => fullPath.includes(pattern))) {
      continue
    }

    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      await findLargeFiles(fullPath, results, depth + 1)
    } else {
      // Check file size
      const sizeInMB = await getFileSizeInMB(fullPath)
      if (sizeInMB >= MIN_SIZE_MB) {
        results.push({
          path: fullPath,
          size: sizeInMB.toFixed(2) + " MB",
        })
      }
    }
  }

  // Sort results by size (largest first) if we're at the top level
  if (depth === 0) {
    results.sort((a, b) => Number.parseFloat(b.size) - Number.parseFloat(a.size))
  }

  return results
}

// Start scanning from the current directory
console.log("Scanning for large files (> " + MIN_SIZE_MB + " MB)...")
console.log("This may take a few moments...")

try {
  const largeFiles = await findLargeFiles(".")

  console.log("\nFound " + largeFiles.length + " large files:")
  largeFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file.path} (${file.size})`)
  })

  // Calculate total size
  const totalSize = largeFiles.reduce((sum, file) => sum + Number.parseFloat(file.size), 0)
  console.log(`\nTotal size of large files: ${totalSize.toFixed(2)} MB`)

  // Suggest files to add to .vercelignore
  console.log("\nConsider adding these patterns to your .vercelignore file:")
  const suggestedPatterns = new Set()
  largeFiles.forEach((file) => {
    // Suggest common patterns based on file paths
    const relativePath = file.path.replace(/\\/g, "/")

    // Suggest directories containing large files
    const dirPath = path.dirname(relativePath)
    if (dirPath !== ".") {
      suggestedPatterns.add(dirPath)
    }

    // Suggest file extensions for large files
    const ext = path.extname(relativePath)
    if (ext) {
      suggestedPatterns.add(`**/*${ext}`)
    }
  })

  suggestedPatterns.forEach((pattern) => {
    console.log(`- ${pattern}`)
  })
} catch (error) {
  console.error("Error scanning files:", error)
}
