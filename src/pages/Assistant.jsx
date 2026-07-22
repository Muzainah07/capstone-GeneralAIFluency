import { useEffect, useRef, useState } from 'react'

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: 'Hello! I can answer questions about Muzainah’s education, internship, skills, and projects.',
  },
  {
    id: 2,
    role: 'user',
    content: 'Tell me about her background.',
  },
]

export default function Assistant() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedInput = input.trim()
    if (!trimmedInput) {
      setError('Please enter a question before sending.')
      return
    }

    if (loading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: trimmedInput,
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      })

      let data = {}
      let responseText = ''
      try {
        responseText = await response.text()
        if (responseText) {
          data = JSON.parse(responseText)
        }
      } catch (parseError) {
        console.error('[assistant] Failed to parse backend response', parseError, responseText)
        data = { details: responseText || 'No response body received from the assistant.' }
      }

      if (!response.ok) {
        const message =
          data?.details || data?.error || 'The assistant could not respond right now.'
        throw new Error(message)
      }

      const reply = data.reply || 'I could not generate a reply.'

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: reply,
        },
      ])
    } catch (err) {
      const fallbackMessage =
        'Sorry, I’m having trouble responding right now. Please try again in a moment.'

      const friendlyError =
        err.message === 'Request timed out'
          ? 'The assistant is taking too long to respond. Please try again in a moment.'
          : import.meta.env.DEV && err.message
            ? `Debug: ${err.message}`
            : 'Something went wrong while contacting the assistant.'

      console.error('[assistant] Request failed', err)
      setError(friendlyError)
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 2,
          role: 'assistant',
          content: fallbackMessage,
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
            <div key={message.id} className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}>
              <p>{message.content}</p>
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

          <div ref={messagesEndRef} />
        </div>

        {error && <p className="assistant-error">{error}</p>}

        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about education, skills, or projects"
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  )
}
