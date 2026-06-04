import Layout from "@/components/Layout";
import NoticeForm from "@/components/NoticeForm";
import { prisma } from "@/lib/prisma";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const notice = await prisma.notice.findUnique({
    where: { id }
  });

  if (!notice) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      notice: JSON.parse(JSON.stringify(notice))
    }
  };
}

export default function EditNoticePage({ notice }) {
  return (
    <Layout
      title="Edit Notice"
      subtitle="The form loads with the current notice values."
    >
      <NoticeForm mode="edit" initialValues={notice} />
    </Layout>
  );
}
