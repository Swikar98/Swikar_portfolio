import { FaGithub, FaLinkedin, FaFacebook, FaBriefcase } from 'react-icons/fa';

export const socialMediaLinks = [
    {
        name: "GitHub",
        icon: <FaGithub size={30} color="#003366" />, 
    },
    {
        name: "LinkedIn",
        icon: <FaLinkedin size={30} color="#003366" />,
        url: "https://www.linkedin.com/in/swikar-singh-a986a3214/"
    },
    {
        name: "Facebook",
        icon: <FaFacebook size={30} color="#003366" />, 
        url: "https://www.facebook.com/yourprofile"
    },
    {
        name: "Upwork",
        icon: <FaBriefcase size={30} color="#003366" />, 
        url: "https://www.upwork.com/freelancers/~01956ed2261f8cceaa"
    }
];

export const popupData = {
    title: "More Information",
    fullText: "Hello, it's me, Swikar! I recently completed my BCA and am passionate about building user-friendly and efficient web applications. Currently, I am working as a frontend developer in Kathmandu, Nepal.",
    contactInfo: "You can reach me at: your-email@example.com" // Add your actual email or contact information here
};



