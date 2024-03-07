import { useState } from "react";
import MoreFilters from "./MoreFilters";
import { CheckCountry } from "../../api/CheckCountry";
import { GetCityLocations } from "../../api/GetCitiyLocations";
import { minDate } from "../../misc/minDate";
import { Location, LocationSelectOptions } from "../../types/location";
import { useTransferContext } from "../../context/TransferContext";
import { Transfer } from "../../types/transfer";
import { locationType } from "../../misc/locationType";

export default function TransferForm() {
  const [country, setCountry] = useState("");

  const [city, setCity] = useState({ name: "", code: "" });
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string; code: string }[]
  >([]);

  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);
  const [locationsOptions, setLocationsOptions] = useState<
    LocationSelectOptions[]
  >([]);

  const [outbound, setOuntbound] = useState<{ date: string; time: string }>({
    date: "",
    time: "",
  });

  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [moreFilters, setMoreFilters] = useState({
    inbound: { date: "", time: "" },
    adults: 1,
    children: 0,
    infants: 0,
  });

  const { formatAndSetTF } = useTransferContext();

  const checkCountry = async () => {
    const options = await CheckCountry(country);
    setCityOptions(options);
  };

  const getLocations = async (cityCode: string) => {
    const options = await GetCityLocations(cityCode);
    setLocationsOptions(options);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      fromLocation !== null &&
      toLocation !== null &&
      outbound.date !== "" &&
      outbound.time !== ""
    ) {
      const transferData: Transfer = {
        fromType: locationType(fromLocation.type),
        fromCode: fromLocation.code,
        toType: locationType(toLocation.type),
        toCode: toLocation.code,
        outbound: `${outbound.date}T${outbound.time}`,
        inbound:
          moreFilters.inbound.date !== ""
            ? `${moreFilters.inbound.date}T${moreFilters.inbound.time}`
            : undefined,
        adults: moreFilters.adults,
        children: moreFilters.children,
        infants: moreFilters.infants,
      };
      formatAndSetTF(transferData);
    }
  };

  return (
    <form
      className="bg-white p-4 xl:p-8  shadow-sm flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <label htmlFor="country" className="flex flex-col font-medium">
        Country:
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border-2 border-zinc-400 py-2 px-4 "
          placeholder="Spain..."
          onBlur={checkCountry}
        />
      </label>

      <label htmlFor="city" className="flex flex-col font-medium relative">
        City:
        <select
          name="city"
          id="city"
          className="py-2 px-4 "
          value={city.name}
          onChange={(e) => {
            const cty = {
              code: cityOptions.filter((cty) => e.target.value === cty.value)[0]
                .code,
              name: e.target.value,
            };
            setCity(cty);
            getLocations(cty.code);
          }}
        >
          {cityOptions.map((city) => (
            <option key={city.value} value={city.value}>
              {city.value}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="from" className="flex flex-col font-medium">
        From:
        <select
          name="from"
          id="from"
          className="py-2 px-4 "
          value={fromLocation?.name}
          onChange={(e) => {
            const loc = locationsOptions.filter(
              (loc) => e.target.value === loc.value
            )[0];
            const location = {
              code: loc.code,
              name: e.target.value,
              type: loc.type,
            };
            setFromLocation(location);
          }}
        >
          {locationsOptions.map((loc) => (
            <option key={loc.code} value={loc.value}>
              {loc.value.substring(0, 30)}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="destination" className="flex flex-col font-medium">
        To:
        <select
          name="destionation"
          id="destination"
          className="py-2 px-4"
          value={toLocation?.name}
          onChange={(e) => {
            const loc = locationsOptions.filter(
              (loc) => e.target.value === loc.value
            )[0];
            const location = {
              code: loc.code,
              name: e.target.value,
              type: loc.type,
            };
            setToLocation(location);
          }}
        >
          {locationsOptions.map((loc) => (
            <option key={loc.code} value={loc.value}>
              {loc.value.substring(0, 30)}
            </option>
          ))}
        </select>
      </label>

      <div className="flex justify-between">
        <label htmlFor="outbound" className="flex flex-col font-medium">
          Date:
          <input
            type="date"
            name="outbound"
            id="outbound"
            className="border-2 border-zinc-400 py-2 px-4   "
            placeholder="destination..."
            min={minDate()}
            value={outbound.date}
            onChange={(e) =>
              setOuntbound({ ...outbound, date: e.target.value })
            }
          />
        </label>
        <label htmlFor="outboundTime" className="flex flex-col font-medium">
          Time:
          <input
            type="time"
            name="outboundTime"
            id="outboundTime"
            className="border-2 border-zinc-400 py-2 px-4 "
            placeholder="destination..."
            min={minDate()}
            value={outbound.time}
            onChange={(e) =>
              setOuntbound({ ...outbound, time: e.target.value })
            }
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="uppercase text-sm font-medium self-center underline hover:opacity-50"
          onClick={() => setShowMoreFilters(!showMoreFilters)}
        >
          {showMoreFilters ? "less filters" : "more filters"}
        </button>

        {showMoreFilters && (
          <MoreFilters
            moreFilters={moreFilters}
            setMoreFilters={setMoreFilters}
          />
        )}
      </div>

      <button className="self-end bg-sky-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-sky-400">
        Search transfer
      </button>
    </form>
  );
}
