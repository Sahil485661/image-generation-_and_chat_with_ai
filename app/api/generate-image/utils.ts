export function generateAdvancedAIVisualization(prompt: string) {
  // Analyze prompt for themes and keywords
  const analysis = analyzePrompt(prompt)

  // Generate SVG based on analysis
  const svg = generateThematicSVG(analysis)

  // Convert SVG to data URL
  const imageUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`

  return {
    imageUrl,
    analysis: {
      theme: analysis.theme,
      colors: analysis.colors,
      keywords: analysis.keywords,
      style: analysis.style,
      lighting: analysis.lighting,
    },
    elements: {
      complexity: analysis.complexity,
      artStyle: analysis.artStyle,
      mood: analysis.mood,
    },
  }
}

function analyzePrompt(prompt: string) {
  const lowerPrompt = prompt.toLowerCase()

  // Theme detection
  const themes = {
    cyberpunk: ["cyberpunk", "neon", "futuristic", "cyber", "tech", "digital", "matrix", "blade runner"],
    fantasy: ["fantasy", "magical", "wizard", "dragon", "medieval", "enchanted", "mystical", "fairy"],
    cosmic: ["space", "cosmic", "galaxy", "stars", "nebula", "universe", "planet", "astronaut"],
    aquatic: ["ocean", "underwater", "sea", "water", "marine", "coral", "fish", "waves"],
    nature: ["forest", "tree", "mountain", "landscape", "natural", "wildlife", "garden", "flowers"],
    urban: ["city", "urban", "street", "building", "architecture", "modern", "downtown"],
    vintage: ["vintage", "retro", "old", "classic", "antique", "nostalgic", "1950s", "1960s"],
    minimalist: ["minimal", "simple", "clean", "geometric", "abstract", "modern"],
    steampunk: ["steampunk", "victorian", "brass", "gears", "mechanical", "industrial"],
    horror: ["horror", "scary", "dark", "spooky", "gothic", "haunted", "nightmare"],
  }

  let detectedTheme = "abstract"
  for (const [theme, keywords] of Object.entries(themes)) {
    if (keywords.some((keyword) => lowerPrompt.includes(keyword))) {
      detectedTheme = theme
      break
    }
  }

  // Style detection
  const styles = {
    photorealistic: ["photo", "realistic", "real", "photograph"],
    digital: ["digital", "art", "painting", "illustration"],
    sketch: ["sketch", "drawing", "pencil", "charcoal"],
    anime: ["anime", "manga", "cartoon", "animated"],
  }

  let detectedStyle = "digital"
  for (const [style, keywords] of Object.entries(styles)) {
    if (keywords.some((keyword) => lowerPrompt.includes(keyword))) {
      detectedStyle = style
      break
    }
  }

  // Extract keywords
  const keywords = prompt
    .split(" ")
    .filter((word) => word.length > 3)
    .slice(0, 5)

  return {
    theme: detectedTheme,
    style: detectedStyle,
    keywords,
    colors: getThemeColors(detectedTheme),
    lighting: detectLighting(lowerPrompt),
    complexity: prompt.length > 50 ? "high" : "medium",
    artStyle: detectedStyle,
    mood: detectMood(lowerPrompt),
  }
}

function getThemeColors(theme: string) {
  const colorSchemes = {
    cyberpunk: { primary: "#00ffff", secondary: "#ff00ff", background: "#0a0a0a", accent: "#00ff41" },
    fantasy: { primary: "#9d4edd", secondary: "#ffd60a", background: "#240046", accent: "#f72585" },
    cosmic: { primary: "#7209b7", secondary: "#560bad", background: "#03071e", accent: "#f72585" },
    aquatic: { primary: "#0077be", secondary: "#00b4d8", background: "#023047", accent: "#8ecae6" },
    nature: { primary: "#2d6a4f", secondary: "#52b788", background: "#081c15", accent: "#95d5b2" },
    urban: { primary: "#495057", secondary: "#6c757d", background: "#212529", accent: "#adb5bd" },
    vintage: { primary: "#bc6c25", secondary: "#dda15e", background: "#283618", accent: "#fefae0" },
    minimalist: { primary: "#343a40", secondary: "#6c757d", background: "#f8f9fa", accent: "#495057" },
    steampunk: { primary: "#8b4513", secondary: "#cd853f", background: "#2f1b14", accent: "#daa520" },
    horror: { primary: "#800020", secondary: "#8b0000", background: "#0d1117", accent: "#ff6b6b" },
    abstract: { primary: "#6366f1", secondary: "#8b5cf6", background: "#1e1b4b", accent: "#f59e0b" },
  }

  return colorSchemes[theme as keyof typeof colorSchemes] || colorSchemes.abstract
}

function detectLighting(prompt: string) {
  if (prompt.includes("neon") || prompt.includes("glow")) return "neon"
  if (prompt.includes("dark") || prompt.includes("shadow")) return "dark"
  if (prompt.includes("bright") || prompt.includes("sunny")) return "bright"
  if (prompt.includes("soft") || prompt.includes("gentle")) return "soft"
  return "dramatic"
}

function detectMood(prompt: string) {
  if (prompt.includes("happy") || prompt.includes("joy")) return "uplifting"
  if (prompt.includes("sad") || prompt.includes("melancholy")) return "somber"
  if (prompt.includes("exciting") || prompt.includes("energy")) return "energetic"
  if (prompt.includes("calm") || prompt.includes("peaceful")) return "serene"
  return "neutral"
}

function generateThematicSVG(analysis: any) {
  const { colors, theme, keywords } = analysis

  return `
    <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:${colors.background};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${colors.background};stop-opacity:1" />
        </radialGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary}" />
          <stop offset="100%" style="stop-color:${colors.secondary}" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1024" height="1024" fill="url(#bg)" />
      
      <!-- Central AI Brain Icon -->
      <g transform="translate(512,512)">
        <!-- Neural network nodes -->
        <circle cx="-80" cy="-60" r="8" fill="${colors.primary}" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="-60" r="8" fill="${colors.secondary}" opacity="0.8">
          <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="-80" cy="60" r="8" fill="${colors.accent}" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="60" r="8" fill="${colors.primary}" opacity="0.8">
          <animate attributeName="opacity" values="1;0.8;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        
        <!-- Connecting lines -->
        <line x1="-80" y1="-60" x2="0" y2="0" stroke="${colors.primary}" stroke-width="2" opacity="0.6" />
        <line x1="80" y1="-60" x2="0" y2="0" stroke="${colors.secondary}" stroke-width="2" opacity="0.6" />
        <line x1="-80" y1="60" x2="0" y2="0" stroke="${colors.accent}" stroke-width="2" opacity="0.6" />
        <line x1="80" y1="60" x2="0" y2="0" stroke="${colors.primary}" stroke-width="2" opacity="0.6" />
        
        <!-- Central brain -->
        <circle cx="0" cy="0" r="40" fill="url(#accent)" filter="url(#glow)" opacity="0.9">
          <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <!-- AI Symbol -->
        <text x="0" y="8" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">AI</text>
      </g>
      
      <!-- Theme-specific decorative elements -->
      ${generateThemeElements(theme, colors)}
      
      <!-- Keywords display -->
      <g transform="translate(512,800)">
        ${keywords
          .map(
            (keyword: string, i: number) => `
          <rect x="${(i - keywords.length / 2) * 120 + 60}" y="0" width="100" height="30" rx="15" fill="${colors.accent}" opacity="0.8" />
          <text x="${(i - keywords.length / 2) * 120 + 110}" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="white">${keyword}</text>
        `,
          )
          .join("")}
      </g>
      
      <!-- Title -->
      <text x="512" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${colors.primary}">AI Vision Generator</text>
      <text x="512" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="${colors.secondary}">Advanced ${theme} visualization</text>
    </svg>
  `
}

function generateThemeElements(theme: string, colors: any) {
  switch (theme) {
    case "cyberpunk":
      return `
        <rect x="100" y="200" width="824" height="2" fill="${colors.primary}" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
        </rect>
        <rect x="100" y="822" width="824" height="2" fill="${colors.secondary}" opacity="0.6">
          <animate attributeName="opacity" values="1;0.6;1" dur="1s" repeatCount="indefinite" />
        </rect>
      `
    case "fantasy":
      return `
        <circle cx="200" cy="300" r="3" fill="${colors.accent}" opacity="0.8">
          <animate attributeName="cy" values="300;280;300" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="824" cy="400" r="3" fill="${colors.primary}" opacity="0.8">
          <animate attributeName="cy" values="400;380;400" dur="3s" repeatCount="indefinite" />
        </circle>
      `
    case "cosmic":
      return `
        <circle cx="150" cy="200" r="1" fill="white" opacity="0.9" />
        <circle cx="800" cy="300" r="1" fill="white" opacity="0.7" />
        <circle cx="300" cy="800" r="1" fill="white" opacity="0.8" />
        <circle cx="700" cy="150" r="1" fill="white" opacity="0.6" />
      `
    default:
      return `
        <circle cx="200" cy="200" r="20" fill="${colors.primary}" opacity="0.3" />
        <circle cx="824" cy="824" r="20" fill="${colors.secondary}" opacity="0.3" />
      `
  }
}
