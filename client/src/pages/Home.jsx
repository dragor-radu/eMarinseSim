import Map from '../components/Map';

export default function Home() {
    return (
        <div className='h-screen flex flex-col'>
            <h1 className='text-2xl text-center text-gray-100 py-5 font-sans bg-blue-900 rounded shadow-md'>
                eMarine - Track your ship
            </h1>
            <div className='flex flex-1'>
                <div className='h-full w-full border-8 border-black rounded'>
                    <Map />
                </div>
            </div>
        </div>
    );
}
