export default function Hero() {
    return (
        <div className="flex flex-col items-start justify-center h-screen text-white">
          <h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginLeft: '8vw' }}
              className="text-9xl font-bold">
              StreakyFly
          </h1>
          <p style={{ fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)', marginLeft: '8vw' }}
             className="text-4xl mt-2 font-bold text-green-light">
              Not a fly, but a human.
          </p>
        </div>
    );
}
