import { GoogleGenAI } from "@google/genai";
import { MOCK_VEHICLES, FINANCIAL_DATA } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
Anda adalah UANG, asisten AI canggih untuk UANG FLEET ERP, sistem manajemen rental mobil mewah di Indonesia.
Anda memiliki akses ke data armada, metrik keuangan, dan status operasional.
Gunakan Bahasa Indonesia yang profesional, canggih, dan berbasis data.
Mata uang yang digunakan adalah Rupiah (IDR).

Saat ditanya tentang armada, sintesiskan wawasan berdasarkan konteks yang diberikan.
Jika ditanya tentang perawatan, prioritaskan keselamatan dan umur aset.
Jika ditanya tentang keuangan, fokus pada profitabilitas dan ROI dalam konteks Rupiah.

Konteks Data Saat Ini:
Kendaraan: ${JSON.stringify(MOCK_VEHICLES.map(v => ({ make: v.make, model: v.model, status: v.status, rate: v.dailyRate })))}
Keuangan (6 Bulan Terakhir): ${JSON.stringify(FINANCIAL_DATA)}
`;

export const generateAIResponse = async (userPrompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key hilang. Mohon konfigurasi environment variable Anda untuk menggunakan UANG AI.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Mohon maaf, saya tidak dapat menghasilkan respons saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat berkomunikasi dengan UANG AI. Silakan coba lagi nanti.";
  }
};