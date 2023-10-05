import { json } from "@sveltejs/kit";
import * as database from "$lib/server/database.js";

export async function POST({ request }) {
  const postJson = await request.json();
  const id = database.addPost(postJson);

  return json({ ...id }, { status: 201 });
}

export async function GET({ request }) {
  return json({ posts: database.getPosts() }, { status: 200 });
}
