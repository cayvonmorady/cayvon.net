export function VideoBackground() {
  return (
    <video
      className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      style={{ transform: "translateZ(0)", contain: "layout size style" }}
    >
      <source src="/background.webm" type="video/webm" />
    </video>
  );
}
