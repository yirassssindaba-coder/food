import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to send. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(253,243,227,0.04)',
    border: '1px solid rgba(253,243,227,0.1)',
    borderRadius: '12px',
    padding: '14px 16px',
    color: '#FDF3E3',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0D0500 0%, #0A0300 100%)' }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(230,51,41,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(244,123,32,0.6)' }}>✦ Contact ✦</p>
          <h2 className="text-5xl md:text-6xl font-black leading-none tracking-tight mb-4">
            <span style={{ background: 'linear-gradient(135deg, #FDF3E3, #F47B20)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              GET IN<br />TOUCH
            </span>
          </h2>
          <p className="text-base max-w-sm mx-auto" style={{ color: 'rgba(253,243,227,0.4)' }}>
            Ada pertanyaan tentang makanan dunia? Kirim pesan dan kami akan segera balas.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 md:p-12"
          style={{ background: 'rgba(253,243,227,0.03)', border: '1px solid rgba(253,243,227,0.07)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(253,243,227,0.4)' }}>Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#F47B20'}
                onBlur={e => e.target.style.borderColor = 'rgba(253,243,227,0.1)'}
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(253,243,227,0.4)' }}>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#F47B20'}
                onBlur={e => e.target.style.borderColor = 'rgba(253,243,227,0.1)'}
              />
            </div>
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(253,243,227,0.4)' }}>Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#F47B20'}
              onBlur={e => e.target.style.borderColor = 'rgba(253,243,227,0.1)'}
            />
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(253,243,227,0.4)' }}>Message *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your food universe..."
              required
              rows={5}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
              onFocus={e => e.target.style.borderColor = '#F47B20'}
              onBlur={e => e.target.style.borderColor = 'rgba(253,243,227,0.1)'}
            />
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-5 py-4 rounded-xl text-sm font-medium"
              style={{ background: 'rgba(48,176,48,0.12)', border: '1px solid rgba(48,176,48,0.3)', color: '#4AE04A' }}
            >
              ✅ Message sent successfully! We'll get back to you soon.
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-5 py-4 rounded-xl text-sm font-medium"
              style={{ background: 'rgba(230,51,41,0.12)', border: '1px solid rgba(230,51,41,0.3)', color: '#F06050' }}
            >
              ❌ {errorMsg}
            </motion.div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 text-sm font-black tracking-[0.2em] uppercase rounded-xl transition-all duration-300"
            style={{
              background: status === 'sending' ? 'rgba(244,123,32,0.4)' : 'linear-gradient(135deg, #F47B20, #E63329)',
              color: '#0D0500',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              boxShadow: status === 'sending' ? 'none' : '0 8px 32px rgba(244,123,32,0.4)',
            }}
          >
            {status === 'sending' ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  ◈
                </motion.span>
                Sending...
              </span>
            ) : '→ Send Message'}
          </button>
        </motion.form>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {[
            { icon: '✉️', label: 'Email', value: 'redeemself0@gmail.com' },
            { icon: '🌍', label: 'Universe', value: 'Culinarax Food Universe' },
            { icon: '📚', label: 'Compendium', value: '80+ Foods, 13 Batches' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(253,243,227,0.4)' }}>
              <span>{item.icon}</span>
              <span style={{ color: 'rgba(253,243,227,0.25)' }}>{item.label}:</span>
              <span style={{ color: 'rgba(253,243,227,0.6)' }}>{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
