import { useState } from "react";
import { useRouter } from "next/router";
import { CATEGORIES, PRIORITIES, formatDateForInput } from "@/lib/notice";

const emptyForm = {
  title: "",
  body: "",
  category: "General",
  priority: "Normal",
  publishDate: "",
  imageUrl: ""
};

export default function NoticeForm({ initialValues = emptyForm, mode = "create" }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialValues.title ?? "",
    body: initialValues.body ?? "",
    category: initialValues.category ?? "General",
    priority: initialValues.priority ?? "Normal",
    publishDate: formatDateForInput(initialValues.publishDate),
    imageUrl: initialValues.imageUrl ?? ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setServerMessage("");

    const payload = {
      title: form.title,
      body: form.body,
      category: form.category,
      priority: form.priority,
      publishDate: form.publishDate,
      imageUrl: form.imageUrl
    };

    const url = mode === "edit" ? `/api/notices/${initialValues.id}` : "/api/notices";
    const method = mode === "edit" ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors(data.errors || { form: data.message || "Something went wrong." });
        return;
      }

      setServerMessage(data.message || "Saved successfully.");
      router.push("/");
    } catch (error) {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  const titleText = mode === "edit" ? "Edit Notice" : "Add Notice";
  const buttonText = isSubmitting
    ? "Saving..."
    : mode === "edit"
      ? "Update Notice"
      : "Create Notice";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{titleText}</h2>
        
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
      >
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">
            Title *
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            placeholder="Example: Mid-sem exam schedule"
          />
          {errors.title ? <p className="mt-1 text-sm text-red-600">{errors.title}</p> : null}
        </div>

       


        <div>
          <label htmlFor="body" className="mb-2 block text-sm font-medium text-slate-700">
            Body *
          </label>
          <textarea
            id="body"
            name="body"
            value={form.body}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            placeholder="Write the full notice here..."
          />
          {errors.body ? <p className="mt-1 text-sm text-red-600">{errors.body}</p> : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category ? (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="priority" className="mb-2 block text-sm font-medium text-slate-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {errors.priority ? (
              <p className="mt-1 text-sm text-red-600">{errors.priority}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="publishDate" className="mb-2 block text-sm font-medium text-slate-700">
              Publish Date
            </label>
            <input
              id="publishDate"
              name="publishDate"
              type="date"
              value={form.publishDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
            {errors.publishDate ? (
              <p className="mt-1 text-sm text-red-600">{errors.publishDate}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium text-slate-700">
              Image URL (optional)
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl ? (
              <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>
            ) : null}
          </div>
        </div>

        {errors.form ? <p className="text-sm text-red-600">{errors.form}</p> : null}
        {serverMessage ? <p className="text-sm text-green-700">{serverMessage}</p> : null}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {buttonText}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
