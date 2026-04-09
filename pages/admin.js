import Head from "next/head";
import AdminLibrary from "../components/admin/AdminLibrary";

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Photo Library — Admin</title>
      </Head>
      <AdminLibrary />
    </>
  );
}
