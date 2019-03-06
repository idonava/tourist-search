import Link from 'next/link'

export default ({ pathname, authenticated, query = false }) =>
  <nav>
    <div className="nav-wrapper grey darken-4">
      <Link prefetch href="/">
        <a className={pathname === "/" && "is-active" && "brand-logo"}>Tourist Search Engine</a>
      </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {authenticated && <li><Link prefetch href="/flickr">
          <a className={pathname === "/flickr" && !query && "is-active"}>Search</a>
        </Link></li>}
        {!authenticated && <li><Link prefetch href="/signin">
          <a className={pathname === "/signin" && !query && "is-active"}>Sign In</a>
        </Link></li>}
        {!authenticated && <li><Link prefetch href="/signup">
          <a className={pathname === "/signup" && !query && "is-active"}>Sign Up</a>
        </Link></li>}
        {authenticated && <li><Link prefetch href="/signout">
          <a className={pathname === "/signout" && !query && "is-active"}>Sign Out</a>
        </Link></li>}
      </ul>
    </div>
  </nav>
  ;