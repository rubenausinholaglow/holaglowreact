export default function ProductVideo({ src }: { src: string }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      src={src}
      className="w-full h-full block bg-black object-center md:rounded-xl"
    />
  );
}
