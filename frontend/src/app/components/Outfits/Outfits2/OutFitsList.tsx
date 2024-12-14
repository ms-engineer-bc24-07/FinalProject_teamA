//提案されたコーデのアイテム表示
// app/components/Home/Home2/OutfitList.tsx
type Outfit = {
  id: number;
  name: string;
  description: string;
};

const outfits: Outfit[] = [
  { id: 1, name: 'Outfit 1', description: 'A casual style for everyday.' },
  { id: 2, name: 'Outfit 2', description: 'Perfect for formal events.' },
  { id: 3, name: 'Outfit 3', description: 'A sporty look for active days.' },
];

const OutfitList = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Recommended Outfits</h2>
      <ul className="grid gap-4 md:grid-cols-3 sm:grid-cols-1">
        {outfits.map((outfit) => (
          <li
            key={outfit.id}
            className="p-4 border border-gray-400 rounded-lg bg-gray-100 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">{outfit.name}</h3>
            <p className="text-sm">{outfit.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutfitList;
