'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#7B2CBF';
  }, []);

  const startDraw = (e) => {
  isDrawing.current = true;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();

  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
};
  const stopDraw = () => (isDrawing.current = false);

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

  const sendMessage = () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { sender: 'user', text: message }]);

    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { sender: 'designer', text: 'Nice idea! I will design it ✨' }
      ]);
    }, 1000);

    setMessage('');
  };
  const sendDrawing = () => {
  const canvas = canvasRef.current;
  const image = canvas.toDataURL('image/png');

  setChat((prev) => [...prev, { sender: 'user', image }]);

  setTimeout(() => {
    setChat((prev) => [
      ...prev,
      { sender: 'designer', text: 'Got your design! 👍' }
    ]);
  }, 1000);

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

  return (
    <div className="min-h-screen bg-[#F2E9E4] text-gray-900 p-6">

      <h1 className="text-2xl font-bold text-[#7B2CBF] mb-4">
        Chat with Designer
      </h1>

      {/* Chat messages */}
      <div className="h-80 overflow-y-auto bg-white p-3 rounded-lg mb-3 shadow">
        {chat.map((msg, i) => (
          <div
  key={i}
  className={`p-2 my-1 rounded max-w-[70%] ${
    msg.sender === 'user'
      ? 'bg-[#FFD166] ml-auto'
      : 'bg-white'
  }`}
>
  {msg.text && <p>{msg.text}</p>}
  {msg.image && (
    <img src={msg.image} className="rounded mt-2" />
  )}
</div>
        ))}
      </div>

      {/* Drawing canvas */}
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className="border rounded-lg mb-2 cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
      />
      <button
  onClick={sendDrawing}
  className="bg-[#FFD166] text-[#7B2CBF] px-4 py-2 rounded mb-2 hover:scale-105 transition"
>
  Send Drawing
</button>

      {/* Input */}
      <div className="flex">
        <input
          type="text"
          placeholder="Type your idea..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-[#7B2CBF] text-white px-4"
        >
          Send
        </button>
      </div>

    </div>
  );
}