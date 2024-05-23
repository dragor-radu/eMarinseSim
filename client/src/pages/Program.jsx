import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Program() {
    const [programe, setPrograme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograme = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/program/getProgram');
                const data = await response.json();
                setPrograme(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPrograme();
    }, []);

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row w-full justify-center items-center'>
                <h1 className='bg-blue-900 w-full text-center py-4 text-white font-bold'>eMarine - Program</h1>
                <Link to='/' className='bg-blue-900 text-white text-center py-4 px-4'>Home</Link>
            </div>
                <div className="overflow-x-auto shadow-md rounded-lg mt-4 mx-2">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-5 py-3">
                                    Ship Name
                                </th>
                                <th scope="col" className="px-5 py-3">
                                    Depature
                                </th>
                                <th scope="col" className="px-5 py-3">
                                    Departure Time
                                </th>
                                <th scope="col" className="px-5 py-3">
                                    Arrival
                                </th>
                                <th scope="col" className="px-5 py-3">
                                    Arrival Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {!loading && programe.map((program, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                                <th scope="row" className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {program.nume_nava}
                                </th>
                                <td className="px-5 py-4">
                                    {program.port_plecare}
                                </td>
                                <td className="px-5 py-4">
                                    {new Date(program.data_plecare).toLocaleString()}
                                </td>
                                <td className="px-5 py-4">
                                    {program.port_sosire}
                                </td>
                                <td className="px-5 py-4">
                                    {new Date(program.data_sosire_estimata).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}
