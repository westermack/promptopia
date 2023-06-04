import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { prompt, userId, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      prompt,
      creator: userId,
      tag: tag.replace(/[\s#]/g, "").toLowerCase(),
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
