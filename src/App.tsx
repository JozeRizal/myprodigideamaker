/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Target, Search, TrendingUp, Calculator, Briefcase, GraduationCap, 
  Baby, Store, HeartPulse, Smartphone, Palette, Code2, Cat, Home, 
  Globe, Camera, Music, BookOpen, Coffee, Car, Plane, AlertTriangle, 
  ListOrdered, Sparkles, ChevronRight, Gift, Tag, Video, Zap, ShieldCheck,
  Settings, Key, X, Loader2, BarChart2, Book, MonitorPlay, Wrench, Crown,
  List, ExternalLink, Copy, Check, FileText, CheckCircle2, DollarSign, Lock,
  Activity, Sword, Rocket, Coins, MousePointerClick,
  Gamepad2, PenTool, Layers, Scissors, Building2, Database, Megaphone, 
  Mic, Layout, Share2, ShoppingCart, Wallet, Dumbbell, Flower2, Utensils, 
  Map, Languages, Calendar, Users, PhoneCall, Headphones, Laptop, 
  ShoppingBag, Brush, Mic2, User, Bitcoin, Image, Landmark, Sprout, Heart, Download
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- DATA: MARKET LIST (PRESET) ---
const TARGET_MARKETS = [
  { id: 'job_seeker', label: 'Job Seeker / Fresh Grad', icon: <Briefcase size={16} />, category: 'Career' },
  { id: 'umkm', label: 'Pemilik UMKM / Olshop', icon: <Store size={16} />, category: 'Business' },
  { id: 'affiliate', label: 'Affiliate Marketer', icon: <Smartphone size={16} />, category: 'Business' },
  { id: 'content_creator', label: 'Konten Kreator Pemula', icon: <Camera size={16} />, category: 'Creative' },
  { id: 'cpns', label: 'Pejuang CPNS & BUMN', icon: <Briefcase size={16} />, category: 'Career' },
  { id: 'mahasiswa', label: 'Mahasiswa Akhir (Skripsi)', icon: <GraduationCap size={16} />, category: 'Education' },
  { id: 'stock_trader', label: 'Trader Saham/Crypto', icon: <TrendingUp size={16} />, category: 'Finance' },
  { id: 'guru', label: 'Guru & Pendidik', icon: <BookOpen size={16} />, category: 'Education' },
  { id: 'irt_bisnis', label: 'Ibu Rumah Tangga (Bisnis)', icon: <Home size={16} />, category: 'Business' },
  { id: 'freelancer', label: 'Freelancer (Fiverr/Upwork)', icon: <Globe size={16} />, category: 'Career' },
  { id: 'excel', label: 'Karyawan Admin (Excel)', icon: <Briefcase size={16} />, category: 'Skill' },
  { id: 'diet', label: 'Pejuang Diet', icon: <HeartPulse size={16} />, category: 'Health' },
  { id: 'cat_lover', label: 'Pemilik Kucing', icon: <Cat size={16} />, category: 'Hobby' },
  { id: 'gamer', label: 'Pro Gamer / Streamer', icon: <Gamepad2 size={16} />, category: 'Hobby' },
  { id: 'writer', label: 'Penulis Buku / Novel', icon: <PenTool size={16} />, category: 'Creative' },
  { id: 'graphic_designer', label: 'Desainer Grafis Pemula', icon: <Palette size={16} />, category: 'Creative' },
  { id: 'video_editor', label: 'Video Editor Freelance', icon: <Video size={16} />, category: 'Creative' },
  { id: 'wedding_photographer', label: 'Fotografer Wedding', icon: <Camera size={16} />, category: 'Business' },
  { id: 'architect', label: 'Arsitek & Interior', icon: <Building2 size={16} />, category: 'Business' },
  { id: 'programmer', label: 'Programmer Pemula', icon: <Code2 size={16} />, category: 'Skill' },
  { id: 'data_analyst', label: 'Data Analyst', icon: <Database size={16} />, category: 'Skill' },
  { id: 'digital_marketer', label: 'Digital Marketer', icon: <Megaphone size={16} />, category: 'Business' },
  { id: 'seo_specialist', label: 'SEO Specialist', icon: <Search size={16} />, category: 'Skill' },
  { id: 'podcaster', label: 'Podcaster Pemula', icon: <Mic size={16} />, category: 'Creative' },
  { id: 'uiux_designer', label: 'UI/UX Designer', icon: <Layout size={16} />, category: 'Creative' },
  { id: 'socmed_manager', label: 'Social Media Manager', icon: <Share2 size={16} />, category: 'Business' },
  { id: 'dropshipper', label: 'Dropshipper Pemula', icon: <ShoppingCart size={16} />, category: 'Business' },
  { id: 'property_agent', label: 'Agen Properti', icon: <Home size={16} />, category: 'Business' },
  { id: 'financial_planner', label: 'Financial Planner', icon: <Wallet size={16} />, category: 'Finance' },
  { id: 'fitness_coach', label: 'Fitness Coach', icon: <Dumbbell size={16} />, category: 'Health' },
  { id: 'yoga_teacher', label: 'Instruktur Yoga', icon: <Flower2 size={16} />, category: 'Health' },
  { id: 'chef', label: 'Chef / Home Cook', icon: <Utensils size={16} />, category: 'Hobby' },
  { id: 'travel_blogger', label: 'Travel Blogger', icon: <Map size={16} />, category: 'Creative' },
  { id: 'language_learner', label: 'Language Learner', icon: <Languages size={16} />, category: 'Education' },
  { id: 'parenting', label: 'Orang Tua Baru', icon: <Baby size={16} />, category: 'Hobby' },
  { id: 'event_organizer', label: 'Event Organizer', icon: <Calendar size={16} />, category: 'Business' },
  { id: 'wedding_planner', label: 'Wedding Planner', icon: <Heart size={16} />, category: 'Business' },
  { id: 'hr_professional', label: 'HR Professional', icon: <Users size={16} />, category: 'Career' },
  { id: 'sales_rep', label: 'Sales Representative', icon: <PhoneCall size={16} />, category: 'Career' },
  { id: 'customer_service', label: 'Customer Service', icon: <Headphones size={16} />, category: 'Career' },
  { id: 'virtual_assistant', label: 'Virtual Assistant', icon: <Laptop size={16} />, category: 'Career' },
  { id: 'ecommerce_owner', label: 'E-commerce Owner', icon: <ShoppingBag size={16} />, category: 'Business' },
  { id: 'handicraft', label: 'Handicraft Maker', icon: <Brush size={16} />, category: 'Creative' },
  { id: 'music_producer', label: 'Music Producer', icon: <Mic2 size={16} />, category: 'Creative' },
  { id: 'public_speaker', label: 'Public Speaker', icon: <User size={16} />, category: 'Career' },
  { id: 'personal_branding', label: 'Personal Brander', icon: <Sparkles size={16} />, category: 'Creative' },
  { id: 'crypto_investor', label: 'Crypto Investor', icon: <Bitcoin size={16} />, category: 'Finance' },
  { id: 'nft_artist', label: 'NFT Artist', icon: <Image size={16} />, category: 'Creative' },
  { id: 'property_investor', label: 'Investor Properti', icon: <Landmark size={16} />, category: 'Finance' },
  { id: 'gardener', label: 'Pecinta Tanaman', icon: <Sprout size={16} />, category: 'Hobby' },
  { id: 'pet_groomer', label: 'Pet Groomer', icon: <Scissors size={16} />, category: 'Business' },
];

