import { StatusCodes } from 'http-status-codes';

// Interfaces/Types
import type { RequestHandler } from '$routes/api/quests/assess/$types';
import type { AssessQuest, AssessDailyQuest, AssessHabitQuest, AssessTODOQuest } from '../types';

// Packages
import { getStructedContent } from '$package/gemini';

// Utils
import {
  buildDailyMessage,
  buildHabitMessage,
  buildTodoMessage
} from '../utils';

// Consts
import { ASSESSMENT_JSON_SCHEMA, SYSTEM_PROMPT } from '../consts';

export const POST: RequestHandler = async ({ request }) => {
  const body = (await request.json()) as AssessQuest;

  let input: string;
  switch (body.type) {
    case 'daily': {
      input = buildDailyMessage(body as AssessDailyQuest);
      break;
    }

    case 'habit': {
      input = buildHabitMessage(body as AssessHabitQuest);
      break;
    }

    case 'todo': {
      input = buildTodoMessage(body as AssessTODOQuest);
      break;
    }
  }

  const result = await getStructedContent(input, {
    instruction: SYSTEM_PROMPT,
    jsonSchema: ASSESSMENT_JSON_SCHEMA,
    temperature: 0.3,
  });

  if (result.isErr()) {
    return new Response(JSON.stringify({ message: result.error.message }), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }

  return new Response(JSON.stringify(result.value), {
    status: StatusCodes.OK,
  });
};
