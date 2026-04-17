'use client';

import { useState, useRef, useEffect } from 'react';

export default function DesignerChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Canvas drawing setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#7B2CBF';
  }, []);

  const startDraw = (e) => {
    isDrawing.current = true;
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const stopDraw = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    setChat([...chat, { sender: 'user', text: message }]);

    // Fake designer reply
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { sender: 'designer', text: 'Nice idea! I will design it ✨' },
      ]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-[#7B2CBF] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition"
      >
        💬
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border">

          {/* Header */}
          <div className="bg-[#7B2CBF] text-white p-3 font-bold flex justify-between">
            Chat with Designer 🎨
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-[#F2E9E4]">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.sender === 'user'
                    ? 'bg-[#FFD166] ml-auto'
                    : 'bg-white'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Drawing Canvas */}
          <div className="p-2 bg-white border-t">
            <p className="text-sm font-semibold mb-1 text-[#7B2CBF]">
              Draw your design:
            </p>
            <canvas
              ref={canvasRef}
              width={260}
              height={150}
              className="border rounded-lg cursor-crosshair"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
            />
            <button
              onClick={clearCanvas}
              className="mt-1 text-xs text-red-500"
            >
              Clear
            </button>
          </div>

          {/* Input */}
          <div className="flex border-t">
            <input
              type="text"
              placeholder="Type your idea..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-[#7B2CBF] text-white px-4"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}