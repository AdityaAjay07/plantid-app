export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Plant identification is not configured.' })
  }

  const { prompt, mimeType, imageBase64 } = req.body || {}
  if (
    typeof prompt !== 'string' ||
    typeof mimeType !== 'string' ||
    typeof imageBase64 !== 'string' ||
    !imageBase64
  ) {
    return res.status(400).json({ error: 'Missing image or prompt.' })
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: imageBase64 } }
            ]
          }]
        })
      }
    )

    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Gemini request failed.'
      })
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      return res.status(502).json({ error: 'Gemini returned no identification.' })
    }

    return res.status(200).json({ text })
  } catch {
    return res.status(502).json({ error: 'Could not reach Gemini.' })
  }
}
