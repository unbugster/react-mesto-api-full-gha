const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer container">
      <p className="footer__copyright">&copy;{currentYear}. Багаев Андрей</p>
    </footer>
  )
};

export default Footer;