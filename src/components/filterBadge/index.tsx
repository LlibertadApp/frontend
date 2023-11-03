import { FC } from "react"
import { IFilterBadgesProps } from "./types"

export const FilterBadge: FC<IFilterBadgesProps> = ({text}) => {
  return (
    <label className="border-2 p-2 bg-transparent rounded-3xl text-sm"> { text } </label>
  )
}
