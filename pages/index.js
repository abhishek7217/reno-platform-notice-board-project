import Layout from "@/components/Layout";
import NoticeCard from "@/components/NoticeCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function getServerSideProps() {
  const notices = await prisma.notice.findMany({
    orderBy: [
      { prioritySort: "desc" },
      { publishDate: "desc" },
      { createdAt: "desc" }
    ]
  });

  return {
    props: {
      notices: JSON.parse(JSON.stringify(notices))
    }
  };
}

export default function Home({ notices }) {
  async function handleDelete(id, title) {
    const confirmed = window.confirm(
      `Delete "${title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    const response = await fetch(`/api/notices/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      window.location.reload();
      return;
    }

    const data = await response.json().catch(() => ({}));
    alert(data.message || "Could not delete the notice.");
  }

  return (
    <Layout
      title="Notice Board"
      
    >
      <section className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Welcome to the Notice Board
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-700">
          
        </p>
      </section>

      {notices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-base font-medium text-slate-700">No notices found.</p>
          <p className="mt-1 text-sm text-slate-500">
            Add your first notice from the button above.
          </p>
          <Link
            href="/notices/new"
            className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Create Notice
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </Layout>
  );
}
