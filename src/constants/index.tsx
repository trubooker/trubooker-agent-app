import { RxDashboard } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
export interface Country {
  name: string;
  telCode: string;
  flag: string;
}

export interface State {
  name: string;
  telCode: string;
}

export interface LinkItem {
  id: number;
  title: string;
  link: string;
  icon: any;
  sublinks?: any[];
}

export const links: LinkItem[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: RxDashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Help & Support",
    icon: IoIosHelpCircleOutline,
    link: "/help",
  },
  {
    id: 3,
    title: "Logout",
    icon: CgLogOut,
    link: "/logout",
  },
];

export const states: State[] = [
  { name: "Abia", telCode: "+234" },
  { name: "Adamawa", telCode: "+234" },
  { name: "Akwa Ibom", telCode: "+234" },
  { name: "Anambra", telCode: "+234" },
  { name: "Bauchi", telCode: "+234" },
  { name: "Bayelsa", telCode: "+234" },
  { name: "Benue", telCode: "+234" },
  { name: "Borno", telCode: "+234" },
  { name: "Cross River", telCode: "+234" },
  { name: "Delta", telCode: "+234" },
  { name: "Ebonyi", telCode: "+234" },
  { name: "Edo", telCode: "+234" },
  { name: "Ekiti", telCode: "+234" },
  { name: "Enugu", telCode: "+234" },
  { name: "Gombe", telCode: "+234" },
  { name: "Imo", telCode: "+234" },
  { name: "Jigawa", telCode: "+234" },
  { name: "Kaduna", telCode: "+234" },
  { name: "Kano", telCode: "+234" },
  { name: "Katsina", telCode: "+234" },
  { name: "Kebbi", telCode: "+234" },
  { name: "Kogi", telCode: "+234" },
  { name: "Kwara", telCode: "+234" },
  { name: "Lagos", telCode: "+234" },
  { name: "Nasarawa", telCode: "+234" },
  { name: "Niger", telCode: "+234" },
  { name: "Ogun", telCode: "+234" },
  { name: "Ondo", telCode: "+234" },
  { name: "Osun", telCode: "+234" },
  { name: "Oyo", telCode: "+234" },
  { name: "Plateau", telCode: "+234" },
  { name: "Rivers", telCode: "+234" },
  { name: "Sokoto", telCode: "+234" },
  { name: "Taraba", telCode: "+234" },
  { name: "Yobe", telCode: "+234" },
  { name: "Zamfara", telCode: "+234" },
];

