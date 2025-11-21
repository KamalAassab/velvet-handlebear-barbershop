'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Haircut',
    date: '',
    time: '',
    notes: ''
  });
  const [errors, setErrors] = useState({
    date: '',
    time: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isValidBusinessDay = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    // Valid days: Tuesday (2) - Friday (5)
    return day >= 2 && day <= 5;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear previous errors for this field
    setErrors({
      ...errors,
      [name]: ''
    });
    
    // Validate date selection
    if (name === 'date' && value) {
      if (!isValidBusinessDay(value)) {
        setErrors({
          ...errors,
          date: 'Please select a date between Tuesday and Friday. We are closed on Monday, Saturday, and Sunday.'
        });
        return;
      }
    }
    
    // Validate time selection
    if (name === 'time' && value) {
      const [hours] = value.split(':').map(Number);
      if (hours < 10 || hours >= 20) {
        setErrors({
          ...errors,
          time: 'Please select a time between 10:00 AM and 8:00 PM.'
        });
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isBusinessOpen = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    // Open: Tuesday (2) - Friday (5), 10 AM - 8 PM
    if (day >= 2 && day <= 5) {
      return hour >= 10 && hour < 20;
    }
    return false;
  };

  const isFormValid = () => {
    // Check all required fields are filled
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      return false;
    }
    
    // Check no errors present
    if (errors.date || errors.time) {
      return false;
    }
    
    // Validate date is a business day
    if (!isValidBusinessDay(formData.date)) {
      return false;
    }
    
    // Validate time is within business hours
    if (formData.time) {
      const [hours] = formData.time.split(':').map(Number);
      if (hours < 10 || hours >= 20) {
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasErrors = false;
    const newErrors = { date: '', time: '' };
    
    // Validate date is a business day
    if (!isValidBusinessDay(formData.date)) {
      newErrors.date = 'Please select a date between Tuesday and Friday.';
      hasErrors = true;
    }
    
    // Validate time is within business hours
    const [hours] = formData.time.split(':').map(Number);
    if (hours < 10 || hours >= 20) {
      newErrors.time = 'Please select a time between 10:00 AM and 8:00 PM.';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    const businessOpen = isBusinessOpen();
    const statusMessage = businessOpen 
      ? "🟢 We're currently open!"
      : "🔴 We're currently closed. We'll respond during business hours (Tue-Fri, 10 AM - 8 PM).";
    
    // Format date for better readability
    const selectedDate = new Date(formData.date);
    const formattedDate = selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Format time for better readability
    const [hour, minute] = formData.time.split(':');
    const formattedTime = new Date(2000, 0, 1, parseInt(hour), parseInt(minute))
      .toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
    
    const message = `Hello Velvet Handlebear! 👋

I would like to book an appointment:

📋 *Booking Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Service: ${formData.service}
• Preferred Date: ${formattedDate}
• Preferred Time: ${formattedTime}

${formData.notes ? `📝 Additional Notes:\n${formData.notes}\n\n` : ''}${statusMessage}

Looking forward to your confirmation!`;

    const whatsappNumber = '15199549333'; // Format: country code + number (no + or spaces)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setShowBookingModal(false);
    setFormData({
      name: '',
      phone: '',
      service: 'Haircut',
      date: '',
      time: '',
      notes: ''
    });
    setErrors({
      date: '',
      time: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-md pt-0 pb-0 md:pt-0 md:pb-0' : 'bg-transparent pt-2 pb-2 md:pt-2 md:pb-8'}`}>
        <div className={`container mx-auto px-4 sm:px-6 transition-all duration-300 ${scrolled ? 'py-2 md:py-0 md:-my-4' : 'py-2 md:py-0'}`}>
          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center justify-center gap-4 sm:gap-8 lg:gap-16 transition-all duration-300 ${scrolled ? 'my-0 py-0 -mt-2 -mb-2' : ''}`}>
            <div className="hidden lg:block">
              <img
                src="https://ext.same-assets.com/3767174725/2270597224.svg"
                alt="Decorative"
                className="w-16 h-8 opacity-70"
                style={{ filter: 'brightness(0) saturate(100%) invert(55%) sepia(12%) saturate(1200%) hue-rotate(65deg) brightness(95%) contrast(90%)' }}
              />
            </div>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[0.25em] text-white/90 hover:text-[#8B9D83] transition-all duration-300 uppercase ${scrolled ? '-my-2' : ''}`}
            >
              STORY
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[0.25em] text-white/90 hover:text-[#8B9D83] transition-all duration-300 uppercase ${scrolled ? '-my-2' : ''}`}
            >
              SERVICES
            </a>
            <img
              src="/favicon.svg"
              alt="Velvet Handlebear Logo"
              className={`h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px] lg:h-[123px] lg:w-[123px] xl:h-[137px] xl:w-[167px] m-0 p-0 block -mx-2 sm:-mx-3 lg:-mx-4 transition-all duration-300 ${scrolled ? 'scale-50' : 'scale-100'}`}
            />
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[0.25em] text-white/90 hover:text-[#8B9D83] transition-all duration-300 uppercase ${scrolled ? '-my-2' : ''}`}
            >
              TEAM
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[0.25em] text-white/90 hover:text-[#8B9D83] transition-all duration-300 uppercase ${scrolled ? '-my-2' : ''}`}
            >
              CONTACT
            </a>
            <div className="hidden lg:block">
              <img
                src="https://ext.same-assets.com/3767174725/2270597224.svg"
                alt="Decorative"
                className="w-16 h-8 opacity-70 scale-x-[-1]"
                style={{ filter: 'brightness(0) saturate(100%) invert(55%) sepia(12%) saturate(1200%) hue-rotate(65deg) brightness(95%) contrast(90%)' }}
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-center relative">
            <img
              src="/favicon.svg"
              alt="Velvet Handlebear Logo"
              className={`h-[70px] w-[70px] sm:h-[80px] sm:w-[80px] transition-all duration-300 ${scrolled ? 'h-[60px] w-[60px] sm:h-[70px] sm:w-[70px]' : 'h-[70px] w-[70px] sm:h-[80px] sm:w-[80px]'}`}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="absolute right-0 text-white/90 hover:text-[#8B9D83] transition-all duration-300 p-2"
              aria-label="Toggle menu"
            >
              <img
                src="/menu.svg"
                alt="Menu"
                className={`w-12 h-15 transition-transform duration-300 ${mobileMenuOpen ? '-rotate-90' : 'rotate-0'}`}
              />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-md border-t border-white/10 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1a1a1a]/95' : 'bg-[#1a1a1a]/98'}`}>
              <div className="flex flex-col py-4 px-4 space-y-4">
                <a
                  href="#story"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[13px] font-normal tracking-[0.25em] text-white/90 hover:text-[#8B9D83] transition-all duration-300 uppercase py-2"
                >
                  STORY
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[13px] font-normal tracking-[0.25em] text-white/90 hover:text-[#8B9D83] transition-all duration-300 uppercase py-2"
                >
                  SERVICES
                </a>
                <a
                  href="#team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[13px] font-normal tracking-[0.25em] text-white/90 hover:text-[#8B9D83] transition-all duration-300 uppercase py-2"
                >
                  TEAM
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[13px] font-normal tracking-[0.25em] text-white/90 hover:text-[#8B9D83] transition-all duration-300 uppercase py-2"
                >
                  CONTACT
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#1a1a1a]"></div>
          <Image
            src="https://ext.same-assets.com/3767174725/765384817.jpeg"
            alt="Barbershop interior"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-transparent to-[#1a1a1a]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-20 sm:py-24 md:py-32 max-w-5xl mx-auto">
          <h1 className="script-font text-[36px] sm:text-[40px] md:text-[50px] lg:text-[65px] xl:text-[80px] leading-none text-[#B5A89A] mb-2 mt-16 sm:mt-20 font-normal">
            Velvet Handlebear
          </h1>
          <h2 className="serif-font text-[50px] sm:text-[60px] md:text-[70px] lg:text-[90px] xl:text-[97px] 2xl:text-[120px] leading-none tracking-[0.08em] text-[#8B9D83] mb-8 sm:mb-12 mt-4 sm:mt-6 font-normal lg:font-bold">
            BARBERSHOP
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.8] max-w-3xl mx-auto mb-8 sm:mb-12 text-white/80 font-light px-2">
            Where timeless grooming meets modern sophistication. Velvet Handlebear is a distinguished men's barbershop dedicated to the art of traditional barbering with a contemporary twist. Our master barbers blend classic techniques with modern style, creating an experience that's both refined and relaxed. Step into our sanctuary of grooming excellence, where every cut, shave, and trim is executed with precision and passion.
          </p>
          <button
            onClick={() => setShowBookingModal(true)}
            className="inline-block border-2 border-[#B5A89A] text-[#B5A89A] px-4 sm:px-6 py-2.5 sm:py-3 text-[12px] sm:text-[13px] md:text-[14px] tracking-[0.25em] uppercase font-normal hover:bg-[#B5A89A] hover:text-[#1a1a1a] transition-all duration-500 hover:scale-105 md:font-bold cursor-pointer"
          >
            BOOK AN APPOINTMENT
          </button>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#1a1a1a] relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center md:justify-end lg:mx-[10px] lg:px-[0px] md:col-span-1">
              <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] animate-roll">
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 320 320">
                    <defs>
                      <path id="circle-text-path" d="M 160,160 m -140,0 a 140,140 0 1,1 280,0 a 140,140 0 1,1 -280,0" />
                    </defs>
                    <text className="fill-[#8B9D83]" fontSize="26" fontFamily="Amarante, cursive" fontWeight="600" letterSpacing="14">
                      <textPath href="#circle-text-path" startOffset="0%">
                        VELVET HANDLEBEAR • BARBERSHOP •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10 animate-roll-reverse">
                  <Image
                    src="/favicon.svg"
                    alt="Favicon"
                    width={180}
                    height={180}
                    className="object-contain w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px]"
                  />
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="md:pl-4 lg:mx-[0px] lg:px-[5px] rounded-[8px] md:col-span-2">
              <p className="text-[#B5A89A] text-[11px] tracking-[0.3em] mb-4 sm:mb-6 uppercase font-normal">STORY</p>
              <h2 className="serif-font text-[28px] sm:text-[32px] md:text-[42px] lg:text-[52px] leading-[1.2] text-[#8B9D83] mb-6 sm:mb-8 font-normal">
                Crafted with passion, refined by tradition...
              </h2>
              <div className="space-y-4 sm:space-y-5 text-[14px] sm:text-[15px] leading-[1.8] text-white/75 font-light">
                <p>
                  Velvet Handlebear was born from a simple philosophy: exceptional grooming should be an experience, not just a service. Our founders envisioned a space where the timeless art of barbering meets contemporary sophistication—a sanctuary where gentlemen can unwind, rejuvenate, and emerge looking their absolute best.
                </p>
                <p>
                  Every detail at Velvet Handlebear tells a story of craftsmanship. From our carefully curated vintage décor to our master barbers' meticulous techniques, we honor the golden age of barbering while embracing modern excellence. Our team comprises seasoned professionals who understand that a great cut isn't just about style—it's about confidence, precision, and the unwavering commitment to making every client feel distinguished. Step into our chair, and experience the difference that true artistry makes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto">
            {/* Column 1 */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery1.webp"
                  alt="Barber giving haircut"
                  className="w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery2.webp"
                  alt="Barber cutting hair"
                  className="w-full h-40 sm:h-52 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery3.webp"
                  alt="Haircut in progress"
                  className="w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 md:mt-8 lg:mt-12">
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery4.webp"
                  alt="Team photo"
                  className="w-full h-40 sm:h-52 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery5.webp"
                  alt="Barber detail"
                  className="w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery6.webp"
                  alt="Barber with client"
                  className="w-full h-40 sm:h-52 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 hidden sm:block">
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery7.webp"
                  alt="Barber working"
                  className="w-full h-52 sm:h-64 md:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery8.webp"
                  alt="Barber portrait"
                  className="w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery9.webp"
                  alt="Barber tools"
                  className="w-full h-40 sm:h-52 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
            </div>

            {/* Column 4 */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 md:mt-8 lg:mt-12 hidden md:block">
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery10.webp"
                  alt="Barber detail work"
                  className="w-full h-40 sm:h-52 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery1.webp"
                  alt="Barber shaving"
                  className="w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery2.webp"
                  alt="Barbershop interior"
                  className="w-full h-40 sm:h-52 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#B5A89A] text-[11px] tracking-[0.3em] mb-4 sm:mb-6 uppercase font-normal">SERVICES</p>
          <h2 className="serif-font text-[32px] sm:text-[38px] md:text-[42px] lg:text-[56px] leading-[1.2] text-[#8B9D83] mb-4 sm:mb-6 font-normal">
            We cut hair, not corners.
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-white/75 max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 font-light px-2">
            First-rate services in haircuts, hot towel shaves, hair treatments, and beard trims. Witty quips and good conversations come standard. Appointment only, walk-ins by chance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-x-16 lg:gap-y-16 max-w-5xl mx-auto">
            {/* Service 1 */}
            <div className="text-center group">
              <div className="script-font text-[70px] sm:text-[80px] md:text-[90px] lg:text-[100px] leading-none text-[#B5A89A] mb-4 sm:mb-6 transition-all duration-500 group-hover:text-[#8B9D83]">
                #1
              </div>
              <h3 className="text-[12px] sm:text-[13px] tracking-[0.25em] mb-3 sm:mb-4 uppercase font-normal">HAIRCUT</h3>
              <p className="text-[#B5A89A] mb-4 sm:mb-5 text-[14px] sm:text-[15px]">$20 - $50</p>
              <p className="text-white/65 text-[13px] sm:text-[14px] leading-[1.7] font-light px-2">
                Consultation, cut, blow dry, and style with premium products. Includes a complimentary hot lather neck shave with straight razor.
              </p>
            </div>

            {/* Service 2 */}
            <div className="text-center group">
              <div className="script-font text-[70px] sm:text-[80px] md:text-[90px] lg:text-[100px] leading-none text-[#B5A89A] mb-4 sm:mb-6 transition-all duration-500 group-hover:text-[#8B9D83]">
                #2
              </div>
              <h3 className="text-[12px] sm:text-[13px] tracking-[0.25em] mb-3 sm:mb-4 uppercase font-normal">BEARD TRIM</h3>
              <p className="text-[#B5A89A] mb-4 sm:mb-5 text-[14px] sm:text-[15px]">$20 - $50</p>
              <p className="text-white/65 text-[13px] sm:text-[14px] leading-[1.7] font-light px-2">
                Consultation, trim, straight razor edging, and hot & cold towel combo. Finished with after-shave, lotion, and your choice of beard oil or balm.
              </p>
            </div>

            {/* Service 3 */}
            <div className="text-center group">
              <div className="script-font text-[70px] sm:text-[80px] md:text-[90px] lg:text-[100px] leading-none text-[#B5A89A] mb-4 sm:mb-6 transition-all duration-500 group-hover:text-[#8B9D83]">
                #3
              </div>
              <h3 className="text-[12px] sm:text-[13px] tracking-[0.25em] mb-3 sm:mb-4 uppercase font-normal">HAIRCUT & BEARD TRIM</h3>
              <p className="text-[#B5A89A] mb-4 sm:mb-5 text-[14px] sm:text-[15px]">Please call for details</p>
              <p className="text-white/65 text-[13px] sm:text-[14px] leading-[1.7] font-light px-2">
                No bad hair days here. Everything you need to stay fresh and so clean. Take it up a notch with a premium, nourishing hair treatment add-on.
              </p>
            </div>

            {/* Service 4 */}
            <div className="text-center group">
              <div className="script-font text-[70px] sm:text-[80px] md:text-[90px] lg:text-[100px] leading-none text-[#B5A89A] mb-4 sm:mb-6 transition-all duration-500 group-hover:text-[#8B9D83]">
                #4
              </div>
              <h3 className="text-[12px] sm:text-[13px] tracking-[0.25em] mb-3 sm:mb-4 uppercase font-normal">HOT TOWEL SHAVE</h3>
              <p className="text-[#B5A89A] mb-4 sm:mb-5 text-[14px] sm:text-[15px]">Please call for details</p>
              <p className="text-white/65 text-[13px] sm:text-[14px] leading-[1.7] font-light px-2">
                Pre-shave lotion massage and hot towel steam for a closer, more comfortable shave. Followed by cold a towel press to close pores and cleanse face, finished with a cooling after-shave tonic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#B5A89A] text-[11px] tracking-[0.3em] mb-4 sm:mb-6 uppercase font-normal">TEAM</p>
          <h2 className="serif-font text-[32px] sm:text-[38px] md:text-[42px] lg:text-[56px] leading-[1.2] text-[#8B9D83] mb-4 sm:mb-6 font-normal">
            Meet the artisans.
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.8] text-white/75 max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 font-light px-2">
            Our master barbers bring years of expertise, passion, and dedication to every service. Each member of the Velvet Handlebear team is committed to delivering exceptional results and creating a memorable experience. Whether you're a longtime client or visiting for the first time, you're in the hands of true professionals.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
            {[
              { name: 'Mitch', img: '/team1.webp' },
              { name: 'Miguel', img: '/team2.webp' },
              { name: 'Tim', img: '/team3.webp' },
              { name: 'JP', img: '/team4.webp' }
            ].map((barber, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="relative w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[220px] transition-all duration-500 group-hover:scale-105">
                  <div className="relative aspect-[3/4] overflow-hidden border-2 border-[#B5A89A]/30 group-hover:border-[#8B9D83] transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <Image
                      src={barber.img}
                      alt={barber.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-[0.3] transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 via-transparent to-transparent"></div>
                  </div>
                  <div className="mt-4 sm:mt-6 text-center">
                    <h3 className="text-[#B5A89A] text-[13px] sm:text-[14px] md:text-[15px] tracking-[0.2em] uppercase font-normal group-hover:text-[#8B9D83] transition-colors duration-300">
                      {barber.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 max-w-6xl mx-auto">
            {/* Map Embed */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=18+Queen+Street+South+Kitchener+ON+N2G+1V6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden relative block cursor-pointer map-container group order-2 md:order-1"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2896.5!2d-80.4928!3d43.4516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3e2c5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s18%20Queen%20St%20S%2C%20Kitchener%2C%20ON%20N2G%201V6!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'none', filter: 'grayscale(100%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Map to Velvet Handlebear Barbershop"
              ></iframe>
              <div className="absolute inset-0 z-10" aria-hidden="true"></div>
            </a>

            {/* Right Column - Contact Info and Hours */}
            <div className="flex flex-col order-1 md:order-2">
              {/* Header */}
              <div className="w-full mb-6 sm:mb-8 md:mb-10">
                <p className="text-[#B5A89A] text-[11px] tracking-[0.3em] mb-4 sm:mb-6 uppercase font-normal">CONTACT</p>
                <h2 className="serif-font text-[32px] sm:text-[38px] md:text-[42px] lg:text-[45px] leading-[1.2] text-[#8B9D83] font-normal">
                  Downtown Kitchener
                </h2>
              </div>

              {/* Hours and Contact Info */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
                {/* Hours */}
                <div className="flex-1 text-white/75 text-[14px] sm:text-[15px] font-light w-full sm:w-auto">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex">
                      <span className="inline-block w-20 sm:w-28">MON:</span>
                      <span>CLOSED</span>
                    </div>
                    <div className="flex">
                      <span className="inline-block w-20 sm:w-28">TUES:</span>
                      <span>10 AM - 8 PM</span>
                    </div>
                    <div className="flex">
                      <span className="inline-block w-20 sm:w-28">WED:</span>
                      <span>10 AM - 8 PM</span>
                    </div>
                    <div className="flex">
                      <span className="inline-block w-20 sm:w-28">THURS:</span>
                      <span>10 AM - 8 PM</span>
                    </div>
                    <div className="flex">
                      <span className="inline-block w-20 sm:w-28">FRI:</span>
                      <span>10 AM - 8 PM</span>
                    </div>
                    <div className="flex">
                      <span className="inline-block w-20 sm:w-28">SAT:</span>
                      <span>CLOSED</span>
                    </div>
                    <div className="flex">
                      <span className="inline-block w-20 sm:w-28">SUN:</span>
                      <span>CLOSED</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex-1 w-full sm:w-auto">
                  <div className="space-y-6 sm:space-y-8 text-white/75 text-[14px] sm:text-[15px] font-light">
                    <div className="leading-[1.8]">
                      <p>18 Queen Street South</p>
                      <p>Kitchener, ON</p>
                      <p>N2G 1V6</p>
                    </div>

                    <p>519-954-9333</p>

                    <p>info@velvethandlebear.com</p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-2 sm:pt-4">
                      <a
                        href="https://www.facebook.com/velvethandlebear/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B5A89A] hover:text-[#8B9D83] transition-colors duration-300 tracking-[0.2em] text-[11px] uppercase font-normal"
                      >
                        FACEBOOK
                      </a>
                      <a
                        href="https://www.instagram.com/velvethandlebear/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B5A89A] hover:text-[#8B9D83] transition-colors duration-300 tracking-[0.2em] text-[11px] uppercase font-normal"
                      >
                        INSTAGRAM
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 sm:py-8 md:py-10 lg:py-[13px] bg-[#1a1a1a]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-4 text-[10px] sm:text-[11px] text-white/40 font-light">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image
                  src="/favicon.svg"
                  alt="Velvet Handlebear Logo"
                  fill
                  className="object-contain opacity-60"
                />
              </div>
              <p className="whitespace-normal sm:whitespace-nowrap">Velvet Handlebear Barbershop. 2024 All Rights Reserved.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-center sm:text-right">
              <a
                href="https://kamal-aassab.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#8B9D83] transition-colors duration-300 whitespace-normal sm:whitespace-nowrap"
              >
                Website Design by Kamal Aassab
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => {
            setShowBookingModal(false);
            setErrors({ date: '', time: '' });
          }}
        >
          <div 
            className="bg-[#1a1a1a] border-2 border-[#B5A89A] rounded-lg max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 md:p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-5">
                <h2 className="serif-font text-[20px] sm:text-[22px] md:text-[24px] text-[#8B9D83] font-normal">
                  Book Appointment
                </h2>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setErrors({ date: '', time: '' });
                  }}
                  className="text-white/60 hover:text-[#B5A89A] transition-colors text-2xl sm:text-3xl min-w-[32px] min-h-[32px] flex items-center justify-center"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[#B5A89A] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#2a2a2a] border border-[#B5A89A]/30 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:border-[#8B9D83] focus:outline-none transition-colors text-sm sm:text-base min-h-[44px]"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[#B5A89A] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#2a2a2a] border border-[#B5A89A]/30 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:border-[#8B9D83] focus:outline-none transition-colors text-sm sm:text-base min-h-[44px]"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Row 2: Service and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Service */}
                  <div>
                    <label className="block text-[#B5A89A] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                      Service *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#2a2a2a] border border-[#B5A89A]/30 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:border-[#8B9D83] focus:outline-none transition-colors text-sm sm:text-base min-h-[44px]"
                    >
                      <option value="Haircut">Haircut ($20 - $50)</option>
                      <option value="Beard Trim">Beard Trim ($20 - $50)</option>
                      <option value="Haircut & Beard Trim">Haircut & Beard Trim</option>
                      <option value="Hot Towel Shave">Hot Towel Shave</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-[#B5A89A] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full bg-[#2a2a2a] border rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:outline-none transition-colors text-sm sm:text-base min-h-[44px] ${
                        errors.date 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#B5A89A]/30 focus:border-[#8B9D83]'
                      }`}
                    />
                    {errors.date ? (
                      <p className="text-red-400 text-[10px] mt-1">
                        {errors.date}
                      </p>
                    ) : (
                      <p className="text-white/50 text-[10px] mt-1">
                        Only Tuesday - Friday available
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Time */}
                  <div>
                    <label className="block text-[#B5A89A] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                      Preferred Time * (10:00 AM - 8:00 PM)
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      min="10:00"
                      max="20:00"
                      className={`w-full bg-[#2a2a2a] border rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:outline-none transition-colors text-sm sm:text-base min-h-[44px] ${
                        errors.time 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#B5A89A]/30 focus:border-[#8B9D83]'
                      }`}
                    />
                    {errors.time && (
                      <p className="text-red-400 text-[10px] mt-1">
                        {errors.time}
                      </p>
                    )}
                  </div>
                  <div></div>
                </div>

                {/* Additional Notes and Business Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Additional Notes */}
                  <div className="flex flex-col">
                    <label className="block text-[#B5A89A] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-[#2a2a2a] border border-[#B5A89A]/30 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:border-[#8B9D83] focus:outline-none transition-colors resize-none text-sm sm:text-base min-h-[80px]"
                      placeholder="Any special requests or preferences..."
                    />
                  </div>

                  {/* Opening Hours Info */}
                  <div className="flex flex-col">
                    <label className="block text-[#B5A89A] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                      Business Hours
                    </label>
                    <div className="bg-[#2a2a2a] border border-[#8B9D83]/30 rounded px-3 sm:px-4 py-2.5 sm:py-3 min-h-[80px] flex flex-col justify-center">
                      <p className="text-white/70 text-[12px] sm:text-[13px] leading-relaxed">
                        Tuesday - Friday: 10 AM - 8 PM<br />
                        Monday, Saturday, Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full border-2 py-3 sm:py-3.5 text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-normal transition-all duration-500 md:font-bold min-h-[44px] ${
                    isFormValid()
                      ? 'border-[#B5A89A] text-[#B5A89A] hover:bg-[#B5A89A] hover:text-[#1a1a1a] hover:scale-105 cursor-pointer'
                      : 'border-gray-600 text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
