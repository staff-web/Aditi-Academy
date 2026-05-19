import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Send, X } from 'lucide-react';

type ChatMessage = {
  sender: 'bot' | 'user';
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    sender: 'bot',
    text: 'Hello! I’m Aditi Assist. Ask me about programs, training, or career support.',
  },
];

function getBotReply(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes('program') || lower.includes('course')) {
    return 'We offer individual courses in cloud, cybersecurity, software development, and data analytics. Which area are you interested in?';
  }

  if (lower.includes('register') || lower.includes('enroll') || lower.includes('sign up')) {
    return 'Great! Please share your name, email, and preferred track. I’ll help guide you to the right registration form.';
  }

  if (lower.includes('enterprise') || lower.includes('team') || lower.includes('organization')) {
    return 'For enterprise training, I can help you request a proposal and share team training options.';
  }

  if (lower.includes('pricing') || lower.includes('cost') || lower.includes('fee')) {
    return 'Pricing depends on the program and format. Tell me whether you want self-paced, live, or corporate training.';
  }

  return 'That sounds great. Can you tell me a bit more about your goal so I can recommend the best option?';
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    const userMessage = { sender: 'user' as const, text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setDraft('');
    setIsTyping(true);

    window.setTimeout(() => {
      const botMessage = { sender: 'bot' as const, text: getBotReply(trimmed) };
      setMessages((current) => [...current, botMessage]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative pointer-events-auto"
      >
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-4 w-80 rounded-3xl bg-white border border-gray-200 shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
          >
            <div className="flex items-center justify-between bg-red-600 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">Aditi Chat</p>
                <p className="text-xs text-red-100">AI assistant</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white hover:text-red-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={`${message.sender}-${index}`}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                      message.sender === 'user'
                        ? 'bg-red-600 text-white rounded-br-[6px] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl'
                        : 'bg-white text-gray-900 rounded-bl-[6px] rounded-tr-3xl rounded-tl-3xl rounded-br-3xl border border-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping ? (
                <div className="flex justify-start">
                  <div className="rounded-3xl bg-white px-4 py-3 text-sm text-gray-600 border border-gray-200">
                    Aditi is typing...
                  </div>
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="border-t border-gray-200 bg-white px-4 py-3">
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-red-600 focus:ring-red-100 focus:outline-none focus:ring"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="flex items-center gap-3 rounded-full bg-red-600 px-5 py-3 shadow-2xl shadow-red-900/30 text-white pointer-events-auto"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-semibold">Chat</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
