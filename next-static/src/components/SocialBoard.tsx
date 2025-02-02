import Image from 'next/image';
import Link from 'next/link';

const SocialBoard = () => {
  return (
    <div className="social-board">
      <div className="profile-image">
        <Link href="/profile">
          <Image src="/images/profile.svg" alt="Profile" width={120} height={120} />
        </Link>
      </div>
      <h2>CONNECT WITH ME</h2>
      <a href="https://github.com/isdhrkit" target="_blank" rel="noopener noreferrer" className="social-link">
        <Image
          src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
          alt="GitHub"
          width={24}
          height={24}
        />
        GitHub
      </a>
      <a href="https://twitter.com/hirokit_0111" target="_blank" rel="noopener noreferrer" className="social-link">
        <Image
          src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg"
          alt="X (Twitter)"
          width={24}
          height={24}
        />
        X (旧Twitter)
      </a>
    </div>
  );
};

export default SocialBoard; 