export const countries: Country[] = [
  {
    name: "Kenya",
    telCode: "+254",
    flag: "https://flagcdn.com/ke.svg",
  },
  {
    name: "Ghana",
    telCode: "+233",
    flag: "https://flagcdn.com/gh.svg",
  },
  {
    name: "Nigeria",
    telCode: "+234",
    flag: "https://flagcdn.com/ng.svg",
  },
  {
    name: "Egypt",
    telCode: "+20",
    flag: "https://flagcdn.com/eg.svg",
  },
  {
    name: "United States",
    telCode: "+1",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    name: "South Africa",
    telCode: "+27",
    flag: "https://flagcdn.com/za.svg",
  },
  {
    name: "Algeria",
    telCode: "+213",
    flag: "https://flagcdn.com/dz.svg",
  },
  {
    name: "Angola",
    telCode: "+244",
    flag: "https://flagcdn.com/ao.svg",
  },
  {
    name: "Benin",
    telCode: "+229",
    flag: "https://flagcdn.com/bj.svg",
  },
  {
    name: "Botswana",
    telCode: "+267",
    flag: "https://flagcdn.com/bw.svg",
  },
  {
    name: "Burkina Faso",
    telCode: "+226",
    flag: "https://flagcdn.com/bf.svg",
  },
  {
    name: "Burundi",
    telCode: "+257",
    flag: "https://flagcdn.com/bi.svg",
  },
  {
    name: "Cameroon",
    telCode: "+237",
    flag: "https://flagcdn.com/cm.svg",
  },
  {
    name: "Cape Verde",
    telCode: "+238",
    flag: "https://flagcdn.com/cv.svg",
  },
  {
    name: "Central African Republic",
    telCode: "+236",
    flag: "https://flagcdn.com/cf.svg",
  },
  {
    name: "Chad",
    telCode: "+235",
    flag: "https://flagcdn.com/td.svg",
  },
  {
    name: "Comoros",
    telCode: "+269",
    flag: "https://flagcdn.com/km.svg",
  },
  {
    name: "Congo (Brazzaville)",
    telCode: "+242",
    flag: "https://flagcdn.com/cg.svg",
  },
  {
    name: "Congo (Kinshasa)",
    telCode: "+243",
    flag: "https://flagcdn.com/cd.svg",
  },
  {
    name: "Djibouti",
    telCode: "+253",
    flag: "https://flagcdn.com/dj.svg",
  },
  {
    name: "Equatorial Guinea",
    telCode: "+240",
    flag: "https://flagcdn.com/gq.svg",
  },
  {
    name: "Eritrea",
    telCode: "+291",
    flag: "https://flagcdn.com/er.svg",
  },
  {
    name: "Eswatini",
    telCode: "+268",
    flag: "https://flagcdn.com/sz.svg",
  },
  {
    name: "Ethiopia",
    telCode: "+251",
    flag: "https://flagcdn.com/et.svg",
  },
  {
    name: "Gabon",
    telCode: "+241",
    flag: "https://flagcdn.com/ga.svg",
  },
  {
    name: "Gambia",
    telCode: "+220",
    flag: "https://flagcdn.com/gm.svg",
  },
  {
    name: "Guinea",
    telCode: "+224",
    flag: "https://flagcdn.com/gn.svg",
  },
  {
    name: "Guinea-Bissau",
    telCode: "+245",
    flag: "https://flagcdn.com/gw.svg",
  },
  {
    name: "Ivory Coast",
    telCode: "+225",
    flag: "https://flagcdn.com/ci.svg",
  },
  {
    name: "Lesotho",
    telCode: "+266",
    flag: "https://flagcdn.com/ls.svg",
  },
  {
    name: "Liberia",
    telCode: "+231",
    flag: "https://flagcdn.com/lr.svg",
  },
  {
    name: "Libya",
    telCode: "+218",
    flag: "https://flagcdn.com/ly.svg",
  },
  {
    name: "Madagascar",
    telCode: "+261",
    flag: "https://flagcdn.com/mg.svg",
  },
  {
    name: "Malawi",
    telCode: "+265",
    flag: "https://flagcdn.com/mw.svg",
  },
  {
    name: "Mali",
    telCode: "+223",
    flag: "https://flagcdn.com/ml.svg",
  },
  {
    name: "Mauritania",
    telCode: "+222",
    flag: "https://flagcdn.com/mr.svg",
  },
  {
    name: "Mauritius",
    telCode: "+230",
    flag: "https://flagcdn.com/mu.svg",
  },
  {
    name: "Morocco",
    telCode: "+212",
    flag: "https://flagcdn.com/ma.svg",
  },
  {
    name: "Mozambique",
    telCode: "+258",
    flag: "https://flagcdn.com/mz.svg",
  },
  {
    name: "Namibia",
    telCode: "+264",
    flag: "https://flagcdn.com/na.svg",
  },
  {
    name: "Niger",
    telCode: "+227",
    flag: "https://flagcdn.com/ne.svg",
  },
  {
    name: "Rwanda",
    telCode: "+250",
    flag: "https://flagcdn.com/rw.svg",
  },
  {
    name: "Sao Tome and Principe",
    telCode: "+239",
    flag: "https://flagcdn.com/st.svg",
  },
  {
    name: "Senegal",
    telCode: "+221",
    flag: "https://flagcdn.com/sn.svg",
  },
  {
    name: "Seychelles",
    telCode: "+248",
    flag: "https://flagcdn.com/sc.svg",
  },
  {
    name: "Sierra Leone",
    telCode: "+232",
    flag: "https://flagcdn.com/sl.svg",
  },
  {
    name: "Somalia",
    telCode: "+252",
    flag: "https://flagcdn.com/so.svg",
  },
  {
    name: "South Sudan",
    telCode: "+211",
    flag: "https://flagcdn.com/ss.svg",
  },
  {
    name: "Sudan",
    telCode: "+249",
    flag: "https://flagcdn.com/sd.svg",
  },
  {
    name: "Tanzania",
    telCode: "+255",
    flag: "https://flagcdn.com/tz.svg",
  },
  {
    name: "Togo",
    telCode: "+228",
    flag: "https://flagcdn.com/tg.svg",
  },
  {
    name: "Tunisia",
    telCode: "+216",
    flag: "https://flagcdn.com/tn.svg",
  },
  {
    name: "Uganda",
    telCode: "+256",
    flag: "https://flagcdn.com/ug.svg",
  },
  {
    name: "Zambia",
    telCode: "+260",
    flag: "https://flagcdn.com/zm.svg",
  },
  {
    name: "Zimbabwe",
    telCode: "+263",
    flag: "https://flagcdn.com/zw.svg",
  },
];

