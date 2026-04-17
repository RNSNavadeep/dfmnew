'use client';

import { useRouter } from 'next/navigation';

export default function Designers() {
  const router = useRouter();

  const designers = [
    {
      id: '1',
      name: 'Aarav Designer',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      specialty: 'Ethnic Wear'
    },
    {
      id: '2',
      name: 'Meera Fashion',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
      specialty: 'Modern Dresses'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F2E9E4] text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#7B2CBF]">
        Designers
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {designers.map((d) => (
          <div
            key={d.id}
            onClick={() => router.push(`/designers/${d.id}`)}
            className="p-4 bg-white rounded-xl shadow cursor-pointer hover:scale-105 transition"
          >
            <img src={d.img} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-3">{d.name}</h2>
            <p className="text-gray-800 font-medium">{d.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}