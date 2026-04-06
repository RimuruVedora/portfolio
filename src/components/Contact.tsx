import { useRef, useState } from 'react';

const Contact = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const res = await fetch('https://formsubmit.co/ajax/maginghotdogpano@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: 'New Portfolio Contact from ' + formData.name,
                    _captcha: 'false',
                    _template: 'box',
                }),
            });

            if (res.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative w-full min-h-screen bg-[#0a0a16] snap-start flex flex-col items-center overflow-x-hidden px-6 sm:px-10 md:px-14 lg:px-20"
            style={{ paddingTop: '110px', paddingBottom: '80px' }}
        >
            {/* Ambient orbs */}
            <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div ref={sectionRef} className="w-full max-w-6xl z-10 flex flex-col gap-14">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-3">
                    <span className="text-lg font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                        Get In Touch
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">Let's Connect</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
                </div>

                {/* Two columns */}
                <div className="flex flex-col md:flex-row gap-10 w-full">

                    {/* LEFT: Social cards */}
                    <div className="flex-1 flex flex-col gap-5">
                        <div style={{ marginBottom: '12px' }}>
                            <h3 className="text-2xl font-bold text-white" style={{ marginBottom: '12px' }}>Reaching Out</h3>
                            <p className="text-gray-400 text-base leading-relaxed">
                                Whether you have a project in mind, a question about my work, or just want to say hi — connect with me directly on my socials!
                            </p>
                        </div>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/celherson-a-guzman-99aba63a8?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] hover:border-blue-500/50 hover:bg-white/[0.06] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,102,194,0.2)]"
                            style={{ padding: '28px 32px' }}
                        >
                            <div
                                className="shrink-0 flex items-center justify-center rounded-2xl bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg"
                                style={{ width: '60px', height: '60px' }}
                            >
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">LinkedIn</span>
                                <span className="text-blue-400 text-sm font-medium mt-1">Professional Network</span>
                            </div>
                        </a>

                        {/* Facebook */}
                        <a
                            href="https://web.facebook.com/TheunforgivenHunter"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] hover:border-[#1877F2]/50 hover:bg-white/[0.06] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(24,119,242,0.2)]"
                            style={{ padding: '28px 32px' }}
                        >
                            <div
                                className="shrink-0 flex items-center justify-center rounded-2xl bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg"
                                style={{ width: '60px', height: '60px' }}
                            >
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">Facebook</span>
                                <span className="text-[#1877F2] text-sm font-medium mt-1">Social Network</span>
                            </div>
                        </a>
                    </div>

                    {/* RIGHT: Contact form */}
                    <div className="flex-1">
                        <div
                            className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                            style={{ padding: 'clamp(20px, 3.5vw, 40px)' }}
                        >
                            <h3 className="text-2xl font-bold text-white" style={{ marginBottom: '28px' }}>Send a Direct Message</h3>

                            {/* Success state */}
                            {submitStatus === 'success' && (
                                <div className="flex flex-col items-center text-center gap-4 py-10">
                                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h4 className="text-2xl font-black text-emerald-400">Message Sent!</h4>
                                    <p className="text-gray-400">Your message has been delivered to my inbox. I'll get back to you soon!</p>
                                    <button
                                        onClick={() => setSubmitStatus('idle')}
                                        className="mt-4 text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            )}

                            {/* Error state */}
                            {submitStatus === 'error' && (
                                <div className="mb-4 flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl" style={{ padding: '16px' }}>
                                    <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-red-400 text-sm font-medium">Something went wrong. Please try again or contact me directly via LinkedIn.</p>
                                </div>
                            )}

                            {/* Form — hidden on success */}
                            {submitStatus !== 'success' && (
                                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-medium placeholder:text-gray-600"
                                            style={{ padding: '16px 20px' }}
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-medium placeholder:text-gray-600"
                                            style={{ padding: '16px 20px' }}
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-medium placeholder:text-gray-600 resize-none"
                                            style={{ padding: '16px 20px' }}
                                            placeholder="Hello Celherson, I'd like to talk about..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-black text-base rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ padding: '18px 24px', marginTop: '8px' }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <span>Deploy Message</span>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
