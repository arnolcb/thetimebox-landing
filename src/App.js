import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useTranslations } from './hooks/useTranslations';
import { 
  Target, 
  Brain, 
  Calendar, 
  BarChart3, 
  Sparkles,
  Check,
  Globe,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';

// Componente del logo usando tu SVG
const TimeboxLogo = ({ className = "w-8 h-8" }) => (
  <img 
    src="/logo.svg" 
    alt="Timebox Logo" 
    className={className}
  />
);

// Componente mejorado para el selector de idioma sin emojis
const LanguageSelector = ({ language, setLanguage, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' }
  ];
  
  const currentLanguage = languages.find(lang => lang.code === language);
  
  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  return (
    <div className="relative language-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none ${
          isDarkMode 
            ? 'bg-slate-800 hover:bg-slate-700 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>{currentLanguage?.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute top-full mt-2 right-0 rounded-lg border shadow-lg overflow-hidden z-50 min-w-[120px] ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left flex items-center justify-between text-sm transition-colors duration-200 focus:outline-none ${
                isDarkMode 
                  ? 'hover:bg-slate-700 text-white' 
                  : 'hover:bg-gray-50 text-gray-900'
              } ${language === lang.code ? (isDarkMode ? 'bg-slate-700' : 'bg-gray-50') : ''}`}
            >
              <span>{lang.name}</span>
              {language === lang.code && (
                <Check className="w-4 h-4 text-blue-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TimeboxLanding = () => {
  const { language, setLanguage, t } = useTranslations();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const blurTextRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elementsToObserve = [blurTextRef.current, featuresRef.current, pricingRef.current];
    elementsToObserve.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Features data con iconos mejorados
  const featuresData = [
    {
      icon: <Target className="w-6 h-6" />,
      title: t.topPriorities,
      description: t.topPrioritiesDesc,
      color: "blue"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: t.brainDump,
      description: t.brainDumpDesc,
      color: "purple"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: t.smartSchedule,
      description: t.smartScheduleDesc,
      color: "green"
    }
  ];

  const additionalFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t.smartMetrics,
      description: t.smartMetricsDesc,
      color: "blue"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: t.aiAdvice,
      description: t.aiAdviceDesc,
      color: "purple"
    }
  ];

  // Free plan features con mejores iconos de check
  const freePlanFeatures = [
    "7 timeboxing sheets",
    "All basic features", 
    "Delete sheets to create new ones",
    "Full web access"
  ];

  // Premium plan features con mejores iconos de check
  const premiumPlanFeatures = [
    "Unlimited timeboxing sheets",
    "Advanced metrics and statistics",
    "Personalized AI recommendations",
    "Productivity pattern analysis",
    "Data export",
    "Priority support"
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-white' 
        : 'bg-white text-gray-900'
    } relative`}>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled 
          ? (isDarkMode 
              ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 shadow-lg' 
              : 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg')
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-blue-500">
              <TimeboxLogo />
            </div>
            <span className="text-xl font-semibold hidden sm:block">Timebox</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className={`text-sm font-medium hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-200`}
            >
              {t.features}
            </a>
            <a 
              href="#pricing" 
              className={`text-sm font-medium hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-200`}
            >
              {t.pricing}
            </a>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <LanguageSelector 
              language={language} 
              setLanguage={setLanguage} 
              isDarkMode={isDarkMode} 
            />
            
            <a 
              href="https://app.thetimebox.xyz/login" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {t.startFree}
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <LanguageSelector 
              language={language} 
              setLanguage={setLanguage} 
              isDarkMode={isDarkMode} 
            />
            
            <a 
              href="https://app.thetimebox.xyz/login" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {t.startFree}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 opacity-0 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isDarkMode 
                ? 'bg-blue-900/30 text-blue-300 border border-blue-800/30' 
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              {t.tagline}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight opacity-0 animate-fade-in" style={{animationDelay: '0.4s'}}>
            {t.heroTitle}
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              {t.heroTitleHighlight}
            </span>
            <br />
            {t.heroTitleEnd}
          </h1>
          
          <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in`} style={{animationDelay: '0.6s'}}>
            {t.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-0 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <a 
              href="https://www.thetimebox.xyz/app/login" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {t.startFree}
            </a>
          </div>
        </div>
      </section>

      {/* Question Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 blur-text" ref={blurTextRef}>
            {t.questionTitle}
          </h2>
          
          <div className={`p-8 rounded-xl border transition-all duration-300 max-w-4xl mx-auto ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10' 
              : 'bg-gray-50 border-gray-200 hover:shadow-xl'
          }`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t.methodTitle}
            </h3>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              {t.methodDescription}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center animate-counter">
                <div className="text-3xl font-bold text-blue-500 mb-1">3x</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.productiveMore}</div>
              </div>
              <div className="text-center animate-counter" style={{animationDelay: '0.2s'}}>
                <div className="text-3xl font-bold text-purple-500 mb-1">-50%</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.lessStress}</div>
              </div>
              <div className="text-center animate-counter" style={{animationDelay: '0.4s'}}>
                <div className="text-3xl font-bold text-green-500 mb-1">+2h</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.freeTimeDay}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4" ref={featuresRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.featuresTitle}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block">
                {t.featuresHighlight}
              </span>
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              {t.featuresDescription}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuresData.map((feature, index) => (
              <div key={index} className={`feature-card p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 hover:shadow-2xl hover:shadow-blue-500/10' 
                  : 'bg-white border-gray-200 hover:shadow-xl'
              }`}>
                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-all duration-300 ${
                  feature.color === 'blue' ? 'bg-blue-500 text-white' :
                  feature.color === 'purple' ? 'bg-purple-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className={`feature-card p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 hover:shadow-2xl hover:shadow-blue-500/10' 
                  : 'bg-white border-gray-200 hover:shadow-xl'
              }`}>
                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                  feature.color === 'blue' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4" ref={pricingRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.pricingTitle}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block">
                {t.pricingHighlight}
              </span>
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.pricingDescription}
            </p>
          </div>
          
          {/* BREAKPOINT ARREGLADO: Se mantiene en 2 columnas hasta pantallas pequeñas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className={`pricing-card p-8 rounded-xl border transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800/30 border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10' 
                : 'bg-white border-gray-200 hover:shadow-xl'
            }`}>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{t.freePlan}</h3>
                <div className="text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">$0</span>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.freePlanDesc}
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {freePlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://app.thetimebox.xyz/login" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full block text-center py-3 px-4 rounded-lg font-medium border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-700' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                {t.startFree}
              </a>
            </div>
            
            {/* Premium Plan */}
            <div className={`pricing-card p-8 rounded-xl border-2 border-blue-500 relative transition-all duration-300 hover:scale-105 ${
              isDarkMode ? 'bg-slate-800/50 hover:shadow-2xl hover:shadow-blue-500/20' : 'bg-blue-50 hover:shadow-xl'
            }`}>
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                {t.recommended}
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{t.premiumPlan}</h3>
                <div className="text-4xl font-bold mb-1">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">$3</span>
                  <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>/month</span>
                </div>
                <div className="text-sm text-blue-500 mb-2">{t.perDay}</div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.premiumPlanDesc}
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {premiumPlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                Upgrade to Premium
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              30-day money-back guarantee. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="text-blue-500">
                <TimeboxLogo />
              </div>
              <span className="text-xl font-semibold">Timebox</span>
            </div>
            
            <div className={`flex flex-wrap justify-center gap-6 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <a href="#" className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>{t.privacy}</a>
              <a href="#" className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>{t.terms}</a>
              <a href="#" className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>{t.support}</a>
              <a href="#" className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>{t.contact}</a>
              <a href="https://app.thetimebox.xyz/login" className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>{t.login}</a>
            </div>
          </div>
          
          <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-200'} text-center`}>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.footer}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return <TimeboxLanding />;
}

export default App;