'use client';

import { useRouter, useParams } from 'next/navigation';

export default function DesignerProfile() {
  const router = useRouter();
  const { id } = useParams();

  // Demo data (later you can connect DB)
  const designer = {
    name: 'Demo Designer ' + id,
    bio: 'Expert in ethnic and modern fashion designs. 5+ years experience.',
    designs: [
      'https://pub-95ccf2d427eb4955a7de1c41d3fa57dd.r2.dev/blog-g3fashion-com/2021/12/pastel-pink-gown-for-reception.jpg',
      'https://manishmalhotra.in/cdn/shop/files/MM-Sustainability-Block-Banner-Image-02.webp?v=1758012965&width=1920',
      'https://media.istockphoto.com/id/639275740/photo/elegant-gentleman.jpg?s=612x612&w=0&k=20&c=d_yT_79_-eqLISskF3MXx9T5bq6D0EELFanjba7wCXo='
    ]
  };

  return (
    <div className="min-h-screen bg-[#F2E9E4] text-gray-900 p-6">
      
      {/* Name */}
      <h1 className="text-3xl font-bold text-[#7B2CBF] mb-3">
        {designer.name}
      </h1>

      {/* Bio */}
      <p className="text-gray-800">{designer.bio}</p>

      {/* Designs */}
      <h2 className="text-xl font-semibold mb-3">Recent Designs</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {designer.designs.map((img, i) => (
          <img key={i} src={img} className="rounded-lg shadow" />
        ))}
      </div>

      {/* Chat Button */}
      <button
        onClick={() => router.push(`/chat/${id}`)}
        className="bg-[#7B2CBF] text-white px-6 py-3 rounded-lg hover:scale-105 transition"
      >
        Chat with Designer
      </button>

    </div>
  );
}
}
