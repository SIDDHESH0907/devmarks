import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);

  const USER = "admin";
  const PASS = "Hesoyam0907#";

  function submit(e) {
    e.preventDefault();
    if (u === USER && p === PASS) {
      onLogin(USER);
    } else {
      setErr("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-20 h-20 flex items-center justify-center rounded-lg  text-white text-xl font-bold">
            <img src="./devmarks.svg" alt="devmarks" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">DevMarks</h2>
            <div className="text-sm text-slate-500">
              Sign in to your account
            </div>
          </div>
        </div>

        {err && (
          <div className="text-sm text-red-600 mb-3" role="alert">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Username
            </label>
            <input
              className="input-shadow w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Username"
              value={u}
              onChange={(e) => setU(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                className="input-shadow w-full rounded-md border border-slate-200 px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-300"
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                value={p}
                onChange={(e) => setP(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-slate-600 rounded-md hover:bg-slate-100"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-sky-600 text-white px-4 py-2 rounded-md shadow hover:bg-sky-700 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
