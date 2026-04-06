import { useState, useRef, useEffect } from 'react';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi there! 👋 I'm Celherson's portfolio bot. Leave me your message and name — I'll forward it straight to his inbox!" }
  ]);
  const [input, setInput] = useState('');
  const [senderName, setSenderName] = useState('');
  const [step, setStep] = useState<'name' | 'message'>('name');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user message to chat
    setMessages(prev => [...prev, { from: 'user', text: trimmed }]);
    setInput('');

    if (step === 'name') {
      setSenderName(trimmed);
      setStep('message');
      setTimeout(() => {
        setMessages(prev => [...prev, { from: 'bot', text: `Nice to meet you, ${trimmed}! 😊 What would you like to say to Celherson?` }]);
      }, 600);
    } else {
      // Send to Gmail via FormSubmit AJAX
      setIsSending(true);
      try {
        await fetch('https://formsubmit.co/ajax/maginghotdogpano@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: senderName,
            message: trimmed,
            _subject: `💬 Chat message from ${senderName} (Portfolio Chat)`,
            _captcha: 'false',
          }),
        });
        setSent(true);
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { from: 'bot', text: `✅ Your message has been delivered to Celherson's inbox! He'll get back to you soon. 🚀` }
          ]);
        }, 600);
      } catch {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { from: 'bot', text: `❌ Hmm, something went wrong. Please try the Contact form instead!` }
          ]);
        }, 600);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* Chat Window */}
      <div
        className={`bg-gray-900/95 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out origin-bottom-right mb-4 flex flex-col ${
          isOpen ? 'scale-100 opacity-100 w-80 h-[28rem]' : 'scale-0 opacity-0 w-0 h-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px' }} className="bg-gradient-to-r from-indigo-600 to-purple-600 shrink-0">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Let's Chat!
          </h3>
          <p className="text-indigo-200 text-xs mt-1">Messages go directly to Celherson's Gmail</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3" style={{ padding: '16px' }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                  msg.from === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-white/10 text-gray-200 border border-white/5 rounded-bl-sm'
                }`}
                style={{ padding: '10px 14px' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-sm flex gap-1 items-center" style={{ padding: '10px 14px' }}>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 bg-black/20 shrink-0" style={{ padding: '12px 16px' }}>
          {sent ? (
            <p className="text-center text-xs text-indigo-300 font-semibold" style={{ padding: '8px 0' }}>
              Message sent! ✅ Celherson will reply via email.
            </p>
          ) : (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={step === 'name' ? 'Enter your name...' : 'Type your message...'}
                disabled={isSending}
                className="flex-1 bg-white/5 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-500 disabled:opacity-50"
                style={{ padding: '10px 16px' }}
              />
              <button
                onClick={handleSend}
                disabled={isSending || !input.trim()}
                className="w-9 h-9 shrink-0 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-white rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19V6m0 0l-8 8m8-8l8 8" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(99,102,241,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 relative ${
          isOpen ? 'rotate-90' : ''
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-500 rounded-full">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default FloatingChat;
