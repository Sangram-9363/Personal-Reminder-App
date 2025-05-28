import AuthForm from "../components/AuthForm";

export default function AuthPage({ type, onSubmit }) {
  return (
    <div
      className="h-screen bg-center flex items-center justify-center w-full bg-cover"
      style={{ backgroundImage: "url('/image3.jpg')" }}
    >
      {/* Overlay to darken image slightly for better contrast */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Glassmorphic Auth Form */}
      <div className="relative z-10 max-w-md w-full mx-4 p-8 rounded-3xl border border-white/20 backdrop-blur-md bg-white/10 text-white shadow-2xl  hover:shadow-neutral-400 transition-all  ">
        <AuthForm type={type} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
