"use client";
import { useState } from "react";
import Image from "next/image";
import { useDebounce } from "./use-debounce";
import useSWR from "swr";
import { Kit } from "@/types";
import TagIcon from "@/components/TagIcon";
import FedExIcon from "@/components/FedExIcon";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Home() {
  const [labelIdSearch, setLabelIdSearch] = useState("");
  const debouncedLabelIdSearch = useDebounce(labelIdSearch);
  const { data, isLoading } = useSWR<Kit[]>(
    debouncedLabelIdSearch
      ? `/api/kits?labelId=${debouncedLabelIdSearch}`
      : null,
    fetcher
  );

  return (
    <main className="p-24 flex flex-col space-y-8  text-gray-900">
      <input
        className="border rounded border-gray-500 p-2 w-full max-w-md"
        placeholder="Search for a label ID, like 41-269-0728..."
        type="text"
        value={labelIdSearch}
        onChange={(e) => setLabelIdSearch(e.target.value)}
      />
      {isLoading && <div>Searching...</div>}
      {!isLoading && debouncedLabelIdSearch && !data?.length && (
        <div>No kits matched your search.</div>
      )}
      {data && data.length > 0 && (
        <section className="w-full max-w-md">
          <div className="mb-2 font-bold">Found {data.length} kits:</div>
          <div className="space-y-2">
            {data.map(({ id, label_id, shipping_tracking_code }) => (
              <article
                key={id}
                className="flex border border-gray-300 p-2 rounded-sm items-center text-sm justify-between"
              >
                <div className="w-1/2 flex items-center space-x-2">
                  <TagIcon />
                  <span className="font-mono">{label_id}</span>
                </div>

                <div className="w-1/2 flex items-center space-x-2">
                  <FedExIcon />
                  <span className="font-mono underline">
                    <a
                      href={`https://www.fedex.com/fedextrack/?trknbr=${shipping_tracking_code}`}
                    >
                      {shipping_tracking_code}
                    </a>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
