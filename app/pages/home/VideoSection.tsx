// Small sample clip used as a lightweight placeholder until a brand video is supplied.
const VideoSection = () => {
  return (
    <section className="bg-[#f5f2ec]">
      <div className="relative h-[75vh] min-h-screen max-h-[120vh] w-full overflow-hidden bg-black">
        <video
          className="block h-full w-full object-cover"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
};

export default VideoSection;
