import { Suspense } from "react";
import { connection } from "next/server";
import { getEditableContent } from "@/lib/content";
import { defaultContent } from "@/content/defaults";
import AdminApp from "@/components/admin/AdminApp";

async function AdminLoader() {
  await connection(); // always read fresh content at request time
  const content = await getEditableContent();
  const storage = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL ? "redis" : "local";
  return <AdminApp initial={content} defaults={defaultContent} storage={storage} />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="adm-loading">Loading admin…</div>}>
      <AdminLoader />
    </Suspense>
  );
}
