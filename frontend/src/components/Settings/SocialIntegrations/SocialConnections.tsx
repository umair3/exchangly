import React, { ReactElement } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

interface ISocialButton {
  icon: ReactElement;
  name: string;
  onClick?: () => void;
  className?: string;
}

const SocialButton = ({ icon, name, onClick, className }: ISocialButton) => {
  return (
    <button
      onClick={onClick}
      className={`w-full max-w-sm  flex items-center justify-center gap-4  py-2 px-8  rounded-full transition text-white text-sm sm:text-md   ${className}`}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </button>
  );
};

const SocialConnections = () => {
  return (
    <div className="w-full max-w-5xl flex flex-col justify-center items-center md:mt-6 gap-4  px-2 md:px-4 py-4 md:py-16">
      <h3 className=" mb-2 text-gray-800 font-semibold text-xl ">
        Social Connections
      </h3>
      <SocialButton
        icon={<FaFacebook className="text-2xl" />}
        name="Connect with Facebook"
        className="bg-facebook/90 hover:bg-facebook"
      />
      <SocialButton
        icon={<FaLinkedin className="text-2xl" />}
        name="Connect with LinkedIn"
        className="bg-linkedIn/90 hover:bg-linkedIn"
      />
      <SocialButton
        icon={<FaTwitter className="text-2xl" />}
        name="Connect with Twitter"
        className="bg-twitter/90 hover:bg-twitter"
      />
      <SocialButton
        icon={<FaInstagram className="text-2xl" />}
        name="Connect with Instgram"
        className="bg-instagram/90 hover:bg-instagram"
      />
      <SocialButton
        icon={<FaReddit className="text-2xl" />}
        name="Connect with Reddit"
        className="bg-reddit/90 hover:bg-reddit"
      />
      <SocialButton
        icon={<FaTiktok className="text-2xl" />}
        name="Connect with Tiktok"
        className="bg-tiktok/90 hover:bg-tiktok"
      />
    </div>
  );
};

export default SocialConnections;
