import { useState } from 'react'
import AppButton from '../common/AppButton'

import {
  TreeItemProps,
} from './interfaces'

enum levelColors {
  white,
  yellow,
  blue,
  orange,
  red,
}

const TreeItem = ({
  id,
  title,
  children,
  level,
  side,
  onCreate,
  onRemove
}: TreeItemProps) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false)

  const [value, setValue] = useState<string>(title)
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(() => {
      return event.target.value
    })
  }

  const handleOnClick = (id: string): void => {
    setModalOpened(false)
    onCreate && onCreate(id)
  }

  return (
    <li className="nested-tree__item">
      <div
        className={`nested-tree__value ${level !== 0 && side && 'nested-tree__value--'+side}`}
        style={{zIndex: 5000-level}}
      >
        <span
          className={`
            nested-tree__title 
            ${level === 0 && 'nested-tree__title--root'} 
            ${children.length !== 0 && 'hasChildren'} 
          `}
        >
          <input
            value={value}
            onChange={handleOnChange}
            className={`
              nested-tree__input
              nested-tree__input--${levelColors[level] === undefined ? levelColors[0] : levelColors[level]}
            `}
          />
          

          <ul className={`nested-tree__actions-list ${level === 0 && 'nested-tree__actions-list--root'} `}>
            <li
              onClick={() => setModalOpened(true)}
              className='nested-tree__actions-item'
            >
              <img src="/icons/add-icon.svg" alt="add" />
            </li>
            {/* <li className='nested-tree__actions-item'>
              <img src="/icons/edit-icon.svg" alt="edit" />
            </li> */}
            <li onClick={() => onRemove && onRemove(id)} className='nested-tree__actions-item nested-tree__actions-item--remove'>
              <img src="/icons/remove-icon.svg" alt="remove" />
            </li>

            {modalOpened && (
              <div className="nested-tree__modal">
                <h3>What do you want to create?</h3>

                <div className="d-flex">
                  <AppButton className='app-button--light-gray' onClick={() => handleOnClick(id)}>Category</AppButton>
                  <AppButton className='app-button--light-gray' onClick={() => handleOnClick(id)}>Service</AppButton>
                </div>
              </div>
            )}

          </ul>
        </span>
      </div>
      { children.length > 0 && (
        <ul className={`nested-tree__branch`}>
          {children}
        </ul>
      )}
    </li>
  )
}


export default TreeItem