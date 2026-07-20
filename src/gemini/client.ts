import { GoogleGenAI, type GenerateContentParameters } from '@google/genai';
import { ok, err } from 'neverthrow';

// Types/Interfaces
import type { Result } from '$lib/types';

// Env
import { GEMINI_API_KEY } from '$env/static/private';

const MODEL = 'gemini-3.1-flash-lite';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const getStructedContent = async <T = unknown>(
  input: string,
  options: {
    instruction?: string;
    jsonSchema?: Record<string, unknown>;
    maxOutputTokens?: number;
    temperature?: number;
  } = {}
): Promise<Result<T>> => {
  try {
    const config: GenerateContentParameters['config'] = {
      maxOutputTokens: options.maxOutputTokens ?? 1024,
      temperature: options.temperature ?? 0.3
    };

    if (options.instruction) {
      config.systemInstruction = options.instruction;
    }

    if (options.jsonSchema) {
      config.responseMimeType = 'application/json';
      config.responseJsonSchema = options.jsonSchema;
    }

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: input,
      config,
    });

    const raw = response.text ?? '';

    if (options.jsonSchema) {
      const parsed = JSON.parse(raw) as T;
      return ok(parsed);
    }

    return ok(raw as unknown as T);
  } catch (error) {
    console.log(error);
    return err(error as Error);
  }
};
