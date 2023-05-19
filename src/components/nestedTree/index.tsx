import React from "react";

import TreeItem from './TreeItem'

// interfaces
import {
  TreeBranch,
  RecursiveTreeProps
} from './interfaces'


// recursive func
const NestedTree = ({ listMeta, onCreate, onRemove }: RecursiveTreeProps) => {

  const createTree = (category: TreeBranch, level: number, side: string | null) => {
    return (
      
      category.categories && (
        <>
        <TreeItem
          id={category.id}
          key={category.id}
          title={category.title}
          level={level}
          side={side}
          onCreate={onCreate}
          onRemove={onRemove}
        >
          {category.categories.map((categoryChild: TreeBranch, i: number) => {
            let side: string = 'single';
            
            if (category.categories && category.categories.length > 1) {
              // mark up [start] [center] [end] of categories in row
              switch (i) {
                case 0:
                  side = 'start'
                  break;

                case category.categories.length - 1:
                  side = 'end'
                  break;

                default:
                  side = 'center'
                  break;
              }
            }
            return <React.Fragment key={categoryChild.id}>{createTree(categoryChild, level + 1, side)}</React.Fragment>
          })}
        </TreeItem></>
      )
    )
  }

  return (
    <>
      {listMeta.map((category: TreeBranch, i: any) => (
        <ul key={i}>{createTree(category, 0, 'center')}</ul>
      ))}
    </>
  )
}

export default NestedTree;