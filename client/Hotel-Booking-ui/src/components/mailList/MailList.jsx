import "./mailList.css";

export default function MailList() {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send best deals for you</span>
      <div className="mailInputContainer">
        <input type="email" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}
