"use client"
import React, { ChangeEvent, useEffect, useState } from "react";

import api from "@/api";
import { phoneMask } from "@/services/phone";
import { useRouter } from "next/navigation";

export default function Home() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    x: '',
    y: ''
  });

  const router = useRouter();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target as any;
    if (name == 'phone') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: phoneMask(value)
      }))
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  async function handleCreateNewClient(){
    try {
      await api.post('/client', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        x: Number(formData.x),
        y: Number(formData.y)
      });
      router.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <header className="py-4">
          <div className="container mx-auto text-gray-900 text-center text-3xl font-semibold">
            Facilita Jurídico
          </div>
        </header>
      </div>


      <div className="mb-32 text-center w-full">
        <div className="flex flex-col gap-6" >
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="name" className="left-0 mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input
              onChange={handleInputChange} value={formData.name}
              name="name" id="name"
              type="text"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Jhon Alves"
              required
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="email" className="left-0 mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
            <input
              onChange={handleInputChange} value={formData.email}
              name="email" id="email"
              type="text"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="jhonalves@email.com"
              required
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="phone" className="left-0 mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input
              onChange={handleInputChange} value={formData.phone}
              name="phone" id="phone"
              type="text"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="(77)99999-9999"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-grow flex flex-col justify-start items-start">
              <label htmlFor="x" className="left-0 mb-2 text-sm font-medium text-gray-900 dark:text-white">Coordinate X</label>
              <input
                onChange={handleInputChange} value={formData.x}
                name="x" id="x"
                type="text"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="45"
                required
              />
            </div>
            <div className="flex-grow flex flex-col justify-start items-start">
              <label htmlFor="y" className="left-0 mb-2 text-sm font-medium text-gray-900 dark:text-white">Coordinate Y</label>
              <input
                onChange={handleInputChange} value={formData.y}
                name="y" id="y"
                type="text"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="34"
                required
              />
            </div>
          </div>


          <button type="button" onClick={handleCreateNewClient} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Create new client
          </button>
        </div>
      </div>
    </main>
  );
}
