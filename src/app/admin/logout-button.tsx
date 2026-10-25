"use client";

import { useTransition } from "react";

import { logoutAdminAction } from "./actions";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAdminAction();
      window.location.reload();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 disabled:opacity-60"
    >
      {isPending ? "Sedang log keluar..." : "Log Keluar"}
    </button>
  );
}
