import { prisma } from "@/lib/prisma";
import { validateNoticePayload } from "@/lib/validation";

export default async function handler(req, res) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid notice id." });
  }

  if (req.method === "GET") {
    const notice = await prisma.notice.findUnique({
      where: { id }
    });

    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    return res.status(200).json({ notice });
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    const existingNotice = await prisma.notice.findUnique({
      where: { id }
    });

    if (!existingNotice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    const result = validateNoticePayload(req.body);

    if (!result.isValid) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: result.errors
      });
    }

    const updated = await prisma.notice.update({
      where: { id },
      data: result.data
    });

    return res.status(200).json({
      message: "Notice updated successfully.",
      notice: updated
    });
  }

  if (req.method === "DELETE") {
    const existingNotice = await prisma.notice.findUnique({
      where: { id }
    });

    if (!existingNotice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    await prisma.notice.delete({
      where: { id }
    });

    return res.status(200).json({ message: "Notice deleted successfully." });
  }

  res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed.` });
}
