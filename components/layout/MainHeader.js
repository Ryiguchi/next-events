import Link from "next/link";
import S from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={S.header}>
      <div className={S.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={S.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
