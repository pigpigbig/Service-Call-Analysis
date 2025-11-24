import { useState } from 'react'
import './App.css'
import transcript from './data/transcript.json'
import { stages } from './data/analysis'
import type { StageId } from './data/analysis'

type TranscriptEntry = {
  start: number
  end: number
  speaker: string
  text: string
}

function App() {
  const data = transcript as TranscriptEntry[]
  const [openStageIds, setOpenStageIds] = useState<StageId[]>([])

  const formatTime = (seconds: number) => {
    const totalSeconds = Math.max(0, Math.floor(seconds))
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const speakerLabel = (code: string) => {
    if (code.toUpperCase() === 'B') return 'Technician'
    if (code.toUpperCase() === 'A') return 'Customer'
    return `Speaker ${code}`
  }

  const windowed = (start?: number, end?: number) => {
    if (start === undefined || end === undefined) return data
    return data.filter((row) => row.start >= start && row.start <= end)
  }

  const toggleStage = (id: StageId) => {
    setOpenStageIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
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

      <section className="accordions">
        {stages.map((stage) => {
          const entries = windowed(stage.timeWindow?.[0], stage.timeWindow?.[1])
          const isOpen = openStageIds.includes(stage.id)
          return (
            <article key={stage.id} className={`accordion ${isOpen ? 'is-open' : ''}`}>
              <header className="accordion__header" onClick={() => toggleStage(stage.id)}>
                <div className="accordion__title">
                  <span className={`chevron ${isOpen ? 'chevron--open' : ''}`} aria-hidden="true">
                    ▸
                  </span>
                  <h2>{stage.title}</h2>
                </div>
                <div className="accordion__meta">
                  <span className="chip">{entries.length} excerpts</span>
                  {stage.id === 'callType' ? (
                    <div className="label">Sales follow-up after repair</div>
                  ) : stage.id === 'salesInsights' ? (
                    <div className="label">Sales signals & opportunities</div>
                  ) : (
                    <div className={`badge badge--${stage.verdict}`}>
                      {stage.verdict === 'met' ? 'Met' : stage.verdict === 'partial' ? 'Partial' : 'Missed'}
                    </div>
                  )}
                </div>
              </header>
              {isOpen && (
                <div className="accordion__body">
                  <p className="summary-text">{stage.summary}</p>
                  <ul className="checks">
                    {stage.checks.map((check, idx) => {
                      const subset = check.timeWindow
                        ? windowed(check.timeWindow[0], check.timeWindow[1])
                        : entries
                      return (
                        <li key={idx} className="check">
                          <div className="check__header">
                            {stage.id !== 'callType' && (
                              <div className={`badge badge--${check.status}`}>
                                {check.status === 'met'
                                  ? 'Met'
                                  : check.status === 'partial'
                                    ? 'Partial'
                                    : 'Missed'}
                              </div>
                            )}
                            <div>
                              <div className="check__label">{check.label}</div>
                              <div className="check__detail">{check.detail}</div>
                            </div>
                          </div>
                          {subset.length > 0 && (
                            <details className="transcript">
                              <summary>Show related transcript ({subset.length})</summary>
                              <div className="transcript__list">
                                {subset.map((row, ridx) => (
                                  <div key={`${row.start}-${ridx}`} className="transcript__row">
                                    <div className="time">{formatTime(row.start)}</div>
                                    <div className="speaker">{speakerLabel(row.speaker)}</div>
                                    <div className="text">{row.text}</div>
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                  {entries.length === 0 && (
                    <div className="empty">No timestamped excerpts for this stage.</div>
                  )}
                </div>
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
              <div className="time">{formatTime(row.start)}</div>
              <div className="speaker">{speakerLabel(row.speaker)}</div>
              <div className="text">{row.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
