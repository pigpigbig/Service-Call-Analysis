import './App.css'
import transcript from './data/transcript.json'
import { stages } from './data/analysis'

type TranscriptEntry = {
  start: number
  end: number
  speaker: string
  text: string
}

function App() {
  const data = transcript as TranscriptEntry[]

  const windowed = (start?: number, end?: number) => {
    if (start === undefined || end === undefined) return data
    return data.filter((row) => row.start >= start && row.start <= end)
  }

  return (
    <div className="page">
      <header className="page__hero">
        <div className="pill pill--accent">Service Call Recording Analysis</div>
        <h1>HVAC Replacement Consult</h1>
        <p className="lede">
          Transcript and compliance review for a technician–customer call. Stages are scored and linked to relevant
          excerpts with timestamps.
        </p>
      </header>

      <section className="grid">
        {stages.map((stage) => {
          const entries = windowed(stage.timeWindow?.[0], stage.timeWindow?.[1])
          return (
            <article key={stage.id} className="card">
              <div className="card__header">
                <div className={`badge badge--${stage.verdict}`}>
                  {stage.verdict === 'met' ? 'Met' : stage.verdict === 'partial' ? 'Partial' : 'Missed'}
                </div>
                <h2>{stage.title}</h2>
              </div>
              <p className="summary">{stage.summary}</p>
              <ul className="notes">
                {stage.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
              {entries.length > 0 && (
                <details className="transcript">
                  <summary>Related excerpts ({entries.length})</summary>
                  <div className="transcript__list">
                    {entries.map((row, idx) => (
                      <div key={`${row.start}-${idx}`} className="transcript__row">
                        <div className="time">{row.start.toFixed(2)}s</div>
                        <div className="speaker">Speaker {row.speaker}</div>
                        <div className="text">{row.text}</div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </article>
          )
        })}
      </section>

      <section className="transcript-full">
        <div className="section-header">
          <h2>Full Transcript</h2>
          <p>{data.length} utterances • click any stage above to see filtered snippets.</p>
        </div>
        <div className="transcript__list transcript__list--full">
          {data.map((row, idx) => (
            <div key={`${row.start}-${idx}`} className="transcript__row">
              <div className="time">{row.start.toFixed(2)}s</div>
              <div className="speaker">Speaker {row.speaker}</div>
              <div className="text">{row.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
