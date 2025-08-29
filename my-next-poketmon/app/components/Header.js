import Image from "next/image";

export default function Header () {
    return (
        <header>
            <h1>
                <Image
                    src="/images/logo-img.svg"
                    alt="로고"
                    width={265}
                    height={35}
                    priority
                ></Image>
            </h1>
            <nav className="menu-box">
                <li className="search">
                    <button type="button">
                        <Image
                            src="/images/search-icon-w.svg"
                            alt="검색"
                            width={32}
                            height={32}
                        ></Image>
                    </button>
                </li>
                <li className="my-scrab">
                    <button type="button">
                        <Image
                            src="/images/favorit-icon-w.svg"
                            alt="나의 카드 콜렉션으로 이동"
                            width={36}
                            height={36}
                        ></Image>
                    </button>
                </li>
            </nav>
        </header>
    )
}