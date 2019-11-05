import React, { useState } from 'react'
import clsx from 'clsx'
import uuid from 'uuid/v4'
import './App.css'
import Badge from './Badge'

function App() {
  const [svgCode, setSvgCode] = useState()
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [badges, setBadges] = useState([])
  const [isCoppied, setCoppied] = useState(false)

  // clear isCoppied state
  React.useEffect(() => {
    const timer = setTimeout(() => setCoppied(false), 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [isCoppied])

  const exampleCode = `<img style="width:414px" src="https://firebasestorage.googleapis.com/v0/b/mobbin-15894.appspot.com/o/patterns%2Fnetflix_v11.22.0_18.PNG?alt=media&amp;token=d9e46463-06a5-4bda-a1c5-8845d3fdd0cc">`

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

  const handleCopy = () => {
    const textField = document.createElement('textarea')
    textField.innerText = exampleCode
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    setCoppied(true)
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
        {svgCode ? (
          <>
            <div class="description">
              <p>
                Add label <kbd>cmd</kbd> or <kbd>ctrl</kbd> + <kbd>click</kbd>
              </p>
              <p>
                Remove label <kbd>alt</kbd> + <kbd>click</kbd>
              </p>
            </div>
            <div onClick={handleClick}>
              <div
                className={clsx('svgContainer', creating && 'active')}
                dangerouslySetInnerHTML={{ __html: svgCode }}
              ></div>
            </div>
          </>
        ) : (
          <div>
            <h3>
              <span role="img" aria-label="describing-emoji">
                💁
              </span>
              ‍Here is sample image code
            </h3>
            <div class="exampleContainer">
              <div class="example">{exampleCode}</div>
              <div class="overlay">
                <button class="overlayButton" onClick={handleCopy}>
                  {isCoppied ? 'COPPIED!! 🔥' : 'COPY CODE'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
