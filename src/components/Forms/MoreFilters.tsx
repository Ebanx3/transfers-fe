import { minDate } from "../../misc/minDate";

type MoreFiltersType = {
  inbound: { date: string; time: string };
  adults: number;
  children: number;
  infants: number;
};

interface Props {
  moreFilters: MoreFiltersType;
  setMoreFilters: (mf: MoreFiltersType) => void;
}

export default function MoreFilters({ moreFilters, setMoreFilters }: Props) {
  return (
    <>
      <div className="flex justify-between">
        <label htmlFor="inbound" className="flex flex-col font-medium">
          Return Date:
          <input
            type="date"
            name="inbound"
            id="inbound"
            className="border-2 border-zinc-400 py-2 px-4 "
            placeholder="destination..."
            min={minDate()}
            value={moreFilters.inbound.date}
            onChange={(e) =>
              setMoreFilters({
                ...moreFilters,
                inbound: { ...moreFilters.inbound, date: e.target.value },
              })
            }
          />
        </label>
        <label htmlFor="inboundTime" className="flex flex-col font-medium">
          Time:
          <input
            type="time"
            name="inboundTime"
            id="inboundTime"
            className="border-2 border-zinc-400 py-2 px-4"
            placeholder="destination..."
            min={minDate()}
            value={moreFilters.inbound.time}
            onChange={(e) =>
              setMoreFilters({
                ...moreFilters,
                inbound: { ...moreFilters.inbound, time: e.target.value },
              })
            }
          />
        </label>
      </div>
      <label
        htmlFor="adults"
        className="font-medium flex items-center justify-between"
      >
        Adults: (+18)
        <input
          type="number"
          id="adults"
          name="adults"
          className="border-2 border-zinc-400 py-2 px-4 w-16  mr-6"
          value={moreFilters.adults}
          onChange={(e) =>
            setMoreFilters({ ...moreFilters, adults: parseInt(e.target.value) })
          }
        />
      </label>
      <label
        htmlFor="children"
        className="font-medium flex items-center justify-between"
      >
        Childrens: (4-17)
        <input
          type="number"
          id="children"
          name="children"
          className="border-2 border-zinc-400 py-2 px-4 w-16  mr-6"
          value={moreFilters.children}
          onChange={(e) =>
            setMoreFilters({
              ...moreFilters,
              children: parseInt(e.target.value),
            })
          }
        />
      </label>
      <label
        htmlFor="infants"
        className="font-medium flex items-center justify-between"
      >
        Infants: (0-3)
        <input
          type="number"
          id="infants"
          name="infants"
          className="border-2 border-zinc-400 py-2 px-4 w-16  mr-6"
          value={moreFilters.infants}
          onChange={(e) =>
            setMoreFilters({
              ...moreFilters,
              infants: parseInt(e.target.value),
            })
          }
        />
      </label>
    </>
  );
}
