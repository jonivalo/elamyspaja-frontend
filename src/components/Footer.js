import React from 'react'
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='container-fluid'>
        <span>FOOTER</span>
        <table id="footerTable">
            <tr>Yhteystiedot joko tähän pysyvästi tai linkki sivulle</tr>
            <tr>Tietosuojalauseke -linkki tähän?</tr>
        </table>
      </div>
    </footer>
  )
}