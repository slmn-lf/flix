export default function HeroGradient() {
  return (
    <>
      <div
        className="
          absolute bottom-0 h-1/2 w-full
          bg-gradient-to-b
          from-transparent
          via-background/60
          to-background
        "
      />

      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-background/80
          via-background/40
          to-transparent
        "
      />
    </>
  );
}
