"use client";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-sm space-y-6">
        <div className="text-6xl opacity-80">📡</div>
        <h1 className="text-2xl font-semibold text-white">You&apos;re offline</h1>
        <p className="text-zinc-400">
          Check your connection and try again. Some content may be available from cache.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2.5 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
