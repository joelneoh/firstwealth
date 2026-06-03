import { extractHoldingsFromImage, generateWeeklyUpdate, structureThesis } from "@/lib/mock-ai";

export const aiMode = process.env.NEXT_PUBLIC_AI_MODE ?? (process.env.OPENAI_API_KEY ? "openai-compatible" : "mock");

export const aiClient = {
  extractHoldingsFromImage,
  structureThesis,
  generateWeeklyUpdate,
};

// Placeholder for production:
// - keep the same method signatures
// - call an OpenAI-compatible /v1/chat/completions or Responses API endpoint server-side
// - fall back to mock mode when OPENAI_API_KEY is not present
