'use client';

import { useRouter } from 'next/navigation';

export default function Designers() {
  const router = useRouter();

  const designers = [
    {
      id: '1',
      name: 'Manish Malhotra',
      img: 'https://images.indianexpress.com/2025/11/manish-malhotra_1600_insta.jpg?w=1200',
      specialty: 'Ethnic Wear'
    },
    {
      id: '2',
      name: ' Anita Dongre',
      img: 'https://thenodmag.com/_next/image?url=https%3A%2F%2Fassets.thenodmag.com%2Fwebsite-assets%2FHORIZONTAL_FEATURE_OPTION_7df2c5be91-wgpqbssxpbzsfmk-16x9.jpg&w=3840&q=95',
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
