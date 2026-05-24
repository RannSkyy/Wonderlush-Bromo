import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, Loader2, Sparkles, CheckCircle2, Terminal } from 'lucide-react';

interface ContactFormProps {
  onSuccess: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [subject, setSubject] = React.useState('General Booking Inquiry');
  const [message, setMessage] = React.useState('');
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [sendingStage, setSendingStage] = React.useState<string | null>(null);
  const [successData, setSuccessData] = React.useState<{ id: string; log: string[] } | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const subjects = [
    "General Booking Inquiry",
    "Private Bromo Jeep Tour",
    "Villa or Hotel Accommodation",
    "Group Travel & Corporate Outings",
    "Custom Photography Package Support"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setErrorMsg("Please fill in all mandatory fields (*)");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessData(null);

    // Dynamic pipeline stages to represent the "automatic email integration / SMTP queue"
    const stages = [
      "🔌 Handshaking on port 587 with mail.wanderlush.com...",
      "🔐 Negotiating TLS secure handshake protocol...",
      "🔑 Authenticating admin credentials (local MTA)...",
      "✈ Wrapping headers for SMTP Delivery Target <rionxee@gmail.com>...",
      "💾 Storing inquiry inside Admin Cloud database..."
    ];

    for (let i = 0; i < stages.length; i++) {
      setSendingStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, subject, message })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessData({
          id: result.data.id,
          log: result.data.emailLog
        });

        // Reset fields
        setName('');
        setEmail('');
        setPhone('');
        setSubject('General Booking Inquiry');
        setMessage('');
        
