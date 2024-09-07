import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if(!prompt) return new Response("Prompt not found ", { status: 404 })
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Fail to fetch all prompts", { status: 500 });
  }
};

// PATHC
export const PATHC = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", { status: 404 })
        
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch(error) {
        return new Response("Failed to Update", { status: 500})
    }
}

// DELETE
export const DELETE = async (request, { params }) => {
    try{
        await connectToDB();

        await Prompt.findOneAndDelete(params.id)

        return new Response("Prompt Deleted successfully", { status: 200 })
    } catch (error){
        return new Response("Faild to delete prompt", { status: 500 })
    }
}