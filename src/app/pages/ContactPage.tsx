import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Facebook,
  Linkedin,
  Instagram,
  Sparkles,
  Globe,
} from 'lucide-react';

// 3D Scene component using Three.js (runs inside React)
function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cubesRef = useRef<any[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamic import for Three.js to keep bundle efficient
    import('three').then((THREE) => {
      const scene = new THREE.Scene();
      scene.background = null; // transparent
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 8;
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current?.appendChild(renderer.domElement);

      // Create floating tech cubes / toruses
      const group = new THREE.Group();
      
      // Central glowing torus knot
      const geometry = new THREE.TorusKnotGeometry(1.2, 0.28, 128, 16, 3, 4);
      const material = new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x7f1a1a, emissiveIntensity: 0.6, roughness: 0.3, metalness: 0.8 });
      const knot = new THREE.Mesh(geometry, material);
      group.add(knot);
      
      // Floating cubes
      const cubeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x3b0a0a, emissiveIntensity: 0.3 });
      for (let i = 0; i < 12; i++) {
        const size = 0.2 + Math.random() * 0.2;
        const cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), cubeMat);
        cube.position.x = (Math.random() - 0.5) * 6;
        cube.position.y = (Math.random() - 0.5) * 4;
        cube.position.z = (Math.random() - 0.5) * 5 - 2;
        cube.userData = { speedX: (Math.random() - 0.5) * 0.01, speedY: (Math.random() - 0.5) * 0.01, rotSpeed: 0.005 + Math.random() * 0.01 };
        group.add(cube);
        cubesRef.current.push(cube);
      }
      
      scene.add(group);
      
      // Lights
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(2, 3, 4);
      scene.add(dirLight);
      const backLight = new THREE.PointLight(0xdc2626, 0.5);
      backLight.position.set(-2, 1, -3);
      scene.add(backLight);
      
      let time = 0;
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.008;
        knot.rotation.x = time * 0.6;
        knot.rotation.y = time * 0.8;
        knot.rotation.z = time * 0.4;
        
        cubesRef.current.forEach((cube, idx) => {
          cube.rotation.x += cube.userData.rotSpeed;
          cube.rotation.y += cube.userData.rotSpeed * 1.3;
          cube.position.x += Math.sin(time * 0.8 + idx) * 0.002;
          cube.position.y += Math.cos(time * 0.6 + idx) * 0.002;
        });
        
        camera.position.x += (0 - camera.position.x) * 0.05;
        camera.position.y += (0 - camera.position.y) * 0.05;
        renderer.render(scene, camera);
      };
      
      animate();
      
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
      
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      
      return () => {
        window.removeEventListener('resize', handleResize);
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current?.dispose();
      };
    });
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);
  const scaleParallax = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.98]), { stiffness: 100, damping: 20 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Message sent! (Demo)');
  };

  return (
    <div className="min-h-screen bg-white relative" ref={targetRef}>
      <ThreeBackground />
      <Navigation />
      
      {/* Hero Section with Parallax & 3D integrated */}
      <motion.section 
        style={{ opacity: opacityHero, y: parallaxY }}
        className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50/80 to-white/90 backdrop-blur-sm z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/50 mx-auto relative">
                <MessageSquare className="w-10 h-10 text-white" />
                <motion.div 
                  className="absolute inset-0 rounded-3xl border-2 border-red-400/40"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Get in{' '}
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent relative inline-block">
                Touch
                <Sparkles className="absolute -top-6 -right-8 w-6 h-6 text-red-500 animate-pulse" />
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Ready to transform your career or organization? Let's start the conversation with cutting-edge digital solutions.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section with Hover 3D Parallax cards */}
      <section className="py-20 bg-white/95 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <Globe className="text-red-600" /> Contact Information
                </h2>
                <div className="space-y-6">
                  <ContactCard3D icon={Phone} title="Phone" content="+855(0) 10 879 955" color="from-blue-600 to-cyan-600" delay={0.1} />
                  <ContactCard3D icon={Mail} title="Email" content="academy@aditi.com.kh" color="from-red-600 to-rose-600" delay={0.2} />
                  <ContactCard3D icon={MapPin} title="Location" content="Phnom Penh, Cambodia" color="from-green-600 to-emerald-600" delay={0.3} />
                  <ContactCard3D icon={Clock} title="Business Hours" content="Mon - Sun: 8:00 AM - 5:00 PM" color="from-purple-600 to-violet-600" delay={0.4} />
                </div>
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <SocialButton3D icon={Facebook} href="#" label="Facebook" delay={0.1} />
                    <SocialButton3D icon={Linkedin} href="#" label="LinkedIn" delay={0.2} />
                    <SocialButton3D icon={Instagram} href="#" label="Instagram" delay={0.3} />
                    <SocialButton3D icon={Send} href="#" label="Telegram" delay={0.4} />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-3"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl opacity-20 group-hover:opacity-40 blur-2xl transition-all duration-700" />
                <div className="relative bg-white border border-gray-200 rounded-3xl p-8 hover:border-red-300 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField label="Full Name *" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} type="text" />
                      <InputField label="Email Address *" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} type="email" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField label="Phone Number" value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} type="tel" />
                      <InputField label="Subject *" value={formData.subject} onChange={(v) => setFormData({...formData, subject: v})} type="text" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 resize-none"
                        required
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 35px -10px rgba(220,38,38,0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl font-semibold shadow-xl flex items-center justify-center gap-2 group"
                    >
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section with Parallax */}
      <motion.section 
        style={{ scale: scaleParallax }}
        className="py-20 bg-gray-50/80 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl opacity-20 blur-2xl" />
            <div className="relative bg-white border border-gray-200 rounded-3xl p-4 overflow-hidden hover:shadow-xl transition">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative">
                <div className="text-center z-10">
                  <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
                  <p className="text-gray-800 font-bold text-lg">Phnom Penh, Cambodia</p>
                  <p className="text-gray-500">Innovation Hub — Let's meet</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

// Helper Components with 3D hover, delay animations
function ContactCard3D({ icon: Icon, title, content, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ x: 8, y: -4, transition: { delay: 0 } }}
      className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-red-100/50 transition-all duration-300 cursor-default"
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600">{content}</p>
      </div>
    </motion.div>
  );
}

function SocialButton3D({ icon: Icon, href, label, delay }: any) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.15, y: -6, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border border-gray-200 hover:border-red-500 hover:from-red-50 hover:to-red-100 transition-all duration-300 group"
      aria-label={label}
    >
      <Icon className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
    </motion.a>
  );
}

function InputField({ label, value, onChange, type }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-300"
        required={label.includes('*')}
      />
    </div>
  );
}