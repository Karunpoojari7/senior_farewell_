import React, { useState, useEffect } from 'react';
import { Shield, Lock, Trophy, Users, RefreshCw, Home, AlertCircle } from 'lucide-react';
import { useMischiefStore } from '../store/useMischiefStore';
import { API_ENDPOINTS } from '../config/api.config';
import { QUIZ_QUESTIONS } from '../config/quizQuestions';

interface AdminNominationData {
  totalSubmissions: number;
  awardLeaderboard: {
    [awardId: string]: {
      awardTitle: string;
      counts: { [taggedName: string]: number };
    };
  };
  rawSubmissions: Array<{
    id: string;
    submittedBy: string;
    submittedAt: string;
    nominations: Array<{
      awardId: string;
      awardTitle: string;
      taggedName: string;
    }>;
  }>;
}

export const AdminScreen: React.FC = () => {
  const { setStep } = useMischiefStore();
  const [secretInput, setSecretInput] = useState('mischief2026');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<AdminNominationData | null>(null);

  const fetchNominations = async (passcode: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN_NOMINATIONS}?secret=${encodeURIComponent(passcode)}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setAdminData({
          totalSubmissions: data.totalSubmissions,
          awardLeaderboard: data.awardLeaderboard,
          rawSubmissions: data.rawSubmissions,
        });
      } else {
        setErrorMsg(data.message || 'Incorrect secret admin key.');
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('[Admin] Fetch error:', err);
      setErrorMsg('Network error connecting to creator database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if secret key is in URL query parameter ?secret=mischief2026 or ?admin=mischief2026
    const searchParams = new URLSearchParams(window.location.search);
    const querySecret = searchParams.get('secret') || searchParams.get('admin');
    if (querySecret) {
      setSecretInput(querySecret);
      fetchNominations(querySecret);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNominations(secretInput);
  };

  return (
    <div className="relative text-center max-w-2xl mx-auto font-monoRetro">
      {/* Top Header Badge */}
      <div className="inline-flex items-center gap-1.5 bg-purple-900 text-amber-300 font-marker text-xs sm:text-sm tracking-wider px-3.5 py-1 rounded shadow transform -rotate-1 mb-3">
        <Shield className="w-4 h-4 text-amber-400" />
        <span>CREATOR SECRET ADMIN PORTAL</span>
      </div>

      {!isAuthenticated ? (
        /* Secret Login Form */
        <div className="bg-[#fbf6ec] border-2 border-[#e3d5be] p-5 rounded-lg shadow-md max-w-md mx-auto text-left">
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
              className="w-full bg-white text-stone-900 px-3.5 py-2 rounded border-2 border-stone-400 focus:border-purple-600 focus:outline-none font-bold text-sm shadow-inner"
            />

            {errorMsg && (
              <p className="text-xs text-rose-600 font-bold font-hand flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded bg-purple-800 hover:bg-purple-900 text-white font-marker text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition cursor-pointer shadow"
            >
              <Shield className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'AUTHENTICATING...' : 'ACCESS CREATOR DATABASE ➔'}</span>
            </button>
          </form>

          <p className="mt-3 text-[10px] text-stone-500 text-center">
            🔒 Default secret key: <code className="bg-stone-200 px-1 py-0.5 rounded text-purple-900 font-bold">mischief2026</code>
          </p>
        </div>
      ) : (
        /* Admin Dashboard View */
        <div className="space-y-6 text-left">
          {/* Summary Header */}
          <div className="bg-[#efe6d4] border-2 border-amber-400 p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="font-marker text-lg text-stone-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <span>MCA Farewell Nominations Leaderboard</span>
              </h3>
              <p className="text-xs text-stone-700 font-hand font-bold mt-0.5">
                Total Senior Quiz Submissions: <span className="text-purple-900 text-sm">{adminData?.totalSubmissions || 0}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => fetchNominations(secretInput)}
              className="p-2 rounded bg-amber-400 text-stone-900 hover:bg-amber-500 transition shadow cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Leaderboard Grid for All 10 Award Categories */}
          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q) => {
              const awardData = adminData?.awardLeaderboard[q.id];
              const counts = awardData?.counts || {};
              const sortedNames = Object.entries(counts).sort((a, b) => b[1] - a[1]);

              return (
                <div key={q.id} className="bg-[#fbf6ec] border-2 border-[#e3d5be] p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 border-b border-stone-300 pb-2 mb-2">
                    <span className="w-6 h-6 rounded bg-amber-400 text-stone-900 font-black text-xs flex items-center justify-center font-monoRetro shadow-sm shrink-0">
                      {q.number}
                    </span>
                    <h4 className="font-marker text-sm sm:text-base text-stone-900">
                      {q.emoji} {q.title}
                    </h4>
                  </div>

                  {sortedNames.length === 0 ? (
                    <p className="text-xs text-stone-500 font-hand italic">No nominations yet for this award.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {sortedNames.map(([name, count], idx) => (
                        <div
                          key={name}
                          className={`p-2 rounded border flex items-center justify-between ${
                            idx === 0
                              ? 'bg-amber-100 border-amber-400 text-stone-900 font-bold'
                              : 'bg-white border-stone-300 text-stone-800'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            {idx === 0 && <span className="text-amber-600">👑</span>}
                            <span>{name}</span>
                          </span>
                          <span className="bg-stone-900 text-amber-300 px-2 py-0.5 rounded text-[10px] font-monoRetro shrink-0">
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
          <div className="bg-[#efe6d4] p-4 rounded-lg border border-[#d5c5ac]">
            <h4 className="font-marker text-sm text-stone-900 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-800" />
              <span>Recent Submissions Log ({adminData?.rawSubmissions.length || 0})</span>
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto text-xs pr-1">
              {adminData?.rawSubmissions.map((sub) => (
                <div key={sub.id} className="bg-white p-2.5 rounded border border-stone-300">
                  <div className="flex justify-between items-center text-stone-900 font-bold border-b border-stone-200 pb-1 mb-1">
                    <span>Submitted by: {sub.submittedBy}</span>
                    <span className="text-[10px] text-stone-500 font-normal">
                      {new Date(sub.submittedAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-700 font-hand space-y-0.5">
                    {sub.nominations.map((nom) => (
                      <div key={nom.awardId}>
                        • {nom.awardTitle}: <strong className="text-purple-900">{nom.taggedName}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exit Admin Button */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setStep('landing')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-stone-800 text-white font-monoRetro text-xs font-bold uppercase cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Main Website</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
