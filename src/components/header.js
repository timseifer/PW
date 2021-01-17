import React from "react";
import { useHistory } from 'react-router-dom';

export default function Header() {
  const history = useHistory();
  return (
    <header>
      <div className='header-inner'>
        <button onClick={() =>  history.push('/')}>SEIFERT.</button>
        <nav>
          <ul>
            <li>
              <button onClick={() =>  history.push('/MyStuff')}>My Stuff</button>
            </li>
            <li>
              <button onClick={() =>  history.push('/MyResume')}>My Resume</button>
            </li>
            <li>
              <button onClick={() =>  history.push('/MyContact')}>My Contact</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
