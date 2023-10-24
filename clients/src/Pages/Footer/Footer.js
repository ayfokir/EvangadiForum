import React from 'react'
// import logo from './evangadi-logo-footer.webp'
import facbook from './facebook-emblem.jpg'
import instagram from './instagram.png'
import youtube from './youtub.png'
import logo from  "./evangadi-logo-footer.png"
import './Footer.css'

function Footer() {
  return (
    
      <div className="Footer">
        <div className="FooterPart1">
          
          {/* <h1>Evangadi Network</h1> */ }
          <div><img src= {logo} /></div>
            <div className='FooterPart1_logo'>
              <img className="FooterPart1__facbooklogo" src={facbook} />
              <img className="FooterPart1__instagramlogo" src={instagram} />
              <img className="FooterPart1__youtubelogo" src={youtube} />
            </div>
          
        </div>

        <div className="FooterPart2">
          <ul>
            <h2>Useful Link</h2>
            <a>
              {" "}
              <li>How it Works</li>{" "}
            </a>
            <a>
              {" "}
              <li>Terms of Service</li>
            </a>
            <a>
              {" "}
              <li>Privacy and Policy</li>
            </a>
          </ul>
        </div>
        <div className="FooterPart3">
          <ul>
            <h2>Contact Info</h2>
            <a>
              {" "}
              <li>Evangadi Networks</li>{" "}
            </a>
            <a>
              {" "}
              <li>ayfotsega19.27@gmail.com</li>
            </a>
            <a>
              {" "}
              <li>+251-941-215-837</li>
            </a>
          </ul>
     
        </div>
      </div>
      
    
  );
}

export default Footer
