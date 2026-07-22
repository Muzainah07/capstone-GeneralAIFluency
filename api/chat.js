import { SYSTEM_PROMPT } from '../src/data/systemPrompt.js'

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { messages = [] } = request.body || {}
    const apiKey = process.env.LLM_API_KEY
    const apiUrl = process.env.LLM_API_URL
    const model = process.env.LLM_MODEL || 'gpt-4o-mini'

    if (!apiKey || !apiUrl) {
      return response.status(500).json({
        error: 'Missing server-side environment variables',
        details: 'The assistant is not configured yet. Please set LLM_API_KEY and LLM_API_URL in your Vercel environment settings.',
      })
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return response.status(400).json({
        error: 'Empty message array',
        details: 'Please send at least one message to the assistant.',
      })
    }

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || typeof lastMessage.content !== 'string' || !lastMessage.content.trim()) {
      return response.status(400).json({
        error: 'Empty message content',
        details: 'Please enter a question before sending it to the assistant.',
      })
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const llmResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text()
      return response.status(llmResponse.status).json({
        error: 'LLM request failed',
        details: errorText || 'Unknown error from upstream LLM provider',
      })
    }

    const data = await llmResponse.json()
    const reply = data.choices?.[0]?.message?.content || 'I could not generate a reply.'

    return response.status(200).json({ reply })
  } catch (error) {
    if (error.name === 'AbortError') {
      return response.status(504).json({
        error: 'Request timed out',
        details: 'The assistant took too long to respond. Please try again in a moment.',
      })
    }

    return response.status(500).json({
      error: 'Assistant request failed',
      details: error.message || 'Unexpected server error',
    })
  }
}
