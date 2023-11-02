import { Filter } from "#/context/FilterContext";
import { FC } from "react";
import { FilterBadge } from "../filterBadge";

export interface FilterListProps {
  filters: Filter[];
}

export const ListFilters: FC<FilterListProps> = ({ filters }) => {
  return (
    <section className="flex gap-2 flex-wrap">
      {
        filters.map(({ name }) => (
          <FilterBadge text={name} />
        ))
      }
    </section>
  )
}
