import { IClient } from "@/Common/IClient";
import api from "@/api";
import { useEffect, useState } from "react";

export function ClientTable({ clients }: { clients: IClient[] }) {

    const [ordeneredClients, setOrdeneredClients] = useState<IClient[]>([]);
    const [showModal, setShowModal] = useState(false);

    async function getClients(id: string) {

        try {
            const { data } = await api.get(`/client/router/${id}`);
            console.log(data);
            setOrdeneredClients(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleShowModal(id: string) {
        setShowModal(true);
        await getClients(id);
    }

    function handleCloseModal() {
        setShowModal(false);
        setOrdeneredClients([]);
    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-2 px-4">Nome</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((customer, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-3 px-4">{customer.name}</td>
                            <td className="py-3 px-4">{customer.email}</td>
                            <td className="py-3 px-4">{customer.phone}</td>
                            <td>
                                <button
                                    onClick={() => { handleShowModal(customer.id) }}
                                    data-modal-hide="popup-modal" type="button" className="text-blue-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    Traçar rotas
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="popup-modal" tabIndex={-1} className={`${!showModal && 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="p-4 w-full max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={handleCloseModal} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">


                            <table className="table-auto w-full">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-2 px-4">Nome</th>
                                        <th className="py-2 px-4">Email</th>
                                        <th className="py-2 px-4">Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordeneredClients.map((customer, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                            <td className="py-3 px-4">{customer.name}</td>
                                            <td className="py-3 px-4">{customer.email}</td>
                                            <td className="py-3 px-4">{customer.phone}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={handleCloseModal} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}