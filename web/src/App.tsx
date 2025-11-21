import { useState } from 'react'
import './App.css'
import transcript from './data/transcript.json'
import { stages } from './data/analysis'
import type { StageId, Stage } from './data/analysis'

type TranscriptEntry = {
  start: number
  end: number
  speaker: string
  text: string
}

function App() {
  const data = transcript as TranscriptEntry[]
  const [selectedStageId, setSelectedStageId] = useState<StageId>('introduction')

  const formatTime = (seconds: number) => {
    const totalSeconds = Math.max(0, Math.floor(seconds))
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const windowed = (start?: number, end?: number) => {
    if (start === undefined || end === undefined) return data
    return data.filter((row) => row.start >= start && row.start <= end)
  }

  const selectedStage: Stage =
    stages.find((stage) => stage.id === selectedStageId) ?? stages[0]

  const selectedEntries = windowed(
    selectedStage.timeWindow?.[0],
    selectedStage.timeWindow?.[1]
  )

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
              <div className="card__actions">
                <button
                  className={`link-button ${selectedStageId === stage.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedStageId(stage.id)}
                >
                  View excerpts
                </button>
              </div>
            </article>
          )
        })}
      </section>

      <section className="excerpts">
        <div className="section-header">
          <div>
            <p className="eyebrow">Stage excerpts</p>
            <h2>{selectedStage.title}</h2>
            <p className="section-sub">{selectedStage.summary}</p>
          </div>
          <div className="chip">{selectedEntries.length} lines</div>
        </div>
        <div className="transcript__list transcript__list--full">
          {selectedEntries.map((row, idx) => (
            <div key={`${row.start}-${idx}`} className="transcript__row">
              <div className="time">{formatTime(row.start)}</div>
              <div className="speaker">Speaker {row.speaker}</div>
              <div className="text">{row.text}</div>
            </div>
          ))}
          {selectedEntries.length === 0 && (
            <div className="empty">No timestamped excerpts for this stage.</div>
          )}
        </div>
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
