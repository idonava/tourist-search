import Link from 'next/link'

export default ({ pathname, authenticated, query = false }) =>
  <nav>
    <div className="nav-wrapper grey darken-4">
      <Link prefetch href="/">
        <a className="brand-logo">Tourist Search Engine</a>
      </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {authenticated && <li><Link prefetch href="/flickr">
          <a >Search</a>
        </Link></li>}
        {!authenticated && <li><Link prefetch href="/signin">
          <a >Sign In</a>
        </Link></li>}
        {!authenticated && <li><Link prefetch href="/signup">
          <a >Sign Up</a>
        </Link></li>}
        {authenticated && <li><Link prefetch href="/signout">
          <a >Sign Out</a>
        </Link></li>}
      </ul>
    </div>
  </nav>
  ;