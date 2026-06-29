function IntroSection() {
  return (
    <section className="bg-white px-4 py-6 sm:px-8 sm:py-8 md:px-10 md:py-8 lg:px-14 lg:py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-500">
          About the team
        </p>
        <div className="flex flex-col items-center gap-2">
          <h2
            className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
            style={{ color: "#000000" }}
          >
            The People Behind Homi
          </h2>
          <div className="h-[2px] w-24 bg-black" />
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
