"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Log session data for debugging
  useEffect(() => {
    console.log("Session Data:", session);
  }, [session]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch Weather Data Based on User Location
  useEffect(() => {
    const fetchWeather = async () => {
      if (!session?.user?.location?.lat || !session?.user?.location?.lon) {
        setError("Location not available.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching weather for:", session.user.location);
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // Use env variable
        if (!apiKey) {
          throw new Error("Weather API key is missing.");
        }

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${session.user.location.lat}&lon=${session.user.location.lon}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();

        console.log("Weather API Response:", data);

        if (data.cod !== 200) {
          throw new Error(data.message || "Failed to fetch weather.");
        }

        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [session]);

  if (status === "loading" || loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
        <p className="text-lg">📧 Email: {session.user?.email}</p>

        {/* Display User Location */}
        {session.user?.location ? (
          <p className="mt-3">
            📍 Location: {session.user.location.city}, {session.user.location.region}, {session.user.location.country}
          </p>
        ) : (
          <p className="mt-3 text-yellow-400">🌍 Location not available</p>
        )}

        {/* Display Weather Info */}
        {error ? (
          <p className="mt-3 text-red-400">❗ {error}</p>
        ) : weather ? (
          <div className="mt-4 p-3 bg-gray-700 rounded-md">
            <h2 className="text-lg font-bold">🌤 Weather Update</h2>
            <p>📌 {weather.name}</p>
            <p>🌡 {weather.main?.temp ?? "N/A"}°C ({weather.weather?.[0]?.description ?? "No description"})</p>
          </div>
        ) : (
          <p className="mt-3 text-yellow-400">❗ Weather data unavailable</p>
        )}

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
