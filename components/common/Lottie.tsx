import dynamic from 'next/dynamic';

// dynamic import
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default Lottie;
