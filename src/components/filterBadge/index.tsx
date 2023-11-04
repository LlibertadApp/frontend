import { FC } from "react"
import { IFilterBadgesProps } from "./types"

export const FilterBadge: FC<IFilterBadgesProps> = ({text}) => {
  return (
    <label className="border-2 py-4 px-5 border-x-violet-brand-light rounded-full text-xl font-medium leading-[22px]"> { text } </label>
  )
}
