import React from "react";

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <a href='/#/' className='logo'>SEIFERT.</a>
        <nav>
          <ul>
            <li>
              <a href='/#/MyStuff'>My Stuff</a>
            </li>
            <li>
              <a href='/#/MyResume'>My Resume</a>
            </li>
            <li>
              <a href='/#/MyContact'>My Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
