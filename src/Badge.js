import React from 'react'
import clsx from 'clsx'
import Draggable from 'react-draggable'

const Badge = props => {
  const SIZE = 24
  const { id, x, y, number, isDeleting, onDelete } = props

  const badgeStyle = {
    height: SIZE,
    width: SIZE
  }

  const handleDelete = e => {
    if (isDeleting) {
      onDelete(id)
    }
  }

  return (
    <Draggable
      bounds="body"
      cancel=".deleting"
      defaultPosition={{ x: x - SIZE / 2, y: y - SIZE / 2 }}
    >
      <div
        className={clsx('badge', isDeleting && 'deleting')}
        style={badgeStyle}
        onClick={handleDelete}
      >
        {number}
      </div>
    </Draggable>
  )
}

export default Badge
