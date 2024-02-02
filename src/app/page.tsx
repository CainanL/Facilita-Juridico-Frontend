"use client"
import React, { useEffect, useState } from "react";
import { IClient } from "../Common/IClient";
import api from "@/api";
import { ClientTable } from "@/components/table";
import Link from "next/link";

export default function Home() {

  const [clients, setClients] = useState<IClient[]>([]);

  async function getClients() {

    try {
      const { data } = await api.get('/client');
      console.log(data);
      setClients(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getClients();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <header className="py-4">
          <div className="container mx-auto text-gray-900 text-center text-3xl font-semibold">
            Facilita Jurídico
          </div>
          <Link href='/create'>
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Create new client
            </button>
          </Link>
        </header>
      </div>



      <div className="mb-32 text-center w-full">
        <ClientTable
          clients={clients}
        />
      </div>
    </main>
  );
}
