import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, MessageSquare, Trash2, MailCheck, Send, ShieldAlert, ShieldCheck, Terminal, Search, Flame, RefreshCcw, Landmark, Loader2 } from 'lucide-react';
import { Message } from '../types';

interface AdminDashboardProps {
  onBackToLanding: () => void;
  messagesVersion: number;
  triggerStatsRefresh: () => void;
}

interface Stats {
  totalMessages: number;
  unreadMessages: number;
  repliedMessages: number;
  readMessages: number;
  responseRate: number;
  averageResponseTimeMinutes: number;
  inquiryCategories: {
    booking: number;
    safety: number;
    pricing: number;
    other: number;
  };
}

export default function AdminDashboard({ onBackToLanding, messagesVersion, triggerStatsRefresh }: AdminDashboardProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [filterType, setFilterType] = React.useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Reply box state
  const [replyText, setReplyText] = React.useState('');
  const [isReplying, setIsReplying] = React.useState(false);
  const [replyLog, setReplyLog] = React.useState<string[]>([]);
  const [showReplyLog, setShowReplyLog] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Fetch Stats & Messages from API
  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const msgRes = await fetch('/api/messages');
      const msgData = await msgRes.json();
      setMessages(msgData);

      // If no message is selected, select the first one by default
      if (msgData.length > 0 && !selectedMessage) {
        setSelectedMessage(msgData[0]);
      } else if (selectedMessage) {
        // Keep selected message in sync
        const updated = msgData.find((m: Message) => m.id === selectedMessage.id);
        if (updated) setSelectedMessage(updated);
      }

      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (e) {
      console.error("Error fetching data", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [messagesVersion]);

  // Mark message as read/unread
  const handleStatusChange = async (id: string, newStatus: 'read' | 'unread') => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchData();
        triggerStatsRefresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Submit traveler answer reply
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyText) return;

    setIsReplying(true);
    setShowReplyLog(true);

    // Dynamic output of outbound SMTP transaction simulation
    const steps = [
      `Connecting to outgoing SMTP gateway server...`,
      `Handshaking TLS session on port 587...`,
      `EHLO bromo-smtp-outbox`,
      `AUTH LOGIN [JWT Admin Session Signed]`,
      `MAIL FROM: <replies@wanderlush.com>`,
      `RCPT TO: <${selectedMessage.email}>`,
      `DATA [Draft content: ${replyText.slice(0, 30)}...]`,
      `Message-ID: <reply-${selectedMessage.id}@wanderlush.local>`,
      `Sending payload bytes via AWS SES transport...`,
      `Email submission delivered successfully to carrier!`
    ];

    setReplyLog([]);
    for (let i = 0; i < steps.length; i++) {
      setReplyLog(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    try {
      const res = await fetch(`/api/messages/${selectedMessage.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ replyText })
      });

      if (res.ok) {
        const result = await res.json();
        setReplyText('');
        fetchData();
        triggerStatsRefresh();
        // Highlight updated selectedMessage with reply
        setSelectedMessage(result.fullMessage);
      }
    } catch (err) {
      console.error("Failed to post reply", err);
    } finally {
      setIsReplying(false);
    }
  };

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message? This action is irreversible.")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSelectedMessage(null);
        fetchData();
        triggerStatsRefresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filter messages dynamically on frontend
  const filteredMessages = messages.filter(msg => {
    const matchesFilter = filterType === 'all' || msg.status === filterType;
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-200 select-none flex flex-col" id="admin-main-view">
      
      {/* Top operational alert status header */}
      <div className="bg-amber-400 text-stone-950 px-6 py-2 flex items-center justify-between text-xs md:text-sm font-semibold selection:bg-stone-900 border-b border-stone-800" id="admin-alert-strip">
        <div className="flex items-center space-x-2">
          <Flame className="h-4 w-4 animate-bounce" />
          <span><b>ADMIN TESTING PORTAL ACTIVE</b> — Review live SMTP logs and manage mailbox incoming streams on rionxee@gmail.com</span>
        </div>
        <button
          onClick={onBackToLanding}
          className="underline hover:no-underline font-bold focus:outline-none cursor-pointer"
        >
          Return to Landing Page
        </button>
      </div>

      {/* Main Admin Navigation and Branding Bar */}
      <header className="px-6 py-5 bg-stone-900/40 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-white tracking-wider text-base md:text-lg">
              WANDERLUSH CLOUD PORTAL
            </h1>
            <p className="text-[10px] text-stone-500 font-mono">MAIL TRANSFER SERVICE SERVER v1.8.4</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchData}
            title="Refresh Inbound Queue"
            className={`p-2.5 bg-stone-900 hover:bg-stone-800 rounded-xl border border-white/10 transition cursor-pointer ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
          
          <button
            onClick={onBackToLanding}
            className="px-5 py-2.5 bg-white text-stone-950 rounded-xl font-sans text-xs font-bold tracking-wider hover:bg-stone-200 transition focus:outline-none cursor-pointer"
          >
            Landing Page View
          </button>
        </div>
      </header>

      {/* Operational Stats Analytics Deck */}
      {stats && (
        <section className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-stone-900/20 border-b border-white/5" id="stats-deck">
          {/* Card 1: Inbox Volume */}
          <div className="bg-stone-900/60 p-5 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Inbound Enquiries</p>
              <h4 className="text-3xl font-sans font-bold text-white mt-1">{stats.totalMessages}</h4>
              <p className="text-[10px] text-emerald-400 mt-1">● Stored and persistent in DB</p>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
              <Mail className="h-6 w-6" />
            </div>
          </div>

          {/* Card 2: Unread Queue */}
          <div className="bg-stone-900/60 p-5 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Unread Alerts</p>
              <h4 className="text-3xl font-sans font-bold text-amber-400 mt-1">{stats.unreadMessages}</h4>
              <p className="text-[10px] text-stone-400 mt-1">Requires immediate review</p>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl relative">
              <ShieldAlert className="h-6 w-6" />
              {stats.unreadMessages > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              )}
            </div>
          </div>

          {/* Card 3: Outbox Mail Delivery */}
          <div className="bg-stone-900/60 p-5 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">SMTP Email Status</p>
              <h4 className="text-3xl font-sans font-bold text-teal-400 mt-1">{stats.repliedMessages + stats.readMessages}</h4>
              <p className="text-[10px] text-teal-400 mt-1">✔ SMTP Transport Success</p>
            </div>
            <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl">
              <MailCheck className="h-6 w-6" />
            </div>
          </div>

          {/* Card 4: Agent KPI Response Rate */}
          <div className="bg-stone-900/60 p-5 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Email Response KPI</p>
              <h4 className="text-3xl font-sans font-bold text-white mt-1">{stats.responseRate}%</h4>
              <p className="text-[10px] text-stone-400 mt-1">Target benchmark: {stats.averageResponseTimeMinutes} mins avg</p>
            </div>
            {/* Simple Circular metric inside */}
            <div className="w-12 h-12 rounded-full border-4 border-teal-500/30 border-t-teal-400 flex items-center justify-center font-mono font-bold text-[10px] text-teal-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </section>
      )}

      {/* Main Mailbox Dashboard Layout split */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden" id="dashboard-operational-split">
        
        {/* LEFT COLUMN: Message Feeds list (Lg: col-span-5) */}
        <div className="lg:col-span-5 border-r border-white/5 flex flex-col bg-stone-900/10 max-h-[70vh] lg:max-h-none overflow-y-auto" id="left-inbox-navigation">
          
          {/* List Search and Filter bar */}
          <div className="p-4 border-b border-white/5 space-y-3 shrink-0">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-500" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by traveller name, keyword..."
                className="w-full pl-9 pr-4 py-2.5 bg-stone-950 border border-white/10 rounded-xl text-xs text-white placeholder-stone-500 outline-none focus:border-amber-400"
              />
            </div>

            {/* Inbound sub-filter buttons */}
            <div className="flex bg-stone-950/80 p-1.5 rounded-lg border border-white/5 gap-1 text-[10px] font-bold">
              {(['all', 'unread', 'read', 'replied'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex-1 py-1.5 capitalize rounded transition cursor-pointer ${
                    filterType === type 
                      ? 'bg-stone-800 text-white border border-white/10' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* List of elements */}
          <div className="flex-grow overflow-y-auto divide-y divide-white/5" id="inbound-scrollable-stack">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (msg.status === 'unread') {
                        handleStatusChange(msg.id, 'read');
                      }
                    }}
                    className={`p-5 transition duration-200 cursor-pointer text-left relative flex flex-col gap-1.5 border-l-4 ${
                      isSelected 
                        ? 'bg-stone-900 border-l-amber-400' 
                        : 'hover:bg-stone-900/60 border-l-transparent'
                    } ${msg.status === 'unread' ? 'font-bold bg-white/[0.02]' : ''}`}
                  >
                    {/* Top Row: Name, Time badge */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-stone-500">
                      <span>{msg.name}</span>
                      <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Middle: Subject line */}
                    <h5 className="font-sans text-xs text-white tracking-tight line-clamp-1">
                      {msg.subject}
                    </h5>

                    {/* Excerpt body */}
                    <p className="text-stone-400 text-[11px] line-clamp-2 select-none pointer-events-none">
                      {msg.message}
                    </p>

                    {/* Status marker */}
                    <div className="flex items-center justify-between text-[10px] uppercase font-mono font-bold mt-1">
                      <span className="text-stone-400 truncate max-w-[150px]">{msg.email}</span>
                      
                      <div className="flex gap-2">
                        {msg.status === 'unread' && (
                          <span className="text-amber-400 text-[9px] bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">NEW INBOX</span>
                        )}
                        {msg.status === 'replied' && (
                          <span className="text-teal-400 text-[9px] bg-teal-400/10 px-2 py-0.5 rounded border border-teal-400/20">REPLIED</span>
                        )}
                        {msg.status === 'read' && (
                          <span className="text-stone-400 text-[9px] bg-stone-800 px-2 py-0.5 rounded">READ</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-10 text-center text-stone-500 text-xs">
                No inquiries matching constraints.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Full Read & Outbound Reply controls (Lg: col-span-7) */}
        <div className="lg:col-span-7 flex flex-col max-h-[85vh] lg:max-h-none overflow-y-auto bg-stone-950" id="right-message-viewer">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 flex flex-col gap-6"
                id="message-reader-root"
              >
                {/* Header Actions */}
                <div className="flex flex-wrap justify-between items-center border-b border-white/5 pb-6 gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-stone-500">ID: {selectedMessage.id}</span>
                    <h3 className="font-sans font-bold text-xl text-white tracking-tight mt-1">
                      {selectedMessage.subject}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Toggle read/unread manual trigger */}
                    <button
                      onClick={() => handleStatusChange(selectedMessage.id, selectedMessage.status === 'unread' ? 'read' : 'unread')}
                      className="p-2 bg-stone-900 border border-white/15 hover:bg-stone-800 rounded-lg text-xs text-stone-300 font-semibold focus:outline-none cursor-pointer"
                    >
                      Mark as {selectedMessage.status === 'unread' ? 'Read' : 'Unread'}
                    </button>
                    {/* Delete item */}
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="p-2 border border-red-500/30 hover:bg-red-500/20 rounded-lg text-red-400 focus:outline-none cursor-pointer"
                      title="Purge message database"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Sender card Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-900/50 p-4 rounded-2xl border border-white/10 text-xs">
                  <div>
                    <p className="text-[9px] font-mono font-bold text-stone-500 uppercase">TRAVELLER NAME</p>
                    <p className="font-bold text-white text-sm mt-0.5">{selectedMessage.name}</p>
                    <p className="text-stone-400 mt-1">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold text-stone-500 uppercase">CONTACT PHONE / METADATA</p>
                    <p className="font-bold text-stone-300 mt-0.5">{selectedMessage.phone || "No phone provided"}</p>
                    <p className="text-stone-400 mt-1">Submitted: {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Message Body Content */}
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <p className="text-[9px] font-mono font-bold text-stone-500 uppercase mb-3">ORIGINAL INQUIRY TEXT</p>
                  <p className="font-sans text-stone-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Simulated Outbound Auto Mail Transport Logs console panel */}
                <div className="bg-stone-900/60 p-4 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-3">
                    <span className="font-mono text-[10px] font-bold text-amber-300 flex items-center space-x-2">
                      <Terminal className="h-4 w-4 text-amber-400" />
                      <span>SMTP DELIVERY TRANSPORT GATEWAY LOGS</span>
                    </span>
                    <span className="text-[9px] font-mono text-stone-500">Port 587 SSL/TLS Active</span>
                  </div>

                  <div className="font-mono text-[9px] text-stone-400 space-y-1 max-h-36 overflow-y-auto selection:bg-stone-600">
                    {selectedMessage.emailLog ? (
                      selectedMessage.emailLog.map((line, idx) => (
                        <p key={idx} className="leading-relaxed hover:bg-white/5 px-1 py-0.5 rounded select-text">
                          {line.startsWith("C") || line.startsWith("2") || line.startsWith("M") || line.startsWith("R") || line.startsWith("D") || line.startsWith("S") ? (
                            <span className="text-amber-400/90 font-bold">{line}</span>
                          ) : line.startsWith("---") ? (
                            <span className="text-stone-500 font-bold">{line}</span>
                          ) : (
                            <span>{line}</span>
                          )}
                        </p>
                      ))
                    ) : (
                      <p className="text-stone-600 italic">// No email logs recorded for this inquiry.</p>
                    )}
                  </div>
                </div>

                {/* Existing Replies in historical thread */}
                {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-[9px] font-mono font-bold text-stone-500 uppercase">HISTORICAL COMMUNICATION THREAD</p>
                    {selectedMessage.replies.map((rep) => (
                      <div key={rep.id} className="p-4 bg-teal-950/20 border border-teal-500/20 rounded-2xl text-xs flex flex-col gap-1 text-left">
                        <div className="flex justify-between items-center text-[9px] font-mono text-teal-400 uppercase font-bold">
                          <span>👤 ADMINISTRATOR RESPONDENT</span>
                          <span>{new Date(rep.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-stone-200 mt-1 leading-relaxed font-sans font-medium">
                          {rep.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Outbound Simulator SMTP sender controls */}
                <form onSubmit={handleReplySubmit} className="space-y-3 pt-4 border-t border-white/5">
                  <p className="text-[9px] font-mono font-bold text-stone-500 uppercase">COMPOSE OUTBOUND SMTP MAIL RESPONSE</p>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Compose responsive email back to ${selectedMessage.name} (${selectedMessage.email}). It will automatically route via Compasses Outbound Mail queue...`}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none min-h-[100px]"
                  />

                  {/* Send and SMTP toggle */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[9px] text-stone-500">
                      Response sends automatically to <b>{selectedMessage.email}</b> and aggregates SMTP transaction telemetry.
                    </span>

                    <button
                      type="submit"
                      disabled={isReplying || !replyText}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-300 disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 rounded-xl font-sans text-xs font-bold tracking-wider hover:shadow-lg transition-all duration-300 flex items-center space-x-2 shrink-0 cursor-pointer"
                    >
                      <span>Simulate SMTP Response</span>
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>

                {/* Running Transaction logs modal drawer */}
                <AnimatePresence>
                  {showReplyLog && (
                    <div className="p-4 bg-stone-900 border border-amber-400/30 rounded-2xl mt-4">
                      <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-amber-400/10">
                        <span className="text-[10px] font-mono text-amber-300 font-bold flex items-center space-x-2">
                          <Terminal className="h-3.5 w-3.5" />
                          <span>SIMULATED OUTBOX SMTP TRANSACTION</span>
                        </span>
                        <button 
                          type="button" 
                          onClick={() => {
                            setShowReplyLog(false);
                            setReplyLog([]);
                          }} 
                          className="bg-stone-950 text-stone-400 hover:text-white px-2 py-0.5 rounded font-mono text-[9px]"
                        >
                          Dismiss Console
                        </button>
                      </div>

                      <div className="font-mono text-[9px] text-amber-200/90 space-y-1">
                        {replyLog.map((log, i) => (
                          <p key={i} className="animate-pulse">✈ {log}</p>
                        ))}
                        {isReplying && <Loader2 className="h-3.5 w-3.5 text-amber-300 animate-spin mt-1" />}
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="p-16 text-center text-stone-500 text-xs flex flex-col items-center justify-center h-full min-h-[300px]">
                <ShieldCheck className="h-12 w-12 text-stone-600 mb-3" />
                <p>No traveler inquiry is currently selected. Select an email block on the left sidebar to analyze SMTP logs and reply.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
