import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Project from './pages/Project';
import AnimatedBlobs from './components/AnimatedBlobs';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="relative min-h-screen bg-zinc-950 overflow-hidden">
          <Helmet>
            <title>Mithul | Portfolio</title>
            <meta name="description" content="Welcome to my portfolio. Explore my projects and skills." />
            <meta property="og:title" content="Mithul | Portfolio" />
            <meta property="og:description" content="Welcome to my portfolio. Explore my projects and skills." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://yourdomain.com" />
            <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Mithul | Portfolio" />
            <meta name="twitter:description" content="Welcome to my portfolio. Explore my projects and skills." />
            <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />
          </Helmet>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950"></div>
          <AnimatedBlobs />
          <div className="relative z-10">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/project/:slug" element={<Project />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
