import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  revalidateTag("daily");

  return Response.json({ success: true });
}
