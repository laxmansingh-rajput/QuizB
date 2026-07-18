import React, { useEffect, useState } from 'react';
import { useAppearance } from '../context/AppearanceContext.jsx';
import { getCreation } from '../controller/getCreations.js';
import { useAuth } from "@clerk/react";
import { useNavigate } from 'react-router';
import HostSavedQuizModal from './creationTypes/quizComponent/HostSavedQuizModal.jsx';

// SVG Raw Imports
import eyeSvg from '../assets/Eye.svg?raw';
import eyeSlashedSvg from '../assets/EyeSlashed.svg?raw';
import shareSvg from '../assets/Share.svg?raw';
import checkSvg from '../assets/Check.svg?raw';
import clockSvg from '../assets/Clock.svg?raw';
import alertSvg from '../assets/Alert.svg?raw';
import hostSvg from '../assets/Host.svg?raw';
import emptySvg from '../assets/Empty.svg?raw';

// Reusable SVG Inline Renderer
const SvgIcon = ({ src, className = '' }) => {
  return (
    <span 
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: src }}
    />
  );
};

const Creation = () => {
  const { theme, show } = useAppearance();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Eye toggle state for publish codes
  const [visiblePublishCodes, setVisiblePublishCodes] = useState({});
  // Copied toast state for publish codes
  const [copiedStates, setCopiedStates] = useState({});

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState('');

  // Auto-refresh timer for Live quiz countdowns
  const [tick, setTick] = useState(0);

  const fetchCreations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await getCreation(token);
      if (res && res.success) {
        // Response format: { success: true, data: { "1": { ... }, "2": { ... } } }
        const quizList = res.data ? Object.entries(res.data).map(([id, info]) => ({
          id,
          ...info
        })) : [];
        // Sort by published date descending (latest first)
        quizList.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
        setQuizzes(quizList);
      } else {
        setError(res?.message || 'Failed to fetch creations.');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred while loading creations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCreations();
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getQuizStatus = (quiz) => {
    if (quiz.quiz_type === 'Saved') {
      return 'Saved';
    }
    const now = new Date();
    const start = new Date(quiz.start_date);
    const expiry = new Date(quiz.expiry_date);

    if (now < start) {
      return 'Scheduled';
    } else if (now >= start && now <= expiry) {
      return 'Live';
    } else {
      return 'Expired';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRemainingTime = (expiryStr) => {
    if (!expiryStr) return '';
    const expiry = new Date(expiryStr);
    const now = new Date();
    const diffMs = expiry - now;
    if (diffMs <= 0) return 'Ended';

    const diffMins = Math.floor(diffMs / 60000);
    const hrs = Math.floor(diffMins / 60);
    const mins = diffMins % 60;

    if (hrs > 0) {
      return `${hrs}h ${mins}m left`;
    }
    return `${mins}m left`;
  };

  const togglePublishCode = (id) => {
    setVisiblePublishCodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleOpenHostModal = (title) => {
    setSelectedQuizTitle(title);
    setIsModalOpen(true);
  };

  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-soft animate-pulse text-start">
      <div className="flex justify-between items-center">
        <div className="h-6 w-20 bg-muted rounded-lg"></div>
        <div className="h-4 w-24 bg-muted rounded-lg"></div>
      </div>
      <div className="h-7 w-3/4 bg-muted rounded-lg mt-2"></div>
      <div className="h-4 w-1/2 bg-muted rounded-lg"></div>
      <div className="h-10 w-full bg-muted rounded-xl mt-4"></div>
      <div className="flex justify-between border-t border-border/60 pt-4 mt-2">
        <div className="h-4 w-16 bg-muted rounded-lg"></div>
        <div className="h-4 w-20 bg-muted rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <div className="h-[100vh] w-[100vw] fixed left-0 bg-background text-xl text-foreground transition-colors duration-280">
      <div className={'h-full pt-20 pb-10 bg-background text-foreground transition-all duration-280 ease-in-out fixed right-0 overflow-y-auto ' + 
        (show !== 'show' ? 'w-full' : 'max-[650px]:w-3/4 max-[750px]:w-1/2 max-[950px]:w-3/4 w-8/10')
      }>
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6 text-start">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4 mt-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-display">My Creations</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage, host, and view metrics of your created quizzes</p>
            </div>
            <button
              onClick={() => navigate('/create')}
              className="bg-primary hover:bg-primary/95 text-primary-foreground px-5 py-2 font-semibold text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:scale-95 active:scale-90"
            >
              Create New
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-xl flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 text-sm">
                <SvgIcon src={alertSvg} className="w-5 h-5 shrink-0" />
                <p className="font-semibold">{error}</p>
              </div>
              <button
                onClick={fetchCreations}
                className="px-3 py-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Content Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : quizzes.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center bg-card border border-border rounded-2xl p-8 max-w-lg mx-auto mt-10 shadow-soft animate-in fade-in zoom-in duration-200">
              <SvgIcon src={emptySvg} className="w-12 h-12 text-muted-foreground/60" />
              <h2 className="text-xl font-bold font-display">No Quizzes Found</h2>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                You haven't created or saved any quizzes yet. Start creating your first quiz to see it here!
              </p>
              <button
                onClick={() => navigate('/create')}
                className="mt-2 px-6 py-2.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-xl transition-all duration-200 shadow-md text-sm cursor-pointer hover:scale-95"
              >
                Create Quiz
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {quizzes.map((quiz) => {
                const status = getQuizStatus(quiz);
                const isCodeVisible = !!visiblePublishCodes[quiz.id];
                const isCopied = !!copiedStates[quiz.id];

                return (
                  <div 
                    key={quiz.id} 
                    className="bg-card border border-border text-foreground rounded-2xl shadow-soft p-6 flex flex-col justify-between gap-5 transition-all duration-300 hover:shadow-card hover:border-primary/20 relative"
                  >
                    
                    {/* Badge & Date Header */}
                    <div className="flex items-center justify-between gap-2">
                      {status === 'Saved' && (
                        <span className="text-xs font-semibold px-2.5 py-1 bg-secondary text-muted-foreground rounded-lg border border-border">
                          Saved
                        </span>
                      )}
                      {status === 'Scheduled' && (
                        <span className="text-xs font-semibold px-2.5 py-1 bg-scheduled/10 text-scheduled rounded-lg border border-scheduled/20">
                          Scheduled
                        </span>
                      )}
                      {status === 'Live' && (
                        <span className="text-xs font-semibold px-2.5 py-1 bg-live/10 text-live rounded-lg border border-live/20 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 bg-live rounded-full animate-pulse"></span>
                          Live
                        </span>
                      )}
                      {status === 'Expired' && (
                        <span className="text-xs font-semibold px-2.5 py-1 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                          Expired
                        </span>
                      )}

                      <span className="text-[11px] text-muted-foreground font-semibold">
                        Created {new Date(quiz.published_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col gap-2 flex-1">
                      <h2 className="text-xl font-bold font-display line-clamp-1" title={quiz.quiz_title}>
                        {quiz.quiz_title}
                      </h2>
                      
                      {status === 'Saved' ? (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Not hosted yet. Click 'Host This' below to configure scheduling and open access.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                          {status === 'Scheduled' && (
                            <>
                              <p><span className="font-semibold text-foreground/80">Starts:</span> {formatDate(quiz.start_date)}</p>
                              <p><span className="font-semibold text-foreground/80">Ends:</span> {formatDate(quiz.expiry_date)}</p>
                            </>
                          )}
                          {status === 'Live' && (
                            <>
                              <p className="text-live font-semibold flex items-center gap-1">
                                <SvgIcon src={clockSvg} className="w-3.5 h-3.5 text-live" />
                                {getRemainingTime(quiz.expiry_date)}
                              </p>
                              <p><span className="font-semibold text-foreground/80">Ends:</span> {formatDate(quiz.expiry_date)}</p>
                              <p><span className="font-semibold text-foreground/80">Duration:</span> {quiz.quiz_duration} mins</p>
                            </>
                          )}
                          {status === 'Expired' && (
                            <p><span className="font-semibold text-foreground/80">Ended on:</span> {formatDate(quiz.expiry_date)}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Publish Code & Share row (For hosted quizzes) */}
                    {status !== 'Saved' && quiz.publish_code && (
                      <div className="flex flex-col gap-1.5 border-t border-border/40 pt-3">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/80">Publish Code</span>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-secondary/50 font-mono tracking-wider text-xs px-3 py-2 rounded-xl border border-border select-all font-semibold flex items-center justify-between h-9">
                            <span>{isCodeVisible ? quiz.publish_code : '••••••••'}</span>
                          </div>
                          
                          {/* Eye Toggle Button */}
                          <button
                            onClick={() => togglePublishCode(quiz.id)}
                            className="h-9 w-9 rounded-xl border border-border bg-card hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer shadow-sm"
                            title={isCodeVisible ? "Hide Publish Code" : "Show Publish Code"}
                          >
                            <SvgIcon src={isCodeVisible ? eyeSlashedSvg : eyeSvg} className="w-4 h-4" />
                          </button>

                          {/* Share Icon Placement / Clipboard Copy functionality */}
                          <button
                            onClick={() => handleCopyCode(quiz.id, quiz.publish_code)}
                            className="h-9 w-9 rounded-xl border border-border bg-card hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer shadow-sm relative"
                            title="Copy Publish Code"
                          >
                            <SvgIcon src={isCopied ? checkSvg : shareSvg} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Stats Footer (For hosted quizzes) */}
                    {status !== 'Saved' && (
                      <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-auto text-[11px] font-semibold text-muted-foreground/80">
                        <span>Attempts: <span className="text-foreground">{quiz.attempted_count || 0}</span></span>
                        <span>Avg. Score: <span className="text-foreground">{quiz.average_score || 0}%</span></span>
                      </div>
                    )}

                    {/* Host This Button (For Saved quizzes) */}
                    {status === 'Saved' && (
                      <div className="mt-auto pt-3 border-t border-border/40">
                        <button
                          onClick={() => handleOpenHostModal(quiz.quiz_title)}
                          className="w-full h-9 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-md text-xs hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <SvgIcon src={hostSvg} className="w-3.5 h-3.5" />
                          Host This
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* Hosting Modal for Saved Quizzes */}
      <HostSavedQuizModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quizTitle={selectedQuizTitle}
        onSuccess={fetchCreations}
      />
    </div>
  );
};

export default Creation;