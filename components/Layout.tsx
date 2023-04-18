// Next API
import Link from 'next/link';

// React API
import { PropsWithChildren } from 'react';

// Components
import Navigation from 'components/Navigation';
import LanguageSelect from 'components/LanguageSelect';

// MUI
import Box from '@mui/system/Box';

const Layout = ({children} : PropsWithChildren) => {
  const Borderline = () : JSX.Element => (
    <section className="auto_align_center full_width side_padding pc_only_padding">
      <hr className="vertical_block_margin border-line" />
    </section>
  );

  return (
    <div className="container">
      <header className="auto_align_center full_width side_padding">
        <Link href={{pathname:process.env.HomeDir}}>Heez in a Park</Link>
      </header>

      <Borderline />

      <Box
        component="nav"
        sx={{
          display: 'inline-flex',
        }}
        className="auto_align_center full_width side_padding"
      >
        <Navigation
          sx={{
            flexGrow: 1,
          }}
        >
          <Link key="article" href="/article/[id]" as="/article/18">
            About
          </Link>
          <Link key="tag" href="/tag">
            Tags
          </Link>
        </Navigation>
        <LanguageSelect />
      </Box>

      <main className="auto_align_center full_width side_padding">
        {children}
      </main>

      <Borderline />

      <footer className="auto_align_center full_width side_padding">
        <section className="contact">
          <p>Contact</p>
          <p>gmldls94@gmail.com</p>
          <p>
            <a
              href="https://github.com/Heein-Park"
              rel="noreferrer"
              target="_blank"
            >
              github.com/Heein-Park
            </a>
          </p>
        </section>

        <section className="info">
          <p className="info_title">Info</p>
          <p>
            <a
              href="https://fonts.google.com/specimen/Averia+Serif+Libre"
              rel="noreferrer"
              target="_blank"
            >
              <em>Averia Libre Serif</em>
            </a>{' '}
            by Dan Sayer
            <br />
            <a
              href="https://fonts.google.com/noto/specimen/Noto+Serif+KR?noto.query=noto+serif+kr"
              rel="noreferrer"
              target="_blank"
            >
              <em>Noto Serif Korean</em>
            </a>{' '}
            From Google Fonts
            <br />A Theme{' '}
            <Link href="/article/3" as="/article/3">
              <em>Bureaucracy</em>
            </Link>{' '}
            by Heein Park
            <br />
            Developed with{' '}
            <a href="https://nextjs.org/" rel="noreferrer" target="_blank">
              <em>Next.js</em>
            </a>{' '}
            & Deployed in{' '}
            <a href="https://vercel.com/" rel="noreferrer" target="_blank">
              <em>Vercel</em>
            </a>
            <br />
          </p>
        </section>
      </footer>
    </div>
  );
};

export default Layout;