const formatRupiah = (number: number | null | undefined) => {
  if (number === null || number === undefined || isNaN(number)) return "Rp -";
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

// Fungsi helper untuk menentukan Status Pasar berdasarkan Skor
const getMarketStatus = (score: number) => {
  if (score >= 75) return { 
    label: "Red Ocean (Sangat Kompetitif)", 
    color: "bg-red-500", 
    textColor: "text-red-500", 
    desc: "Pasar padat. Butuh diferensiasi kuat." 
  };
  if (score >= 40) return { 
    label: "Yellow Ocean (Bertumbuh)", 
    color: "bg-yellow-500", 
    textColor: "text-yellow-600", 
    desc: "Pasar sedang tren. Waktu tepat masuk." 
  };
  return { 
    label: "Blue Ocean (Peluang Besar)", 
    color: "bg-green-500", 
    textColor: "text-green-600", 
    desc: "Kompetisi rendah. Potensi dominasi tinggi." 
  };
};

export default function App() {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingSolution, setIsGeneratingSolution] = useState(false);
  const [results, setResults] = useState<any>(null);
  
  // State interaksi Multi-Solution
  const [activePainPointIndex, setActivePainPointIndex] = useState<number | null>(null);
  const [generatedSolutionsMap, setGeneratedSolutionsMap] = useState<any>(null); 
  const [activeSolutionTab, setActiveSolutionTab] = useState('ebook'); 
  
  const [selectedPriceTier, setSelectedPriceTier] = useState<any>(null); 
  const [selectedCpa, setSelectedCpa] = useState<any>(null); 
  const [budgetSimulation, setBudgetSimulation] = useState(1000000);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyCreativeSuccess, setCopyCreativeSuccess] = useState<Record<string, boolean>>({});
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({}); 
  const [isGeneratingImage, setIsGeneratingImage] = useState<Record<string, boolean>>({});
  const solutionRef = useRef<HTMLDivElement>(null);

  // --- API KEY MANAGEMENT ---
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [tempKey, setTempKey] = useState(''); 
  const [showQuotaModal, setShowQuotaModal] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setTempKey(storedKey);
    } else if (process.env.GEMINI_API_KEY) {
      // Use environment variable if available as fallback
      setApiKey(process.env.GEMINI_API_KEY);
      setTempKey(process.env.GEMINI_API_KEY);
    }
  }, []);

  const saveApiKey = () => {
    const trimmedKey = tempKey.trim();
    
    if (!trimmedKey) {
      alert("Mohon masukkan API Key terlebih dahulu.");
      return;
    }

    if (!trimmedKey.startsWith('AIza')) {
      alert("Format API Key sepertinya salah. Key Google biasanya dimulai dengan 'AIza'. Mohon cek kembali.");
      return;
    }

    localStorage.setItem('gemini_api_key', trimmedKey);
    setApiKey(trimmedKey);
    setShowSettings(false);
  };

  const removeApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setTempKey('');
    setResults(null); 
  };

  const filteredMarkets = TARGET_MARKETS.filter(m => 
    m.label.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Helper to get current active solution object
  const activeSolution = generatedSolutionsMap ? generatedSolutionsMap[activeSolutionTab] : null;

  // Update simulation when tab changes
  useEffect(() => {
    if (activeSolution) {
      if (activeSolution.priceTiers && activeSolution.priceTiers.length > 1) {
        setSelectedPriceTier(activeSolution.priceTiers[1]);
      } else {
        setSelectedPriceTier(activeSolution.priceTiers?.[0] || { price: 149000, label: "Standard" });
      }
      
      if (activeSolution.cpaOptions && activeSolution.cpaOptions.length > 1) {
        setSelectedCpa(activeSolution.cpaOptions[1]);
      } else {
        setSelectedCpa(activeSolution.cpaOptions?.[0] || { cost: 50000 });
      }
    }
  }, [activeSolutionTab, generatedSolutionsMap]);

  // Copy Function
  const handleCopyLandingPage = () => {
    if (!activeSolution?.landingPage) return;
    
    const lp = activeSolution.landingPage;
    const offerStackText = lp.offerStack 
        ? lp.offerStack.map((item: any) => `📦 ${item.item} (Senilai ${formatRupiah(item.value)})`).join('\n')
        : '';
    const priceText = selectedPriceTier 
        ? `\n${lp.totalValueIntro || 'TOTAL VALUE'}: ${formatRupiah(lp.totalValue || 0)}\n\n${lp.priceRelief || ''}\n\n🔥 ${lp.priceCallout || 'Hanya'}: ${formatRupiah(selectedPriceTier.price)}`
        : '';

    const textToCopy = `
HEADLINE:
${lp.headline}

SUBHEADLINE:
${lp.subheadline}

BODY COPY:
${lp.body}

${lp.lossCalculation ? `--- KERUGIAN JIKA TIDAK BERTINDAK ---\n${lp.lossCalculation}\n` : ''}

${lp.benefitsIntro || ''}
${lp.benefits ? lp.benefits.map((b: string) => `✅ ${b}`).join('\n') : ''}

${lp.offerIntro || ''}
---
THE IRRESISTIBLE OFFER (VALUE STACK):
${offerStackText}
${priceText}
---

CALL TO ACTION (CTA):
${lp.cta}
    `.trim();

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopyCreative = (creative: any, idx: number) => {
    const key = `${activeSolutionTab}-${idx}`;
    const textToCopy = `
ANGLE: ${creative.angle}
🖼️ SARAN VISUAL:
${creative.visual}

📝 TEXT UTAMA (PRIMARY TEXT):
${creative.primaryText}

📌 JUDUL (HEADLINE):
${creative.headline}

ℹ️ DESKRIPSI:
${creative.description}
    `.trim();

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopyCreativeSuccess(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyCreativeSuccess(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Copy creative failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleGenerateImage = async (solutionType: string, creativeIdx: number, creative: any) => {
    if (!apiKey) {
      alert("API Key belum diset.");
      setShowSettings(true);
      return;
    }

    const key = `${solutionType}-${creativeIdx}`;
    setIsGeneratingImage(prev => ({ ...prev, [key]: true }));

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        Create a high-converting Meta Ads (Facebook/Instagram) advertisement illustration.
        Context: Digital Product for ${results.category}.
        Creative Angle: ${creative.angle}.
        Visual Concept: ${creative.visual}.
        Style: Modern, vibrant, professional illustration, high contrast, clean composition, scroll-stopping, 3D render or high-quality vector style.
        Requirement: 1:1 Aspect Ratio, no text in image (or minimal, clean text), focus on emotional impact and clarity of the offer.
        Target: High CTR (Click-Through Rate).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let imageUrl = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setGeneratedImages(prev => ({ ...prev, [key]: imageUrl }));
      } else {
        throw new Error("Gagal menghasilkan gambar.");
      }
    } catch (error: any) {
      console.error("Image Gen Error:", error);
      
      const errorMessage = error.message?.toLowerCase() || "";
      const isQuotaError = error.status === 429 || errorMessage.includes('quota') || errorMessage.includes('too many requests');

      if (isQuotaError) {
        setShowQuotaModal(true);
      } else {
        alert(`Gagal generate gambar: ${error.message}`);
      }
    } finally {
      setIsGeneratingImage(prev => ({ ...prev, [key]: false }));
    }
  };

  // --- ROBUST API CALLER WITH RETRY ---
  const callGeminiAPI = async (prompt: string, keyToUse: string) => {
    const currentKey = keyToUse || apiKey;
    if (!currentKey) {
      throw new Error("API Key is missing. Please set it in settings.");
    }
    
    const ai = new GoogleGenAI({ apiKey: currentKey });
    
    let retries = 3;
    let delay = 2000; 

    while (retries > 0) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt
        });
        
        const textResponse = response.text;
        if (!textResponse) throw new Error("No response text received from AI");
        
        const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        try {
          return JSON.parse(cleanJson);
        } catch (parseError) {
          console.error("JSON Parse Error. Raw response:", textResponse);
          throw new Error("AI returned invalid JSON format. Please try again.");
        }

      } catch (error: any) {
        console.error(`Gemini API Attempt failed (${4 - retries}/3):`, error);
        
        if (error.message?.includes('API key not valid') || error.status === 403 || error.status === 401) {
           throw new Error('INVALID_KEY');
        }

        // Handle Overload or Rate Limit
        if ((error.message?.includes('503') || error.message?.includes('429') || error.message?.includes('overloaded')) && retries > 1) {
          console.warn(`Model overloaded or rate limited. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; 
          retries--;
        } else {
          throw error; 
        }
      }
    }
    throw new Error("Failed to get response after multiple retries.");
  };


  // --- ANALYZE MARKET (PHASE 1) ---
  const handleAnalyze = async (overrideTarget: string | null = null) => {
    if (!apiKey) return; 

    setIsAnalyzing(true);
    setResults(null);
    setActivePainPointIndex(null);
    setGeneratedSolutionsMap(null);
    setBudgetSimulation(1000000);

    let targetLabel = searchFilter;
    let targetCategory = 'Custom';

    // Logic penentuan target
    if (overrideTarget) {
      const preset = TARGET_MARKETS.find(t => t.id === overrideTarget);
      if (preset) { targetLabel = preset.label; targetCategory = preset.category; }
    } else if (selectedTarget) {
      const preset = TARGET_MARKETS.find(t => t.id === selectedTarget);
      if (preset) { targetLabel = preset.label; targetCategory = preset.category; }
    } else if (searchFilter.trim().length > 0) {
      const presetMatch = TARGET_MARKETS.find(m => 
        m.id.toLowerCase() === searchFilter.toLowerCase() || 
        m.label.toLowerCase().includes(searchFilter.toLowerCase())
      );
      if (presetMatch) { targetLabel = presetMatch.label; targetCategory = presetMatch.category; }
      else { targetLabel = searchFilter; targetCategory = 'Custom Niche'; }
    }

    try {
      const prompt = `
        Context: Indonesian Market Analysis.
        Niche/Target Market: "${targetLabel}"
        
        Identify 10 specific, urgent, and emotional pain points (problems) experienced by people in this niche.
        
        For each pain point, estimate:
        1. "competition": Level of existing solutions (High/Medium/Low). High means many products exist.
        2. "demand": Volume of people seeking solution (High/Medium/Low).
        
        Return ONLY a JSON array of objects with this structure:
        [
          {"problem": "Masalah 1...", "competition": "High", "demand": "High"},
          {"problem": "Masalah 2...", "competition": "Low", "demand": "Medium"}
        ]
      `;
      
      const painPoints = await callGeminiAPI(prompt, apiKey);
      
      setResults({
        category: targetLabel,
        categoryType: targetCategory,
        painPoints: painPoints
      });

    } catch (error: any) {
      console.error("AI Error:", error);
      if (error.message === 'INVALID_KEY') {
        alert("API Key Anda ditolak oleh Google. Pastikan tidak ada spasi di awal/akhir dan key aktif.");
        setShowSettings(true);
      } else {
        alert(`Gagal menganalisa market: ${error.message}.`);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- GENERATE SOLUTIONS (PHASE 2) ---
  const handlePainPointClick = async (painPointObj: any, index: number) => {
    if (!apiKey) return;

    setActivePainPointIndex(index);
    setIsGeneratingSolution(true);
    setGeneratedSolutionsMap(null);
    
    const painPointText = painPointObj.problem;

    try {
      const prompt = `
        Context: Indonesian Digital Product Strategy (Meta Ads Modern Andromeda Style).
        Target Market: ${results.category}
        Problem: "${painPointText}"

        Act as a veteran Media Buyer & Product Strategist (20+ years exp) who specializes in Meta Ads (Facebook/Instagram).
        Create 5 DISTINCT digital product concepts to solve this ONE problem.
        
        Types required:
        1. 'ebook': An Ebook/PDF Guide.
        2. 'course': A Video Course/Workshop.
        3. 'tool': A Template/System/Dashboard (Excel/Notion).
        4. 'app': A simple Web App/Mobile App concept (or SaaS).
        5. 'membership': A Mentoring Program or Exclusive Community.

        For EACH type, provide detailed strategy AND a High-Converting Landing Page Copy.
        
        Return ONLY a JSON object with keys: "ebook", "course", "tool", "app", "membership".
        Each value must have this structure:
        {
          "type": "Specific Type Name",
          "name": "Catchy Product Name",
          "desc": "Persuasive description.",
          "creatives": [
            {
              "angle": "Angle 1 Name",
              "visual": "...",
              "primaryText": "...",
              "headline": "...",
              "description": "..."
            },
            {
              "angle": "Angle 2 Name",
              "visual": "...",
              "primaryText": "...",
              "headline": "...",
              "description": "..."
            },
            {
              "angle": "Angle 3 Name",
              "visual": "...",
              "primaryText": "...",
              "headline": "...",
              "description": "..."
            }
          ],
          "offer": "Value stack offer string.",
          "priceTiers": [
            {"label": "Basic", "price": 149000, "benefit": "..."},
            {"label": "Mid", "price": 299000, "benefit": "..."},
            {"label": "High", "price": 599000, "benefit": "..."}
          ],
          "cpaOptions": [
            {"label": "Optimis", "cost": 35000, "desc": "..."},
            {"label": "Realistis", "cost": 65000, "desc": "..."},
            {"label": "Konservatif", "cost": 95000, "desc": "..."}
          ],
          "structure": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
          "landingPage": {
            "headline": "A hypnotic, direct headline that triggers the reptilian brain (Fear of missing out, survival, or instant status).",
            "subheadline": "Support text that builds extreme urgency and desire.",
            "body": "Short, punchy, to-the-point copy. Use the 'Pain-Agitate-Solve' framework but keep it aggressive and impulsive. Focus on 'Why you need this NOW' rather than just features. Trigger the lizard brain (survival, greed, or status). Max 3-4 short paragraphs.",
            "lossCalculation": "A list of real losses (financial, time, status) if the problem is NOT solved. Format: 'Mari kita hitung ruginya jika Anda TIDAK pakai [Product Name]: \n* [Loss 1]: Rp [Value]\n* [Loss 2]: Rp [Value]\n* [Loss 3]: [Intangible Loss]'.",
            "benefitsIntro": "A powerful transition sentence connecting the body copy to the benefits list (e.g., 'Inilah alasan mengapa ribuan orang memilih solusi ini sekarang juga:')",
            "benefits": ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4", "Benefit 5"],
            "offerIntro": "A high-pressure transition sentence connecting the benefits to the offer stack (e.g., 'Tapi tunggu, Anda tidak hanya mendapatkan solusi di atas. Inilah semua yang akan Anda amankan hari ini:')",
            "totalValueIntro": "A sentence explaining the total value of the package (e.g., 'Total Nilai Paket [Product Name] + [Number] Bonus di atas adalah: Rp [TotalValue]').",
            "priceRelief": "A powerful transition sentence that makes the price feel small (e.g., 'Tapi khusus untuk Anda yang ingin kerja cerdas hari ini... ANDA TIDAK PERLU BAYAR SEJUTA. Cukup investasikan sekali jajan kopi mewah.').",
            "priceCallout": "A powerful, non-gimmicky urgency trigger for the final price that hits the reptilian brain (e.g., 'Hanya Untuk 50 Orang Pertama Yang Berani Berubah Hari Ini', 'Amankan Slot Anda Sebelum Harga Kembali Normal', 'Investasi Sekali Seumur Hidup Untuk Kebebasan Anda')",
            "cta": "Urgent, direct Call to Action (e.g., 'Amankan Akses Sekarang Sebelum Ditutup')",
            "offerStack": [
                {"item": "Main Product Name", "value": 1500000},
                {"item": "Bonus 1 Name", "value": 500000},
                {"item": "Bonus 2 Name", "value": 300000}
            ],
            "totalValue": 2300000
          },
          "competition": {
              "score": 85, 
              "strategy": "Tips to win competition"
          },
          "adsStrategy": {
             "structure": "Advantage+ Shopping Campaign (ASC) ONLY. Why? Because broad targeting + machine learning beats manual targeting.",
             "daily_budget": "Rekomendasi spesifik IDR (e.g. Rp 250.000/day per adset)",
             "conversion_event": "PURCHASE (Jangan traffic/add to cart). Pixel wajib firing.",
             "phase1_start": "TESTING: Gunakan metode 3:2:2 (3 Creative, 2 Primary Text, 2 Headline) di dalam 1 Adset Dynamic Creative. Target: BROAD (No Interest, No Lookalike). Umur & Gender: Open. Biarkan AI mencari audience.",
             "phase2_optimize": "OPTIMASI (3-4 Hari): Matikan Ads (Creative) yang spend > 1.5x CPA Target tapi 0 Sales. Lihat Soft Metrics: Jika Hook Rate < 20% (Video), ganti 3 detik pertama. Jika Hold Rate rendah, perbaiki isi konten.",
             "phase3_scale": "SCALING: Jika nemu Winning Creative (ROAS > 2x), duplikat post ID ke kampanye Scaling (CBO) atau naikkan budget 20% setiap 2-3 hari (Vertical Scale). Jangan sentuh adset yang sedang perform!"
          }
        }
        
        CRITICAL INSTRUCTION:
        - "landingPage.body": MUST be aggressive, to-the-point, and trigger impulsive buying. No fluff. Focus on the 'Lizard Brain' (Survival, Status, Greed, Fear).
        - "landingPage.headline": MUST be a scroll-stopper that hits the core desire or fear immediately.
        - "adsStrategy": MUST be extremely detailed and technical, following the Andromeda/Broad targeting methodology. 
        - "competition.score": 0 (Empty) to 100 (Saturated).
        
        Notes: Price in IDR (min 149000). Use Indonesian language. Ensure JSON is valid.
      `;

      const solutions = await callGeminiAPI(prompt, apiKey);
      setGeneratedSolutionsMap(solutions);
      setActiveSolutionTab('ebook'); 

    } catch (error: any) {
      console.error("Error generating solution:", error);
      if (error.message === 'INVALID_KEY') {
        alert("API Key tidak valid. Mohon periksa di pengaturan.");
        setShowSettings(true);
      } else {
        alert(`Gagal membuat solusi: ${error.message}. Server AI mungkin sedang sibuk.`);
      }
    } finally {
      setIsGeneratingSolution(false);
      setBudgetSimulation(1000000);
      setTimeout(() => {
        solutionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const solutionTabs = [
    { id: 'ebook', label: 'Ebook / Guide', icon: <Book size={16} /> },
    { id: 'course', label: 'Video Course', icon: <MonitorPlay size={16} /> },
    { id: 'tool', label: 'System / Tool', icon: <Wrench size={16} /> },
    { id: 'app', label: 'App Concept', icon: <Smartphone size={16} /> },
    { id: 'membership', label: 'Mentoring / Comm', icon: <Crown size={16} /> },
  ];

  const getCompetitionBadge = (comp: string) => {
    if (comp === 'Low') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200"><Sparkles size={10}/> Blue Ocean (Low Comp)</span>;
    if (comp === 'High') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200"><ShieldCheck size={10}/> Red Ocean (High Comp)</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 border border-yellow-200"><TrendingUp size={10}/> Medium Comp</span>;
  };

  const getDemandBadge = (dem: string) => {
    if (dem === 'High') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200"><TrendingUp size={10}/> High Demand</span>;
    return null;
  };

  // --- RENDER LOCK SCREEN IF NO API KEY ---
  if (!apiKey) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-in zoom-in duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Aplikasi Terkunci</h1>
            <p className="text-slate-600 text-sm">
              Untuk menghasilkan ide produk yang <strong>cerdas, unik, dan tidak repetitif</strong>, aplikasi ini mewajibkan koneksi ke otak AI Google Gemini.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Masukkan Gemini API Key</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-mono text-sm"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Belum punya key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Dapatkan Gratis di Google AI Studio</a>
              </p>
            </div>

            <button 
              onClick={saveApiKey}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Zap size={20} fill="currentColor" /> Buka Akses Aplikasi
            </button>
            
            <div className="flex items-center gap-2 justify-center text-[10px] text-slate-400">
              <ShieldCheck size={12} />
              <span>Key disimpan aman di browser Anda (LocalStorage)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN APP RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 relative">
      
      {/* SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Settings className="text-blue-600" /> Pengaturan API
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-xl text-sm text-green-800 border border-green-100">
                <p className="font-bold flex items-center gap-2 mb-1"><CheckCircle2 size={16}/> Status: Terhubung</p>
                <p>Anda menggunakan Gemini AI untuk analisa market real-time.</p>
              </div>
              
              <button 
                onClick={removeApiKey}
                className="w-full bg-red-50 text-red-600 py-2.5 rounded-lg font-bold hover:bg-red-100 transition-colors border border-red-200"
              >
                Hapus API Key & Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUOTA ERROR MODAL */}
      {showQuotaModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-300 border-t-4 border-red-500">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-red-100 p-4 rounded-full text-red-600">
                <AlertTriangle size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Quota Exceeded</h3>
              <p className="text-slate-600 leading-relaxed">
                Untuk pembuatan gambar wajib menggunakan paid API key, silahkan lihat tutorial cara upgrade API key di modul.
              </p>
              <button 
                onClick={() => setShowQuotaModal(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold transition-all shadow-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg text-blue-900">
              <Zap size={24} strokeWidth={2.5} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Prodig Idea Maker</h1>
              <p className="text-xs text-blue-200 hidden md:block">
                Versi 2.0 By Joze Rizal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-1.5 rounded-full text-xs font-medium transition-colors backdrop-blur-sm border border-green-500/30"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              API Connected
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
        
        {/* INPUT SECTION */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                <Search size={16} />
                Pilih Target Market / Niche (Custom Supported)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => {
                    setSearchFilter(e.target.value);
                    if(selectedTarget) setSelectedTarget(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchFilter.trim()) {
                      handleAnalyze();
                    }
                  }}
                  placeholder="Ketik apa saja... (Contoh: Tukang Las, Pecinta Reptil, Jasa Cuci Sepatu)"
                  className="w-full p-4 pl-12 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>

            <div className="max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredMarkets.map((market) => (
                  <button
                    key={market.id}
                    onClick={() => {
                      setSelectedTarget(market.id);
                      setSearchFilter(market.label); 
                    }}
                    className={`flex items-center gap-2 px-3 py-3 rounded-lg text-xs md:text-sm font-medium transition-all text-left ${
                      selectedTarget === market.id
                        ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300'
                        : 'bg-slate-50 text-slate-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-200'
                    }`}
                  >
                    <span className={`${selectedTarget === market.id ? 'text-white' : 'text-blue-600'}`}>
                      {market.icon}
                    </span>
                    <span className="truncate">{market.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleAnalyze()}
              disabled={!selectedTarget && !searchFilter}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all mt-4 ${
                !selectedTarget && !searchFilter
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-xl hover:scale-[1.01]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Analyzing Market...
                </>
              ) : (
                <>
                  <ListOrdered size={20} />
                  Analisa Pain Points
                </>
              )}
            </button>
          </div>
        </section>

        {/* RESULTS SECTION */}
        {results && !isAnalyzing && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* PAIN POINTS */}
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
              <div className="bg-red-50 p-6 border-b border-red-100 flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg text-red-600">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">1. Analisa Masalah: {results.category}</h3>
                  <p className="text-sm text-slate-600">
                    Kami menemukan 10 masalah utama dengan indikator kompetisinya:
                  </p>
                </div>
              </div>
              <div className="p-4 bg-slate-50/50">
                <div className="grid gap-3">
                  {results.painPoints.map((pointObj: any, idx: number) => (
                    <button 
                      key={idx}
                      onClick={() => handlePainPointClick(pointObj, idx)}
                      disabled={isGeneratingSolution}
                      className={`text-left w-full p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                        activePainPointIndex === idx 
                          ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500 z-10' 
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                      } ${isGeneratingSolution ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold rounded-full text-sm transition-colors ${
                          activePainPointIndex === idx ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <span className="text-slate-700 font-medium pt-1 block mb-2">{pointObj.problem}</span>
                          <div className="flex flex-wrap gap-2">
                            {getCompetitionBadge(pointObj.competition)}
                            {getDemandBadge(pointObj.demand)}
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-all self-center ${
                          activePainPointIndex === idx ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100'
                        }`}>
                          {isGeneratingSolution && activePainPointIndex === idx ? <Loader2 className="animate-spin" size={14}/> : <ChevronRight size={14} />}
                          {isGeneratingSolution && activePainPointIndex === idx ? "Brainstorming..." : "Solution"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* GENERATED SOLUTIONS SECTION */}
            {generatedSolutionsMap && !isGeneratingSolution && activeSolution && (
              <div ref={solutionRef} className="animate-in fade-in slide-in-from-bottom-10 duration-700 scroll-mt-24">
                <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                   <div className="h-px w-12 bg-blue-300"></div>
                   <span className="text-blue-600 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                     <Sparkles size={16} /> 5 Variasi Solusi Produk
                   </span>
                   <div className="h-px w-12 bg-blue-300"></div>
                </div>

                {/* SOLUTION TABS */}
                <div className="flex overflow-x-auto gap-2 mb-4 pb-2 snap-x hide-scrollbar">
                  {solutionTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSolutionTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 border-2 ${
                        activeSolutionTab === tab.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-500'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 border border-blue-200 overflow-hidden ring-4 ring-blue-50/50">
                    {/* Header Produk */}
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden transition-all">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                      
                      <div className="flex-1 relative z-10">
                        <div className="flex gap-2 mb-3">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-white/30">
                             {activeSolution.type}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mb-2 text-white drop-shadow-sm animate-in fade-in slide-in-from-left-4 duration-500">
                          {activeSolution.name}
                        </h3>
                        <p className="text-blue-100 text-sm italic border-l-2 border-yellow-400 pl-3 max-w-2xl">
                          "{activeSolution.desc}"
                        </p>
                      </div>
                      <div className="text-left md:text-right bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 min-w-[200px] relative z-10">
                        <p className="text-xs text-blue-100 font-semibold uppercase tracking-wide mb-1">Potensi Harga</p>
                        <p className="text-2xl md:text-3xl font-bold text-yellow-300 shadow-black drop-shadow-sm">
                          {selectedPriceTier ? formatRupiah(selectedPriceTier.price) : '-'}
                        </p>
                        <p className="text-[10px] text-blue-200 mt-1">{selectedPriceTier ? selectedPriceTier.label : 'Pilih Tier'}</p>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 grid lg:grid-cols-12 gap-8">
                      {/* Left: Detail */}
                      <div className="lg:col-span-7 space-y-8">
                        
                        {/* Market Radar */}
                        {activeSolution.competition && (() => {
                          const status = getMarketStatus(activeSolution.competition.score);
                          return (
                            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-white relative overflow-hidden">
                              <div className="flex justify-between items-center relative z-10">
                                <div>
                                  <h4 className={`flex items-center gap-2 font-bold ${status.textColor} text-sm mb-1`}>
                                    <BarChart2 size={16}/> Market Radar
                                  </h4>
                                  <p className="text-2xl font-bold">{status.label}</p>
                                  <p className="text-xs text-slate-400 mt-1">{activeSolution.competition.strategy}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-black text-white">{activeSolution.competition.score}%</div>
                                  <div className="text-[10px] uppercase text-slate-500 font-bold">Saturation</div>
                                </div>
                              </div>
                              <div className="w-full bg-slate-800 h-2 rounded-full mt-4 relative z-10 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 ${status.color}`} 
                                  style={{width: `${activeSolution.competition.score}%`}}
                                ></div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* NEW: ANDROMEDA ADS STRATEGY */}
                        {activeSolution.adsStrategy && (
                          <div className="bg-indigo-50 rounded-xl border border-indigo-100 overflow-hidden">
                            <div className="bg-indigo-100 p-4 border-b border-indigo-200 flex items-center gap-2">
                              <Rocket size={18} className="text-indigo-600"/>
                              <h4 className="font-bold text-indigo-900 text-sm">Strategy Meta Ads (Andromeda)</h4>
                            </div>
                            <div className="p-5 grid gap-4 relative">
                              <div className="grid grid-cols-2 gap-4 mb-2">
                                <div className="bg-white p-3 rounded-lg border border-indigo-100">
                                  <span className="text-[10px] font-bold text-indigo-400 uppercase block mb-1">Recommended Budget</span>
                                  <div className="flex items-center gap-2 text-indigo-900 font-bold">
                                    <Coins size={16} /> {activeSolution.adsStrategy.daily_budget}
                                  </div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-indigo-100">
                                  <span className="text-[10px] font-bold text-indigo-400 uppercase block mb-1">Optimization Event</span>
                                  <div className="flex items-center gap-2 text-indigo-900 font-bold">
                                    <MousePointerClick size={16} /> {activeSolution.adsStrategy.conversion_event}
                                  </div>
                                </div>
                              </div>
                              <div className="bg-indigo-500/10 p-3 rounded-lg border border-indigo-200 text-xs font-medium text-indigo-800">
                                💡 <strong>Structure:</strong> {activeSolution.adsStrategy.structure}
                              </div>

                              <div className="space-y-4 mt-2">
                                {/* Phase 1 */}
                                <div className="relative pl-6 border-l-2 border-indigo-200">
                                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white"></div>
                                  <h5 className="font-bold text-indigo-800 text-sm mb-1">Fase 1: START (Testing)</h5>
                                  <p className="text-sm text-slate-600 leading-relaxed">{activeSolution.adsStrategy.phase1_start}</p>
                                </div>
                                {/* Phase 2 */}
                                <div className="relative pl-6 border-l-2 border-indigo-200">
                                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white"></div>
                                  <h5 className="font-bold text-indigo-800 text-sm mb-1">Fase 2: OPTIMIZE (Kill/Scale)</h5>
                                  <p className="text-sm text-slate-600 leading-relaxed">{activeSolution.adsStrategy.phase2_optimize}</p>
                                </div>
                                {/* Phase 3 */}
                                <div className="relative pl-6 border-l-2 border-indigo-200">
                                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white"></div>
                                  <h5 className="font-bold text-indigo-800 text-sm mb-1">Fase 3: SCALE (Aggressive)</h5>
                                  <p className="text-sm text-slate-600 leading-relaxed">{activeSolution.adsStrategy.phase3_scale}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Struktur Konten (Dynamic per Type) */}
                        {activeSolution.structure && activeSolution.structure.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-2 font-bold text-slate-800">
                               <div className="p-1.5 bg-orange-100 rounded text-orange-600"><List size={16} /></div>
                               {activeSolutionTab === 'ebook' ? "Struktur Ebook (Daftar Isi)" : 
                                activeSolutionTab === 'course' ? "Kurikulum Modul Course" : 
                                "Fitur Utama & Komponen"}
                            </h4>
                            <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-100">
                               <ul className="space-y-2">
                                 {activeSolution.structure.map((item: string, idx: number) => (
                                   <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                     <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-orange-200 text-orange-800 rounded-full text-[10px] font-bold mt-0.5">{idx + 1}</span>
                                     <span>{item}</span>
                                   </li>
                                 ))}
                               </ul>
                               
                               {/* KHUSUS EBOOK CTA */}
                               {activeSolutionTab === 'ebook' && (
                                 <div className="mt-5 pt-4 border-t border-orange-200">
                                   <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                                     <div className="text-sm">
                                       <p className="font-bold text-slate-800">Ingin buat ebook ini dengan cepat?</p>
                                       <p className="text-slate-500 text-xs">Gunakan tools otomatis kami.</p>
                                     </div>
                                     <a 
                                       href="https://jozerizal.com/ebookmastermakernew" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:shadow-lg transition-all transform hover:scale-105"
                                     >
                                       Buka Ebook Master Maker <ExternalLink size={12} />
                                     </a>
                                   </div>
                                 </div>
                               )}
                            </div>
                          </div>
                        )}

                        {/* LANDING PAGE COPY TEMPLATE */}
                        {activeSolution.landingPage && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="flex items-center gap-2 font-bold text-slate-800">
                                <div className="p-1.5 bg-blue-100 rounded text-blue-600"><FileText size={16} /></div>
                                Template Landing Page (Siap Copy)
                              </h4>
                              <button 
                                onClick={handleCopyLandingPage}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  copySuccess 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700'
                                }`}
                              >
                                {copySuccess ? <Check size={14}/> : <Copy size={14}/>}
                                {copySuccess ? 'Tersalin!' : 'Copy Text'}
                              </button>
                            </div>
                            
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 font-serif text-slate-800 leading-relaxed shadow-inner">
                              <div className="space-y-6">
                                <div>
                                  <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1 block">HEADLINE</span>
                                  <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                                    {activeSolution.landingPage.headline}
                                  </h1>
                                </div>
                                
                                <div>
                                  <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1 block">SUB-HEADLINE</span>
                                  <p className="text-lg text-slate-600 italic">
                                    {activeSolution.landingPage.subheadline}
                                  </p>
                                </div>

                                <div>
                                  <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1 block">BODY COPY (STORY & PROBLEM)</span>
                                  <div className="whitespace-pre-line text-sm">
                                    {activeSolution.landingPage.body}
                                  </div>
                                </div>

                                {activeSolution.landingPage.lossCalculation && (
                                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                    <span className="text-[10px] font-sans font-bold text-red-400 uppercase tracking-wider mb-2 block">KERUGIAN JIKA TIDAK BERTINDAK</span>
                                    <div className="whitespace-pre-line text-sm text-red-900 font-medium">
                                      {activeSolution.landingPage.lossCalculation}
                                    </div>
                                  </div>
                                )}

                                {activeSolution.landingPage.benefitsIntro && (
                                  <p className="text-sm font-bold text-slate-800 italic">
                                    {activeSolution.landingPage.benefitsIntro}
                                  </p>
                                )}

                                <div className="bg-white p-4 rounded-lg border border-slate-200">
                                  <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-2 block">KEY BENEFITS</span>
                                  <ul className="space-y-2">
                                    {activeSolution.landingPage.benefits && activeSolution.landingPage.benefits.map((benefit: string, i: number) => (
                                      <li key={i} className="flex items-start gap-2 text-sm font-medium">
                                        <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {activeSolution.landingPage.offerIntro && (
                                  <p className="text-sm font-bold text-slate-800 italic">
                                    {activeSolution.landingPage.offerIntro}
                                  </p>
                                )}

                                {/* NEW: OFFER STACK SECTION */}
                                <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200 relative overflow-hidden">
                                  <div className="absolute top-0 right-0 bg-yellow-200 text-yellow-800 text-[10px] font-bold px-3 py-1 rounded-bl-lg">THE OFFER STACK</div>
                                  <span className="text-[10px] font-sans font-bold text-yellow-700 uppercase tracking-wider mb-3 block">WHAT YOU GET</span>
                                  
                                  <div className="space-y-3 mb-6">
                                    {activeSolution.landingPage.offerStack && activeSolution.landingPage.offerStack.map((stack: any, i: number) => (
                                      <div key={i} className="flex justify-between items-center text-sm border-b border-yellow-100 pb-2 last:border-0">
                                        <span className="font-medium text-slate-800 flex items-center gap-2">
                                          <Gift size={14} className="text-yellow-600"/> {stack.item}
                                        </span>
                                        <span className="font-bold text-slate-500 decoration-slate-400">(Senilai {formatRupiah(stack.value)})</span>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="text-center space-y-2 pt-4 border-t-2 border-dashed border-yellow-200">
                                    {activeSolution.landingPage.totalValueIntro && (
                                      <p className="text-sm font-bold text-slate-800">
                                        {activeSolution.landingPage.totalValueIntro}
                                      </p>
                                    )}

                                    <p className="text-xl text-slate-400 line-through decoration-red-500 decoration-2 font-bold">
                                      {formatRupiah(activeSolution.landingPage.totalValue || 0)}
                                    </p>
                                    
                                    <div className="my-3"></div>

                                    {activeSolution.landingPage.priceRelief && (
                                      <p className="text-sm font-bold text-slate-900 whitespace-pre-line mb-4">
                                        {activeSolution.landingPage.priceRelief}
                                      </p>
                                    )}
                                    
                                    <p className="text-sm text-green-600 font-bold uppercase animate-pulse">
                                      {activeSolution.landingPage.priceCallout || 'Hanya'}
                                    </p>
                                    <p className="text-4xl text-green-600 font-black tracking-tighter">
                                      {selectedPriceTier ? formatRupiah(selectedPriceTier.price) : '...'}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1 block">CALL TO ACTION</span>
                                  <div className="bg-red-600 text-white text-center py-3 rounded-lg font-bold text-lg shadow-lg">
                                    {activeSolution.landingPage.cta}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Creative Strategies */}
                        <div className="space-y-4">
                          <h4 className="flex items-center gap-2 font-bold text-slate-800">
                             <div className="p-1.5 bg-purple-100 rounded text-purple-600"><Video size={16} /></div>
                             3 Sudut Pandang Iklan & Komposisi
                          </h4>
                          <div className="grid gap-6">
                             {activeSolution.creatives && activeSolution.creatives.map((creative: any, idx: number) => (
                               <div key={idx} className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
                                  <div className="flex items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-3">
                                      <span className="bg-purple-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">{idx+1}</span>
                                      <h5 className="font-bold text-purple-900 text-base">{creative.angle}</h5>
                                    </div>
                                    <button
                                      onClick={() => handleCopyCreative(creative, idx)}
                                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        copyCreativeSuccess[`${activeSolutionTab}-${idx}`]
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : 'bg-slate-100 text-slate-600 hover:bg-purple-100 hover:text-purple-700 border border-slate-200'
                                      }`}
                                    >
                                      {copyCreativeSuccess[`${activeSolutionTab}-${idx}`] ? (
                                        <><Check size={14} /> Copied!</>
                                      ) : (
                                        <><Copy size={14} /> Copy All</>
                                      )}
                                    </button>
                                  </div>
                                  
                                  <div className="space-y-4 ml-9">
                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                      <p className="text-[10px] font-bold text-purple-400 uppercase mb-1">🖼️ Saran Visual</p>
                                      <p className="text-sm text-slate-700 leading-relaxed">{creative.visual}</p>
                                    </div>
                                    
                                    <div>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">📝 Text Utama (Primary Text)</p>
                                      <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{creative.primaryText}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">📌 Judul (Headline)</p>
                                        <p className="text-sm font-bold text-slate-900">{creative.headline}</p>
                                      </div>
                                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ℹ️ Deskripsi</p>
                                        <p className="text-sm text-slate-600">{creative.description}</p>
                                      </div>
                                    </div>

                                    {/* Image Generation Section */}
                                    <div className="mt-4 pt-4 border-t border-purple-50 flex flex-col gap-3">
                                      {!generatedImages[`${activeSolutionTab}-${idx}`] ? (
                                        <button
                                          onClick={() => handleGenerateImage(activeSolutionTab, idx, creative)}
                                          disabled={isGeneratingImage[`${activeSolutionTab}-${idx}`]}
                                          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white py-2.5 px-4 rounded-lg text-sm font-bold transition-all shadow-sm"
                                        >
                                          {isGeneratingImage[`${activeSolutionTab}-${idx}`] ? (
                                            <>
                                              <Loader2 size={16} className="animate-spin" />
                                              Generating High CTR Image...
                                            </>
                                          ) : (
                                            <>
                                              <Sparkles size={16} />
                                              Generate Gambar Iklan (High CTR)
                                            </>
                                          )}
                                        </button>
                                      ) : (
                                        <div className="space-y-3">
                                          <div className="relative group rounded-xl overflow-hidden border-2 border-purple-200 shadow-lg aspect-square max-w-sm mx-auto">
                                            <img 
                                              src={generatedImages[`${activeSolutionTab}-${idx}`]} 
                                              alt="Ad Creative" 
                                              className="w-full h-full object-cover"
                                              referrerPolicy="no-referrer"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                              <p className="text-white text-xs font-bold px-4 text-center">Ilustrasi Iklan 1:1 Siap Digunakan</p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 justify-center">
                                            <button
                                              onClick={() => handleGenerateImage(activeSolutionTab, idx, creative)}
                                              disabled={isGeneratingImage[`${activeSolutionTab}-${idx}`]}
                                              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-xs font-bold py-1.5 px-3 rounded-md border border-purple-200 hover:bg-purple-50 disabled:opacity-50"
                                            >
                                              {isGeneratingImage[`${activeSolutionTab}-${idx}`] ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} 
                                              Regenerate
                                            </button>
                                            <a
                                              href={generatedImages[`${activeSolutionTab}-${idx}`]}
                                              download={`ad-creative-${activeSolutionTab}-${idx}.png`}
                                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1.5 px-4 rounded-md shadow-sm transition-all"
                                            >
                                              <Download size={14} /> Download Gambar
                                            </a>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                               </div>
                             ))}
                          </div>
                        </div>

                        {/* Pricing Tiers Selection */}
                        <div className="space-y-3">
                          <h4 className="flex items-center gap-2 font-bold text-slate-800">
                            <div className="p-1.5 bg-blue-100 rounded text-blue-600"><Tag size={16} /></div>
                            Strategi Harga (Pricing Tier)
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {activeSolution.priceTiers && activeSolution.priceTiers.map((tier: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedPriceTier(tier)}
                                className={`p-3 rounded-xl border text-left transition-all relative group ${
                                  selectedPriceTier?.label === tier.label 
                                  ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-md' 
                                  : 'bg-white border-slate-200 hover:border-blue-300'
                                }`}
                              >
                                {idx === 1 && <span className="absolute -top-2 right-2 text-[8px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm z-10">RECOMMENDED</span>}
                                <p className="text-xs text-slate-500 font-semibold uppercase mb-1">{tier.label}</p>
                                <p className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{formatRupiah(tier.price)}</p>
                                <p className="text-[10px] text-slate-600 mt-1 line-clamp-2 min-h-[2.5em] leading-tight">{tier.benefit}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Calculator */}
                      <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 h-fit sticky top-24">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                          <div className="p-1 bg-indigo-100 rounded text-indigo-600"><Calculator size={18} /></div>
                          <h4 className="font-bold text-slate-800">Simulasi Profit Harian</h4>
                        </div>

                        <div className="space-y-6">
                          {/* CPA Selector */}
                          <div>
                            <h5 className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase mb-2">
                              <BarChart2 size={12}/> Pilih Skenario Iklan (CPA)
                            </h5>
                            <div className="grid grid-cols-3 gap-2">
                              {activeSolution.cpaOptions && activeSolution.cpaOptions.map((cpa: any, idx: number) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedCpa(cpa)}
                                  className={`p-2 rounded-lg border text-center transition-all ${
                                    selectedCpa?.label === cpa.label
                                    ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 text-indigo-900'
                                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                                  }`}
                                >
                                  <p className="text-[10px] font-bold truncate">{cpa.label}</p>
                                  <p className="text-xs font-bold mt-0.5">{formatRupiah(cpa.cost)}</p>
                                </button>
                              ))}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1.5 italic">
                              *CPA: {selectedCpa?.desc}
                            </p>
                          </div>

                          {/* Budget Slider */}
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-slate-600 font-medium">Budget Iklan / Hari</span>
                              <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{formatRupiah(budgetSimulation)}</span>
                            </div>
                            <input
                              type="range"
                              min="250000" 
                              max="5000000"
                              step="50000"
                              value={budgetSimulation}
                              onChange={(e) => setBudgetSimulation(parseInt(e.target.value))}
                              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                            />
                          </div>

                          {/* Math Results */}
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                              <p className="text-slate-500 text-xs mb-1">Cost Per Sale</p>
                              <p className="font-bold text-slate-800">{selectedCpa ? formatRupiah(selectedCpa.cost) : '-'}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                              <p className="text-slate-500 text-xs mb-1">Est. Penjualan</p>
                              <p className="font-bold text-slate-800">
                                {selectedCpa ? Math.floor(budgetSimulation / selectedCpa.cost) : 0} pcs
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200 space-y-2">
                             {(() => {
                                const price = selectedPriceTier ? selectedPriceTier.price : 0;
                                const cost = selectedCpa ? selectedCpa.cost : 9999999;
                                const sales = Math.floor(budgetSimulation / cost);
                                const revenue = sales * price;
                                const profit = revenue - budgetSimulation;
                                const isLoss = profit < 0;
                                const roas = budgetSimulation > 0 ? (revenue/budgetSimulation).toFixed(2) : 0;

                                return (
                                  <>
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-slate-600">Omzet</span>
                                      <span className="font-bold text-slate-800">{formatRupiah(revenue)}</span>
                                    </div>
                                    <div className={`p-4 rounded-xl shadow-lg mt-2 ${isLoss ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-600 text-white shadow-green-200'}`}>
                                      <div className="flex justify-between items-center mb-1">
                                        <span className={`text-sm font-medium ${isLoss ? 'text-red-600' : 'text-green-100'}`}>
                                          {isLoss ? 'Potensi Rugi' : 'Profit Bersih'}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isLoss ? 'bg-red-200 text-red-800' : 'bg-green-700'}`}>
                                          ROAS {roas}x
                                        </span>
                                      </div>
                                      <span className="font-bold text-2xl tracking-tight">{formatRupiah(profit)}</span>
                                    </div>
                                  </>
                                )
                             })()}
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
