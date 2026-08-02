import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getAdminUsers } from "@/app/service/getAdminUsers";
import { UserSearchInput } from "../_components/UserSearchInput";
import UserStatusButton from "../_components/UserStatusButton";
import type { AdminUser, UserStatus } from "@/lib/types";

const statusStyles: Record<UserStatus, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  BLOCKED: "bg-red-100 text-red-700",
};

const AdminUsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm?: string; page?: string }>;
}) => {
  const { searchTerm, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;

  const result = await getAdminUsers({
    searchTerm,
    page: String(currentPage),
    limit: String(limit),
  });

  const users: AdminUser[] = result?.success ? (result.data ?? []) : [];
  const total = result?.success ? (result.meta?.total ?? 0) : 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">User Management</h1>
        <p className="text-sm text-muted-foreground">{total} total users</p>
      </div>

      <UserSearchInput />

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.role !== "ADMIN" && (
                      <UserStatusButton
                        userId={user.id}
                        currentStatus={user.status}
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <Link
            href={`?searchTerm=${searchTerm ?? ""}&page=${Math.max(1, currentPage - 1)}`}
            className="rounded-md border px-3 py-1 hover:bg-muted"
          >
            Previous
          </Link>
          <span className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={`?searchTerm=${searchTerm ?? ""}&page=${Math.min(totalPages, currentPage + 1)}`}
            className="rounded-md border px-3 py-1 hover:bg-muted"
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