export const notification = [
  {
    id: "1",
    image:
      "https://images.pexels.com/photos/20594698/pexels-photo-20594698/free-photo-of-raised-arm-with-tattoo-over-antenna.png?auto=compress&cs=tinysrgb&w=400&lazy=load",
    title: "Sandy Jay requested access the admin dashboard as an admin",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!",
    created_at: "59 minutes ago",
  },
  {
    id: "2",
    image:
      "https://images.pexels.com/photos/20594698/pexels-photo-20594698/free-photo-of-raised-arm-with-tattoo-over-antenna.png?auto=compress&cs=tinysrgb&w=400&lazy=load",
    title: "Sandy Jay requested access the admin dashboard as an admin",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!",
    created_at: "59 minutes ago",
  },
  {
    id: "3",
    image:
      "https://images.pexels.com/photos/20594698/pexels-photo-20594698/free-photo-of-raised-arm-with-tattoo-over-antenna.png?auto=compress&cs=tinysrgb&w=400&lazy=load",
    title: "Sandy Jay requested access the admin dashboard as an admin",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!",
    created_at: "59 minutes ago",
  },
  {
    id: "4",
    image:
      "https://images.pexels.com/photos/20594698/pexels-photo-20594698/free-photo-of-raised-arm-with-tattoo-over-antenna.png?auto=compress&cs=tinysrgb&w=400&lazy=load",
    title: "Sandy Jay requested access the admin dashboard as an admin",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!",
    created_at: "59 minutes ago",
  },
  {
    id: "5",
    image:
      "https://images.pexels.com/photos/20594698/pexels-photo-20594698/free-photo-of-raised-arm-with-tattoo-over-antenna.png?auto=compress&cs=tinysrgb&w=400&lazy=load",
    title: "Sandy Jay requested access the admin dashboard as an admin",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure alias eos officia fuga rem quo deleniti, corporis ipsum suscipit!",
    created_at: "59 minutes ago",
  },
];

export const Referall = [
  {
    // id: 1,
    name: "Jane Smith",
    status: "5",
  },
  {
    // id: 2,
    name: "Adebayo Grace",
    status: "9",
  },
  {
    // id: 3,
    name: "John Doe",
    status: "Pending",
  },
  {
    // id: 3,
    name: "John Doe",
    status: "Pending",
  },
  {
    // id: 3,
    name: "John Doe",
    status: "Pending",
  },
  {
    // id: 3,
    name: "John Doe",
    status: "Pending",
  },
  {
    // id: 3,
    name: "John Doe",
    status: "Pending",
  },
  {
    // id: 3,
    name: "John Doe",
    status: "Pending",
  },
  {
    // id: 3,
    name: "John Doe",
    status: "Pending",
  },
  {
    // id: 3,
    name: "John Doe",
    status: "Pending",
  },
  {
    // id: 3,
    name: "John Doe",
    status: "Pending",
  },
];
