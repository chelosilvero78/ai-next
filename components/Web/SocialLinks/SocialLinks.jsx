import { YouTubeIcon,TwitterIcon,FacebookIcon,LinkedinIcon } from "../../assets/svg";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://www.youtube.com/channel/UCYeXT0aeeCVPjCXqZEiXj-w?sub_confirmation=1"
        className="youtube"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YouTubeIcon />
      </a>
      <a
        href="https://twitter.com/marcesil_"
        className="twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon />
      </a>
      <a
        href="https://www.facebook.com/marcesilveropy"
        className="facebook"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </a>
      <a
        href="https://es.linkedin.com/in/marcesilvero"
        className="linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedinIcon />
      </a>
    </div>
  );
}
