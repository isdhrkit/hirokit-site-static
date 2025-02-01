import Link from 'next/link';

const SideMenu = () => {
  return (
    <nav className="side-menu">
      <Link href="/roulette/drink" className="menu-button">
        お酒ルーレット
      </Link>
      <Link href="/qa" className="menu-button">
        AI Q&A
      </Link>
    </nav>
  );
};

export default SideMenu; 