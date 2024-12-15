// app/Outfits2/page.tsx
import OutfitList from '../components/Outfits/Outfits2/OutFitsList';
import Buttons from '../components/Outfits/Outfits2/Buttons';

const Home2 = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Home2</h1>
        <p className="text-gray-600">Find your perfect outfit from our recommendations!</p>
      </header>
      <section className="mb-8">
        <OutfitList />
      </section>
      <footer className="text-center">
        <Buttons />
      </footer>
    </div>
  );
};

export default Home2;
