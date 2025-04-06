import { Skeleton } from "antd";
import { client } from "../interfaces";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export default function HomePage() {
  return (
    <div className="w-full h-full min-h-screen">
      <div className="w-full h-full flex flex-col">
        <h1 className="text-2xl font-semibold bg-blue-400 p-8">Home Page</h1>
      </div>
      <div className="p-8">
        <DataTable />
      </div>
    </div>
  );
}

function DataTable() {
  const {
    isLoading: _load,
    isError: _is_error,
    data: _data,
    error: _error,
  } = useQuery<client[]>({
    queryKey: ["get_clients"],
    queryFn: async () => {
      const res = await api.get("/api/clients");
      return res.data;
    },
  });
  return (
    <div className="border border-slate-600 rounded-lg overflow-hidden flex flex-col">
      {/** HEADLINE */}
      <div className="grid grid-cols-4 bg-slate-500 divide-x divide-zinc-50">
        <span className="text-zinc-50 p-2">Name</span>
        <span className="text-zinc-50 p-2">Nationality</span>
        <span className="text-zinc-50 p-2">Occupation</span>
        <span className="text-zinc-50 p-2">Email</span>
      </div>
      <div className="flex flex-col  divide-y divide-slate-500">
        {_load ? (
          <div className="w-full h-40 p-4">
            <Skeleton active={true} />
          </div>
        ) : _is_error || _error ? (
          <div className="p-4">
            <span className="italic">Failed to get data...</span>
          </div>
        ) : _data?.length && _data.length > 0 ? (
          _data.map((client: client, index: number) => (
            <div
              key={index}
              className="grid grid-cols-4 divide-x divide-slate-500 hover:bg-slate-300 duration-300 ease-out transition-colors"
            >
              <span className="p-1">{client.name}</span>
              <span className="p-1">{client.nationality}</span>
              <span className="p-1">{client.occupation}</span>
              <span className="p-1">{client.email}</span>
            </div>
          ))
        ) : (
          <div className=" p-4">
            <span className="italic">No clients in database...</span>
          </div>
        )}
      </div>
    </div>
  );
}
