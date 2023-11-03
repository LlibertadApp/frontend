import { FilterIcon } from "#/icons"
import { Link } from "react-router-dom"
import { ButtonFilterProps } from "./types"
import { FC } from "react"

export const ButtonFilter: FC<ButtonFilterProps> = ({amount = 5}) => {
  return (
    <Link
            to="/filter-results"
            className="border-2 text-white bg-violet-brand border-violet-brand bg-transparent p-3 w-full rounded-xl text-xl tracking-wider shadow-md hover:border-violet-900 hover:bg-violet-900 my-4"
          >
            <div className='flex justify-center items-center gap-2'>
              {
                amount > 0 
                ? <>Filtros <span className='text-xs bg-white text-violet-brand rounded-full py-1 px-2'>{amount}</span></>
              : <>Filtros <FilterIcon /></>
              }
            </div>
          </Link>
  )
}
