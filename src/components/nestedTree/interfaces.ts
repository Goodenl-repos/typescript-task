// types 
export type Tree = ReadonlyArray<TreeBranch>

interface changeFunc {
  readonly onCreate?: (id: string) => void
  readonly onRemove?: (id: string) => void
}

export interface TreeItemProps extends changeFunc {
  readonly id: string
  // readonly onChangeCallback?: (e: React.ChangeEvent<HTMLInputElement>) => void
  readonly onCreateCategory?: TreeBranch
  readonly onRemoveCategory?: TreeBranch["id"]
  readonly title: string 
  readonly level: number
  readonly side: string | null
  readonly isSelected?: boolean | undefined
  readonly children: ReadonlyArray<JSX.Element>
}

export interface TreeBranch {
  readonly id: string
  readonly title: string
  categories?: Tree
  readonly selected?: boolean
}

export interface RecursiveTreeProps extends changeFunc  {
  readonly listMeta: Tree
}