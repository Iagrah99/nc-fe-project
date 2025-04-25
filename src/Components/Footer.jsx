import ScrollButton from './BackToTop';
import '@fortawesome/fontawesome-free/css/all.css';

const PageFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-slate-900 text-white lg:py-4 py-2">
      <div className="max-w-6xl mx-auto px-4 flex flex-row sm:flex-row justify-between items-center sm:space-y-0">
        
        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/Iagrah99"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <i className="fab fa-github fa-2x"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/ian-graham-357649223/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>

        {/* Scroll to top */}
        <ScrollButton />
      </div>
    </footer>
  );
};

export default PageFooter;
