import { prisma } from "@/lib/prisma";
import { validateNoticePayload } from "@/lib/validation";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const notices = await prisma.notice.findMany({
      orderBy: [
        { prioritySort: "desc" },
        { publishDate: "desc" },
        { createdAt: "desc" }
      ]
    });

    return res.status(200).json({ notices });
  }

  if (req.method === "POST") {
    const result = validateNoticePayload(req.body);

    if (!result.isValid) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: result.errors
      });
    }

    const created = await prisma.notice.create({
      data: result.data
    });

    return res.status(201).json({
      message: "Notice created successfully.",
      notice: created
    });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed.` });
}
