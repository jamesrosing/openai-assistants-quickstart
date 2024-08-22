import { NextRequest, NextResponse } from 'next/server';
import { openai } from "@/app/openai";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json({ message: 'Code is required' }, { status: 400 });
  }

  try {
    const assistantId = "your_assistant_id"; // Ideally, fetch or store this when the assistant is created.
    const response = await openai.beta.assistants.run({
      assistantId,
      code_interpreter: {
        code,
      },
    });

    const result = response.data.result || 'No output';
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Something went wrong' }, { status: 500 });
  }
}
