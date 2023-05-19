import React, {useEffect, useRef, useState} from 'react';
import NestedTree from '../../nestedTree';

import { Tree, TreeBranch } from "../../nestedTree/interfaces"

import categories from './data'

interface IProps {
  zoomIndex?: number
  goToCenterFlag: boolean
}

function DraggableWindow({zoomIndex = 1, goToCenterFlag} : IProps): JSX.Element {
  const [categoriesTree, setCategoriesTree] = useState<Tree>(categories)

  const draggableWindowContent: React.RefObject<HTMLDivElement> = useRef(null)
  const draggableWindowContainer: React.RefObject<HTMLDivElement> = useRef(null)
  const draggableWindowTree: React.RefObject<HTMLDivElement> = useRef(null)
  
  // zoom/drag logic

  useEffect(() => {
    if(draggableWindowContent.current == null) {
      console.error('not define')
      return
    }

    draggableWindowContent.current.onmousedown = (event: any): void => {
      // detect actions and prevent drag if they under pointer
      if(event.target.closest(['.nested-tree__actions-item', '.nested-tree__modal'])) return;
      
      const current = draggableWindowContent.current
      
      if(current == null || draggableWindowContainer.current == null) return

      let shiftX = event.clientX - current.getBoundingClientRect().left;
      let shiftY = event.clientY + 130 - current.getBoundingClientRect().top;
  
      current.style.position = 'absolute';
      current.style.zIndex = (1000).toString();
      draggableWindowContainer.current.append(current);
  
      moveAt(event.pageX, event.pageY);
      
      function moveAt(pageX: number, pageY: number) {
        if(current == null) return
        current.style.left = pageX - shiftX + 'px';
        current.style.top = pageY - shiftY + 'px';
      }
  
      function onMouseMove(event: any) {
        moveAt(event.pageX, event.pageY);
      }
  
      // move the current on mousemove
      draggableWindowContainer.current.addEventListener('mousemove', onMouseMove);
  
      // remove on mouseup
      current.onmouseup = function() {
        if(draggableWindowContainer.current == null) return
        draggableWindowContainer.current.removeEventListener('mousemove', onMouseMove);
        current.onmouseup = null;
      };

      // remove on mouseleave
      current.onmouseleave = function() {
        if(draggableWindowContainer.current == null) return
        draggableWindowContainer.current.removeEventListener('mousemove', onMouseMove);
        current.onmouseleave = null;
      };
    }

    draggableWindowContent.current.ondragstart = function() {
      return false;
    };
  }, [])

  useEffect(() => {
    if(draggableWindowTree?.current?.style)
      draggableWindowTree.current.style.transform = `scale(${zoomIndex?.toString()})`
  }, [zoomIndex])

  useEffect(() => {
    goToCenterFlag && goToCenter()
  }, [goToCenterFlag])

  const goToCenter = () => {
    const current = draggableWindowContent.current
    if(current == null || draggableWindowContainer.current == null) return

    current.removeAttribute('style')

    draggableWindowContainer.current.children[0].append(current);
  }

  // execute function
  const uid = () => {
    const existingIDs: string[] = [];

    const getRandomLetters = (length = 1) => Array(length).fill(null).map(e => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
    const getRandomDigits = (length = 1) => Array(length).fill(null).map(e => Math.floor(Math.random() * 10)).join('');
    
    const generateUniqueID = () => {
      let id = getRandomLetters(2) + getRandomDigits(4);
      while (existingIDs.includes(id)) id = getRandomLetters(2) + getRandomDigits(4);
      return id;
    };

    return generateUniqueID();
  }

  function recursiveExecute(node: any, nestedName: string, id: string, callback: (node: any, parent: any) => void, parent?: any): any {
    // if (!(arr && arr?.length > 0)) return 'Arr is empty';
    let currentChild, result

    if (node.id === id) {
      callback(node, parent)
      return;
    } else {
      for(const item of node[nestedName]) {
        currentChild = item
        result = recursiveExecute(currentChild, nestedName, id, callback, node);

        if (result !== false) {
          return result;
        }
      }

      return false
    }
  }

  // event handlers
  const handleOnCreate = (index: string) => {
    const newCategory: TreeBranch = {
      id: uid(),
      title: 'Categories',
      categories: []
    }

    // hotFix
    setCategoriesTree((prev: Tree | any) => {
      recursiveExecute(prev[0], 'categories', index, (foundObj) => {
        foundObj.categories.push(newCategory)
      })
      
      return [...prev]
    })
  }

  const handleOnRemove = (index: any) => {
    setCategoriesTree((prev: Tree | any) => {
      recursiveExecute(prev[0], 'categories', index, (foundObj, parent) => {
        console.log(foundObj, parent)
        parent.categories.splice(parent.categories.findIndex((item: any) => item.id === foundObj.id), 1)
      })

      return [...prev]
    })
    
  }

  return (
    <div ref={draggableWindowContainer} className="draggable-window">
      <div className="draggable-window--box">
        <div ref={draggableWindowContent}>
          <div className="draggable-window--tree" ref={draggableWindowTree} >
            <NestedTree onCreate={handleOnCreate} onRemove={handleOnRemove} listMeta={categoriesTree} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DraggableWindow;
