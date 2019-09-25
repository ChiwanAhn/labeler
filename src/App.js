import React, { useState } from 'react'
import clsx from 'clsx'
import uuid from 'uuid/v4'
import './App.css'
import { exampleSVG } from './exampleSvg'
import Badge from './Badge'

function App() {
  const [svgCode, setSvgCode] = useState()
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [badges, setBadges] = useState([])

  const handleChange = e => {
    setSvgCode(e.target.value)
  }

  const handlePress = e => {
    if (e.keyCode === 91 || e.keyCode === 93) {
      setCreating(true)
      setDeleting(false)
    } else if (e.keyCode === 18) {
      setDeleting(true)
    }
  }

  const handleUp = e => {
    if (e.keyCode === 91 || e.keyCode === 93) {
      setCreating(false)
    } else if (e.keyCode === 18) {
      setDeleting(false)
    }
  }
  const handleClick = e => {
    if (creating) {
      handleCreate(e.pageX, e.pageY)
    }
  }

  const handleCreate = (x, y) => {
    setBadges(prev => [...prev, { id: uuid(), x, y }])
  }

  const handleUpdate = ({ id, x, y }) => {
    setBadges(prev => prev.map(item => (item.id === id ? { id, x, y } : item)))
  }

  const handleDelete = id => {
    setBadges(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div
      className="App"
      onKeyDown={handlePress}
      onKeyUp={handleUp}
      tabIndex="0"
    >
      <div className="badgesContainer">
        {badges.map((item, n) => (
          <Badge
            id={item.id}
            key={item.id}
            x={item.x}
            y={item.y}
            number={n + 1}
            onDragEnd={handleUpdate}
            isDeleting={deleting}
            onDelete={handleDelete}
          ></Badge>
        ))}
      </div>
      <div>
        <div className="container">
          <textarea
            rows="4"
            className="input"
            name="svgCode"
            value={svgCode}
            onChange={handleChange}
            spellCheck="false"
            placeholder="Paste Your SVG Code here..."
          ></textarea>
        </div>
        <div onClick={handleClick}>
          <div
            className={clsx('svgContainer', creating && 'active')}
            dangerouslySetInnerHTML={{ __html: svgCode }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default App
