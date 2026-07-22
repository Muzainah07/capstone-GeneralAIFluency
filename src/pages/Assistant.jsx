import { useState } from 'react'

const initialMessages = [
  {
    id: 1,
    sender: 'assistant',
    text: 'Hello! I can answer questions about Muzainah’s education, internship, skills, and projects.',
  },
  {
    id: 2,
    sender: 'user',
    text: 'Tell me about her background.',
  },
]

export default function Assistant() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedInput = input.trim()
    if (!trimmedInput) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedInput,
    }

    setMessages((current) => [...current, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const apiKey = import.meta.env.VITE_LLM_API_KEY
      const apiUrl = import.meta.env.VITE_LLM_API_URL
      const model = import.meta.env.VITE_LLM_MODEL || 'gpt-4o-mini'

      if (!apiKey || !apiUrl) {
        throw new Error('Please add your API key and endpoint to the .env file before chatting.')
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant for Muzainah Faisal’s portfolio website. Answer briefly and professionally using the following context: She is an AI and Frontend Developer, studied BS Computer Science at University of Karachi, interned at FlyRank AI in Front-End AI Engineering, and works with React, Vite, AI interfaces, and frontend development.',
            },
            ...messages.map((message) => ({
              role: message.sender === 'user' ? 'user' : 'assistant',
              content: message.text,
            })),
            { role: 'user', content: trimmedInput },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error('The assistant could not respond right now. Please check your API configuration.')
      }

      const data = await response.json()
      const reply = data.choices?.[0]?.message?.content || 'I could not generate a reply.'

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: reply,
        },
      ])
    } catch (err) {
      setError(err.message || 'Something went wrong while contacting the assistant.')
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 2,
          sender: 'assistant',
          text: 'I could not reach the assistant service. Please check your API setup.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-card assistant-page">
      <div className="section-heading">
        <p className="eyebrow">AI Assistant</p>
        <h1>Ask About My Profile</h1>
      </div>

      <div className="chat-shell">
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <p>{message.text}</p>
            </div>
          ))}

          {loading && (
            <div className="message assistant typing">
              <div className="typing-dots" aria-label="Typing indicator">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        {error && <p className="assistant-error">{error}</p>}

        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about education, skills, or projects"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  )
}
