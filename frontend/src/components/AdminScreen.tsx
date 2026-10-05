import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield,
  Lock,
  Trophy,
  Users,
  RefreshCw,
  Home,
  AlertCircle,
  CheckCircle2,
  Download,
  Database,
  Server,
  Settings,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useMischiefStore } from '../store/useMischiefStore';
import { API_ENDPOINTS, getApiBaseUrl, setCustomApiBaseUrl } from '../config/api.config';
import { QUIZ_QUESTIONS } from '../config/quizQuestions';
import {
  getLocalSubmissions,
  computeLeaderboardFromSubmissions,
  seedSampleNominations,
  exportToCSV,
  exportToJSON,
  clearLocalSubmissions,
} from '../services/nominationsStorage';
import type { QuizSubmissionRecord } from '../types';

interface AdminNominationData {
  totalSubmissions: number;
  awardLeaderboard: {
    [awardId: string]: {
      awardTitle: string;
      counts: { [taggedName: string]: number };
    };
  };
  rawSubmissions: QuizSubmissionRecord[];
}

export const AdminScreen: React.FC = () => {
  const { setStep } = useMischiefStore();
  const [secretInput, setSecretInput] = useState('mischief2026');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusNotice, setStatusNotice] = useState<{ type: 'success' | 'warning' | 'info'; message: string } | null>(
    null
  );
  const [adminData, setAdminData] = useState<AdminNominationData | null>(null);

  // Custom backend configuration state
  const [customBackendUrl, setCustomBackendUrl] = useState(getApiBaseUrl());
  const [showSettings, setShowSettings] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'idle' | 'testing' | 'online' | 'offline'>('idle');

  // Load data from local storage and/or remote backend
  const loadDatabase = useCallback(async (passcode: string) => {
    setLoading(true);
    setStatusNotice(null);

    // 1. Gather local submissions first
    let localList = getLocalSubmissions();

    // If completely empty, auto-seed sample data so admin can immediately view the dashboard
    if (localList.length === 0) {
      localList = seedSampleNominations();
    }

    const localSummary = computeLeaderboardFromSubmissions(localList);

    // Default to local summary
    setAdminData(localSummary);
    setIsAuthenticated(true);

    // 2. Attempt remote fetch if passcode is entered
    try {
      const endpoint = `${API_ENDPOINTS.ADMIN_NOMINATIONS}?secret=${encodeURIComponent(passcode)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const response = await fetch(endpoint, {
        signal: controller.signal,
        headers: {
          'x-admin-secret': passcode,
        },
      });
      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.success && Array.isArray(data.rawSubmissions)) {
          // Merge remote with local submissions (avoiding duplicate IDs)
          const mergedMap = new Map<string, QuizSubmissionRecord>();

          // Add remote submissions
          data.rawSubmissions.forEach((sub: QuizSubmissionRecord) => {
            mergedMap.set(sub.id, sub);
          });

          // Add local submissions
          localList.forEach((sub) => {
            if (!mergedMap.has(sub.id)) {
              mergedMap.set(sub.id, sub);
            }
          });

          const mergedSubmissions = Array.from(mergedMap.values());
          const mergedSummary = computeLeaderboardFromSubmissions(mergedSubmissions);

          setAdminData(mergedSummary);
          setBackendStatus('online');
          setStatusNotice({
            type: 'success',
            message: `🟢 Connected to Live Backend (${mergedSubmissions.length} total senior responses synced)`,
          });
          return;
        }
      }

      // If backend responded with 401
      if (response.status === 401) {
        if (passcode !== 'mischief2026') {
          setStatusNotice({
            type: 'warning',
            message: 'Incorrect passcode for remote server. Displaying local database.',
          });
        }
      } else {
        setBackendStatus('offline');
        setStatusNotice({
          type: 'info',
          message: `⚡ Local Database Active (${localList.length} submissions). Backend server is offline or waking up on Render.`,
        });
      }
    } catch (err) {
      console.warn('[Admin] Remote database fetch skipped or timed out:', err);
      setBackendStatus('offline');
      setStatusNotice({
        type: 'info',
        message: `⚡ Displaying Local Database (${localList.length} submissions). Remote server offline or not configured yet.`,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Auto check if secret is in URL query parameters (?secret=... or ?admin=...)
    const searchParams = new URLSearchParams(window.location.search);
    const querySecret = searchParams.get('secret') || searchParams.get('admin');
    if (querySecret && querySecret !== 'true') {
      setSecretInput(querySecret);
      loadDatabase(querySecret);
    }
  }, [loadDatabase]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loadDatabase(secretInput);
  };

  const handleSaveBackendUrl = async () => {
    setBackendStatus('testing');
    setCustomApiBaseUrl(customBackendUrl);

    try {
      const pingUrl = customBackendUrl ? `${customBackendUrl.replace(/\/+$/, '')}/health` : '/health';
      const res = await fetch(pingUrl, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        setBackendStatus('online');
        setStatusNotice({ type: 'success', message: '🟢 Backend connected successfully!' });
        loadDatabase(secretInput);
      } else {
        setBackendStatus('offline');
        setStatusNotice({ type: 'warning', message: '⚠️ Backend responded with an error. URL saved.' });
      }
    } catch {
      setBackendStatus('offline');
      setStatusNotice({
        type: 'warning',
        message: '⚠️ Backend not reachable yet (if on Render free tier, give it ~45s to wake up). URL saved.',
      });
    }
  };

  const handleSeedData = () => {
    const freshData = seedSampleNominations();
    const summary = computeLeaderboardFromSubmissions(freshData);
    setAdminData(summary);
    setStatusNotice({ type: 'success', message: '✨ Sample senior nominations populated!' });
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all local submissions?')) {
      clearLocalSubmissions();
      const emptySummary = computeLeaderboardFromSubmissions([]);
      setAdminData(emptySummary);
      setStatusNotice({ type: 'info', message: '🗑️ Local submissions cleared.' });
    }
  };

  return (
    <div className="relative text-center max-w-3xl mx-auto font-sans">
      {/* Top Header Badge */}
      <div className="inline-flex items-center gap-1.5 bg-purple-900 text-amber-300 font-marker text-xs sm:text-sm tracking-wider px-3.5 py-1.5 rounded-lg shadow-md transform -rotate-1 mb-3 border border-purple-700">
        <Shield className="w-4 h-4 text-amber-400" />
        <span>CREATOR SECRET ADMIN PORTAL</span>
      </div>

      {!isAuthenticated ? (
        /* Secret Login Form */
        <div className="bg-[#fbf6ec] border-2 border-[#e3d5be] p-5 sm:p-6 rounded-xl shadow-lg max-w-md mx-auto text-left">
          <div className="flex items-center gap-2 mb-2 text-stone-900 font-bold text-sm">
            <Lock className="w-4 h-4 text-rose-700" />
            <span>Enter Creator Secret Passcode:</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              placeholder="Enter admin secret..."
              className="w-full bg-white text-stone-900 px-3.5 py-2.5 rounded-lg border-2 border-stone-400 focus:border-purple-600 focus:outline-none font-bold text-sm shadow-inner"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-purple-800 hover:bg-purple-900 text-white font-marker text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-2 transition cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <Shield className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'OPENING DATABASE...' : 'ACCESS CREATOR DATABASE ➔'}</span>
            </button>
          </form>

          <p className="mt-3 text-xs text-stone-600 text-center font-sans">
            🔒 Default secret key: <code className="bg-stone-200 px-1.5 py-0.5 rounded text-purple-950 font-bold">mischief2026</code>
          </p>

          <div className="mt-4 pt-3 border-t border-stone-300 flex justify-between items-center text-[11px] text-stone-600">
            <span className="flex items-center gap-1 font-semibold">
              <Database className="w-3 h-3 text-emerald-600" /> Dual Cloud & Local DB
            </span>
            <button
              type="button"
              onClick={() => {
                setIsAuthenticated(true);
                loadDatabase('mischief2026');
              }}
              className="text-purple-700 hover:underline font-bold cursor-pointer"
            >
              Direct View ➔
            </button>
          </div>
        </div>
      ) : (
        /* Admin Dashboard View */
        <div className="space-y-5 text-left">
          {/* Status / Notice Banner */}
          {statusNotice && (
            <div
              className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-bold font-sans ${
                statusNotice.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : statusNotice.type === 'warning'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-blue-50 border-blue-300 text-blue-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {statusNotice.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                )}
                <span>{statusNotice.message}</span>
              </div>
              <button
                type="button"
                onClick={() => setStatusNotice(null)}
                className="text-stone-400 hover:text-stone-700 text-xs ml-2 cursor-pointer font-black"
              >
                ✕
              </button>
            </div>
          )}

          {/* Top Control Bar & Stats */}
          <div className="bg-[#efe6d4] border-2 border-amber-400 p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-marker text-lg sm:text-xl text-stone-950 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <span>MCA Farewell Nominations Leaderboard</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-800 font-sans font-bold mt-1">
                Total Senior Quiz Submissions:{' '}
                <span className="bg-purple-900 text-amber-300 px-2 py-0.5 rounded font-monoRetro text-sm ml-1">
                  {adminData?.totalSubmissions || 0}
                </span>
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadDatabase(secretInput)}
                className="p-2 rounded-lg bg-amber-400 text-stone-950 hover:bg-amber-500 transition shadow cursor-pointer flex items-center gap-1 text-xs font-bold font-sans"
                title="Refresh & Sync Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>

              <button
                type="button"
                onClick={() => adminData && exportToCSV(adminData.rawSubmissions)}
                disabled={!adminData || adminData.rawSubmissions.length === 0}
                className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition shadow cursor-pointer flex items-center gap-1 text-xs font-bold font-sans disabled:opacity-50"
                title="Download CSV for MC / Host"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-900 text-white transition shadow cursor-pointer flex items-center gap-1 text-xs font-bold font-sans"
                title="Backend & Data Settings"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Collapsible Settings Panel */}
          {showSettings && (
            <div className="bg-white border-2 border-stone-300 p-4 rounded-xl shadow-sm text-xs space-y-3">
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-purple-700" />
                <span>Backend & Database Configuration</span>
              </h4>

              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700">
                  Render / Backend API Base URL (leave empty for local dev proxy):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customBackendUrl}
                    onChange={(e) => setCustomBackendUrl(e.target.value)}
                    placeholder="e.g. https://senior-farewell-backend.onrender.com"
                    className="flex-1 px-3 py-1.5 rounded border border-stone-400 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleSaveBackendUrl}
                    disabled={backendStatus === 'testing'}
                    className="px-3 py-1.5 rounded bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs cursor-pointer"
                  >
                    {backendStatus === 'testing' ? 'Testing...' : 'Save & Test'}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={handleSeedData}
                  className="px-3 py-1.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold border border-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  <span>Seed Demo Submissions</span>
                </button>

                <button
                  type="button"
                  onClick={() => adminData && exportToJSON(adminData.rawSubmissions)}
                  className="px-3 py-1.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-950 font-bold border border-blue-300 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3 text-blue-700" />
                  <span>Download JSON Dump</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearData}
                  className="px-3 py-1.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-950 font-bold border border-rose-300 flex items-center gap-1 cursor-pointer ml-auto"
                >
                  <Trash2 className="w-3 h-3 text-rose-700" />
                  <span>Clear Local DB</span>
                </button>
              </div>
            </div>
          )}

          {/* Leaderboard Grid for All 10 Award Categories */}
          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q) => {
              const awardData = adminData?.awardLeaderboard[q.id];
              const counts = awardData?.counts || {};
              const sortedNames = Object.entries(counts).sort((a, b) => b[1] - a[1]);

              return (
                <div
                  key={q.id}
                  className="bg-[#fbf6ec] border-2 border-[#e3d5be] p-4 rounded-xl shadow-sm hover:border-amber-400 transition"
                >
                  <div className="flex items-center justify-between border-b border-stone-300 pb-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center font-monoRetro shadow-sm shrink-0 border border-stone-800">
                        {q.number}
                      </span>
                      <h4 className="font-marker text-sm sm:text-base text-stone-950 font-black">
                        {q.emoji} {q.title}
                      </h4>
                    </div>

                    {sortedNames.length > 0 && (
                      <span className="text-[11px] font-bold text-stone-600 font-sans">
                        {sortedNames.reduce((acc, curr) => acc + curr[1], 0)} votes
                      </span>
                    )}
                  </div>

                  {sortedNames.length === 0 ? (
                    <p className="text-xs text-stone-500 font-sans italic py-1">
                      No nominations yet for this award category.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                      {sortedNames.map(([name, count], idx) => (
                        <div
                          key={name}
                          className={`p-2.5 rounded-lg border flex items-center justify-between transition ${
                            idx === 0
                              ? 'bg-amber-100/90 border-amber-500 text-stone-950 font-extrabold shadow-sm'
                              : 'bg-white border-stone-300 text-stone-800'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            {idx === 0 ? (
                              <span className="text-base leading-none">👑</span>
                            ) : (
                              <span className="text-stone-400 font-mono text-[11px]">#{idx + 1}</span>
                            )}
                            <span className="truncate">{name}</span>
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-monoRetro font-bold shrink-0 ${
                              idx === 0
                                ? 'bg-amber-500 text-stone-950 border border-stone-900'
                                : 'bg-stone-900 text-amber-300'
                            }`}
                          >
                            {count} {count === 1 ? 'vote' : 'votes'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Raw Submissions Log */}
          <div className="bg-[#efe6d4] p-4 rounded-xl border-2 border-[#d5c5ac] shadow-sm">
            <h4 className="font-marker text-sm sm:text-base text-stone-950 mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-800" />
                <span>Recent Submissions Log ({adminData?.rawSubmissions.length || 0})</span>
              </div>
            </h4>

            {(!adminData?.rawSubmissions || adminData.rawSubmissions.length === 0) ? (
              <p className="text-xs text-stone-600 italic py-2">No individual submission logs recorded yet.</p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto text-xs pr-1 font-sans">
                {adminData.rawSubmissions.map((sub) => (
                  <div key={sub.id} className="bg-white p-3 rounded-lg border border-stone-300 shadow-xs">
                    <div className="flex justify-between items-center text-stone-950 font-extrabold border-b border-stone-200 pb-1.5 mb-1.5">
                      <span className="text-purple-950">Submitted by: {sub.submittedBy}</span>
                      <span className="text-[10px] text-stone-500 font-normal font-mono">
                        {new Date(sub.submittedAt).toLocaleTimeString()} · {new Date(sub.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-800 space-y-0.5 font-medium">
                      {sub.nominations.map((nom) => (
                        <div key={nom.awardId} className="flex items-start gap-1">
                          <span className="text-stone-500">•</span>
                          <span className="text-stone-600">{nom.awardTitle}:</span>
                          <strong className="text-purple-900 font-bold">{nom.taggedName}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setStep('landing')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-sans text-xs font-black uppercase cursor-pointer shadow transition active:scale-[0.98]"
            >
              <Home className="w-4 h-4 text-amber-300" />
              <span>Back to Main Website</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
