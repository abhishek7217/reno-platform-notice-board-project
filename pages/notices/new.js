import Layout from "@/components/Layout";
import NoticeForm from "@/components/NoticeForm";

export default function NewNoticePage() {
  return (
    <Layout
      title="Add Notice"
      subtitle="Create a new notice"
    >
      <NoticeForm mode="create" />
    </Layout>
  );
}
