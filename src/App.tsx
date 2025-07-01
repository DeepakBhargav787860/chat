import { useState, useEffect } from "react";

const socket = new WebSocket("wss://mysocket-6xmu.onrender.com/ws");

function App() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(
    "user" + Math.floor(Math.random() * 100)
  );
  console.log(setUsername);
  useEffect(() => {
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev: any) => [...prev, msg]);
    };
  }, []);

  const sendMessage = () => {
    const msg = { username, content: input };
    socket.send(JSON.stringify(msg));
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🟢 Chat App</h2>
      <div
        style={{
          maxHeight: 300,
          overflowY: "scroll",
          border: "1px solid black",
          padding: 10,
        }}
      >
        {messages.map((msg: any, idx: any) => (
          <div key={idx}>
            <b>{msg.username}:</b> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Sendssssss</button>
    </div>
  );
}

export default App;
