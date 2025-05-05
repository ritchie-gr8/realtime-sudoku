export async function POST(req: Request) {
  const body = await req.json();

  if (!body) Response.error();

  const { id, difficulty } = body;

  try {

  } catch (error) {

  }
}
