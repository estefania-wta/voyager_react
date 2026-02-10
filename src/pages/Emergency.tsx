import { useState } from "react";
import { translations, type Language } from "../locales";

declare const Twilio: any;

type Country = {
  isoCountry: string;
  phone: string;
  country: string;
};

export default function Emergency() {
  const [currentLang] = useState<Language>('es');
  const t = translations[currentLang];

  const [activeConnection, setActiveConnection] = useState<any>(null);

  const countries: Country[] = [
    { isoCountry:'DE', phone:'08007237977', country:'Alemania'},
    { isoCountry:'AR', phone:'08006662363', country:'Argentina'},
    { isoCountry:'CO', phone:'018009145014', country:'Colombia'},
    { isoCountry:'US', phone:'+1 (305) 440-0418', country:'Estados Unidos'},
    { isoCountry:'US2', phone:'+1 863-204-2848', country:'Estados Unidos (Alternativo)'},
  ];

  const makeCall = async () => {
    try {
      const res = await fetch("https://wtaops.com/app/api_base/getTokenTwilioCall");
      const data = await res.json();

      const device = new Twilio.Device(data.RESPONSE.token, {
        logLevel: "warn"
      });

      const conn = device.connect({
        params: {
          To: "18883018088",
          prefix: "VY"
        }
      });

      setActiveConnection(conn);
    } catch (error) {
      console.error('Error al conectar:', error);
    }
  };

  const hangUp = () => {
    if(activeConnection){
      activeConnection.disconnect();
      setActiveConnection(null);
    }
  };

  return (
    <div className="relative">
      {/* Banner */}
      <section className="relative w-full">
        <img
          src="/images/back_emerg.webp"
          alt={t.emergency.title}
          className="w-full h-auto rounded-bl-[30px]"
        />
        <div className="absolute top-24 right-10">
          <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
            {t.emergency.title}
          </h2>
        </div>
      </section>

      {/* Info */}
      <section className="py-10 px-5 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 mb-2">{t.emergency.callUs}</p>
          <p className="text-lg text-gray-500">{t.emergency.available24h}</p>
        </div>

        {/* Call buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={makeCall}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t.emergency.callUs}
          </button>

          {activeConnection && (
            <button
              onClick={hangUp}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Colgar
            </button>
          )}
        </div>

        {/* What to do */}
        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4">{t.emergency.whatToDo}</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Tenga su número de voucher disponible</li>
            <li>Tenga a mano su documento de identidad</li>
            <li>Esté listo para describir su emergencia</li>
            <li>Manténgase en línea hasta que le atendamos</li>
          </ul>
        </div>

        {/* Emergency numbers */}
        <div className="bg-blue-900 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">{t.emergency.emergencyNumber}</h3>
          
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-700">
                <th className="text-left py-3 px-4">País</th>
                <th className="text-left py-3 px-4">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {countries.map(c => (
                <tr key={c.isoCountry} className="border-b border-blue-800 hover:bg-blue-800 transition-colors">
                  <td className="py-3 px-4">{c.country}</td>
                  <td className="py-3 px-4 font-mono">{c.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
