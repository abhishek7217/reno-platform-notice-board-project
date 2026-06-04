import Link from "next/link";
import { useState } from "react";
import { formatDisplayDate, getNoticeBadgeClass } from "@/lib/notice";

export default function NoticeCard({ notice, onDelete }) {
  const [imageLoadError, setImageLoadError] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      {notice.imageUrl && !imageLoadError ? (
        <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <img
            src={notice.imageUrl}
            alt={notice.title}
            className="h-full w-full object-cover"
            onError={() => setImageLoadError(true)}
          />
        </div>
      ) : null}

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {/* Notice priority check */}
            {/* Single badge – shows "Urgent" or "Normal" with correct styling */}
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getNoticeBadgeClass(
                notice.priority,
              )}`}
            >
              {notice.priority}
            </span>

            <h2 className="mt-3 text-lg font-semibold text-slate-900">
              {notice.title}
            </h2>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {notice.category}
          </span>
        </div>

        <p className="line-clamp-4 text-sm leading-6 text-slate-600">
          {notice.body}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Publish date:{" "}
            <span className="font-medium text-slate-700">
              {formatDisplayDate(notice.publishDate)}
            </span>
          </p>

          <div className="flex gap-2">
            <Link
              href={`/notices/${notice.id}/edit`}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDelete(notice.id, notice.title)}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
