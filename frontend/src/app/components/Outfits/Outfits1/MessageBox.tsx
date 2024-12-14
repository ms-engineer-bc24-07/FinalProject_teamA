// app/components/Home/Home1/MessageBox.tsx
'use client'; // クライアントコンポーネントを明示

import { useRouter } from 'next/navigation';

const MessageBox = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/home2'); // Home2ページに遷移
  };

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
      <p className="mb-4 text-lg font-semibold">enjoy with your fashion item everyday.</p>
      <button
        onClick={handleClick}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        I wanna get new look
      </button>
    </div>
  );
};

export default MessageBox;