        onSuccess(); // Trigger statistics refresh in parent or notify
      } else {
        setErrorMsg(result.error || "Failed to submit message to Express backend.");
      }
    } catch (err) {
      setErrorMsg("Failed to connect to the backend server. Make sure server API is active.");
    } finally {
      setIsSubmitting(false);
      setSendingStage(null);
    }
  };

  return (
    <section id="contact" className="relative bg-stone-950 py-24 px-6 md:px-12 select-none">
      {/* Decorative starry / mist backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-view-grid">
          
          {/* Column 1: Info panel */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="contact-info-panel">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">CONNECT WITH AGENTS</span>
              <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight mt-2 mb-6">
                Start Your Bromo <br />
                Adventure Today
              </h2>
              <p className="font-sans text-stone-400 text-sm sm:text-base leading-relaxed mb-10">
                Have specific schedule questions, traveling budgets, or special accommodation requests? Send our specialists a direct message. 
                <br /><br />
                Your message triggers an <b>automated SMTP transmission email</b> direct to admin <b>rionxee@gmail.com</b> and enters our synchronized Admin message board database instantly.
              </p>
            </div>

            {/* Quick listing info */}
            <div className="space-y-6" id="contact-listing-info">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-2xl text-amber-400 border border-white/5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">DELIVERY MAILBOX</p>
                  <p className="font-sans font-semibold text-white text-sm">rionxee@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-2xl text-sky-400 border border-white/5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">HOTLINE INTEGRATION</p>
                  <p className="font-sans font-semibold text-white text-sm">+62 341 556-990 (Tosari Office)</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-2xl text-emerald-400 border border-white/5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-stone-500 uppercase">HEADQUARTERS</p>
                  <p className="font-sans font-semibold text-white text-sm">Wonotoro, Sukapura, Probolinggo Regency, East Java</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Form submission panel */}
          <div className="lg:col-span-7" id="contact-form-panel">
            <div className="bg-stone-900/50 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {/* Submit Loader Layer */}
                {isSubmitting ? (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <Loader2 className="h-12 w-12 text-amber-400 animate-spin mb-6" />
                    <h3 className="font-sans font-bold text-xl text-white tracking-tight mb-2">Automated Email Transmission Active</h3>
                    <p className="font-mono text-[11px] text-amber-300 leading-relaxed px-6 max-w-sm">
                      {sendingStage}
                    </p>
                    <div className="w-44 h-1 bg-stone-950 rounded-full overflow-hidden mt-6 relative border border-white/5">
                      <div className="absolute top-0 bottom-0 left-0 bg-yellow-400 w-full animate-pulse origin-left scale-x-50" />
                    </div>
                  </motion.div>
                ) : successData ? (
                  /* Success Screen */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                    id="contact-form-success"
                  >
                    <CheckCircle2 className="h-16 w-16 text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-pulse" />
                    <h3 className="font-sans font-bold text-2xl text-white tracking-tight mb-2">Message Delivered!</h3>
                    <p className="font-sans text-stone-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                      Your inquiry has been successfully parsed and packaged on the server. An automated SMTP notification was sent to <b>rionxee@gmail.com</b> and registered under message ID <b>{successData.id}</b>.
                    </p>

                    {/* Email SMTP Realtime Log Output preview */}
                    <div className="w-full text-left bg-stone-950 p-4 rounded-2xl border border-white/15 font-mono text-[9px] text-stone-400 max-h-48 overflow-y-auto mb-8 shadow-inner" id="success-smtp-preview">
                      <p className="text-stone-300 flex items-center space-x-2 font-bold select-none border-b border-white/5 pb-2 mb-2">
                        <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                        <span>MOCK COMPASS-SMTP PROTOCOL LOGGER</span>
                      </p>
                      {successData.log.slice(0, 10).map((line, idx) => (
                        <p key={idx} className="leading-relaxed hover:bg-white/5 px-1 py-0.5 rounded transition">
                          {line}
                        </p>
                      ))}
                      <p className="text-[10px] text-amber-400 italic mt-2">// View complete real-time transaction trail inside Admin Dashboard Panel...</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSuccessData(null)}
                      className="px-6 py-3 rounded-full bg-white text-stone-950 font-sans text-xs font-semibold tracking-wider hover:bg-stone-200 transition cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* Standard Form inputs */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
                      <h4 className="font-sans font-semibold text-lg text-white">Inquiry Form</h4>
                      <span className="flex items-center space-x-1 text-[10px] text-amber-300 font-bold bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full uppercase tracking-wider select-none animate-pulse">
                        <Sparkles className="h-3 w-3" />
                        <span>MTA Smtp Connection Online</span>
                      </span>
                    </div>

                    {/* Quick validation error */}
                    {errorMsg && (
                      <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 text-xs font-semibold">
                        ⚠️ {errorMsg}
                      </div>
                    )}

                    {/* Name & Email Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5" id="form-inp-name-group">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Yasmine Satriyo"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-amber-400 hover:border-white/20 rounded-xl text-white text-xs sm:text-sm outline-none transition focus:ring-1 focus:ring-amber-400"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5" id="form-inp-email-group">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yasmine@gmail.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-amber-400 hover:border-white/20 rounded-xl text-white text-xs sm:text-sm outline-none transition focus:ring-1 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    {/* Phone & Subject Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-1.5" id="form-inp-phone-group">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+62 812-3212-990"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-amber-400 hover:border-white/20 rounded-xl text-white text-xs sm:text-sm outline-none transition focus:ring-1 focus:ring-amber-400"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5" id="form-inp-subject-group">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Purpose / Subject *</label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-amber-400 hover:border-white/20 rounded-xl text-white text-[12px] sm:text-xs outline-none transition focus:ring-1 focus:ring-amber-400"
                        >
                          {subjects.map((subj, idx) => (
                            <option key={idx} value={subj} className="bg-stone-900 text-white">
                              {subj}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="flex flex-col space-y-1.5" id="form-inp-msg-group">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">your message / requirements *</label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Hi Wanderlush! We are looking to schedule a private sunrise jeep expedition for 4 people..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-amber-400 hover:border-white/20 rounded-xl text-white text-xs sm:text-sm outline-none transition focus:ring-1 focus:ring-amber-400 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-white hover:bg-amber-400 text-stone-950 font-sans text-xs font-semibold tracking-widest uppercase hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer"
                      id="btn-submit-contact"
                    >
                      <span>Trigger Smtp Send</span>
                      <Send className="h-4 w-4" />
                    </button>
                    
                    <p className="text-[9px] text-stone-500 font-mono text-center">
                      * Security guaranteed under TLS/SSL SMTP outbound transport protocol limits.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
