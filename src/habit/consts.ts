import {
  RefreshCw,
  Zap,
  CircleCheck,

  SportShoe,
  Dumbbell,
  Footprints,
  Bike,
  WavesHorizontal,

  Brain,
  Book,
  PencilLine,
  Music,
  Headphones,
  Notebook,
  ChessKing,
  Lightbulb,

  Apple,
  Droplet,
  Coffee,
  Pill,
  Salad,
  Beef,
  Broccoli,
  Egg,

  House,
  Shirt,
  ChefHat,
  Sprout,
  ShoppingCart,
  Wrench,
  BrushCleaning,
  Trash2,

  Goal,
  Clock,
  CalendarCheck,
  ListChecks,
  ChartNoAxesCombined,
  Flag,
  Rocket,
  CodeXml,

  Moon,
  Sun,
  Heart,
  Leaf,
  Star,
  Flame,
  Shield,
} from '@lucide/svelte';

export const COLORS = ['#1D9E75', '#7F77DD', '#D85A30', '#BA7517', '#378ADD', '#D4537E'];
export const ALL_ICONS = [
  // Fitness
  { name: 'sport_shoe',       icon: SportShoe },
  { name: 'dumbbell',         icon: Dumbbell },
  { name: 'footprints',       icon: Footprints },
  { name: 'bike',             icon: Bike },
  { name: 'waves_horizontal', icon: WavesHorizontal },

  // Mind
  { name: 'brain',       icon: Brain },
  { name: 'book',        icon: Book },
  { name: 'pencil_line', icon: PencilLine },
  { name: 'music',       icon: Music },
  { name: 'headphones',  icon: Headphones },
  { name: 'notebook',    icon: Notebook },
  { name: 'chess_king',  icon: ChessKing },
  { name: 'lightbulb',   icon: Lightbulb },

  // Food
  { name: 'apple',     icon: Apple },
  { name: 'droplet',   icon: Droplet },
  { name: 'coffee',    icon: Coffee },
  { name: 'pill',      icon: Pill },
  { name: 'salad',     icon: Salad },
  { name: 'beef',      icon: Beef },
  { name: 'broccoli',  icon: Broccoli },
  { name: 'egg',       icon: Egg },

  // Home
  { name: 'house',         icon: House },
  { name: 'shirt',         icon: Shirt },
  { name: 'chef_hat',      icon: ChefHat },
  { name: 'sprout',        icon: Sprout },
  { name: 'shopping_cart', icon: ShoppingCart },
  { name: 'wrench',        icon: Wrench },
  { name: 'brush_cleaning',icon: BrushCleaning },
  { name: 'trash2',        icon: Trash2 },

  // Goals
  { name: 'goal',                 icon: Goal },
  { name: 'clock',                icon: Clock },
  { name: 'calendar_check',       icon: CalendarCheck },
  { name: 'list_checks',          icon: ListChecks },
  { name: 'chart_no_axes_combined', icon: ChartNoAxesCombined },
  { name: 'flag',                 icon: Flag },
  { name: 'rocket',               icon: Rocket },
  { name: 'code_xml',             icon: CodeXml },

  // Misc
  { name: 'moon',   icon: Moon },
  { name: 'sun',    icon: Sun },
  { name: 'heart',  icon: Heart },
  { name: 'leaf',   icon: Leaf },
  { name: 'star',   icon: Star },
  { name: 'flame',  icon: Flame },
  { name: 'shield', icon: Shield },
];

export const ICONS = [
  { name: 'sport_shoe',       icon: SportShoe },
  { name: 'dumbbell',         icon: Dumbbell },
  { name: 'footprints',       icon: Footprints },

  { name: 'brain',       icon: Brain },
  { name: 'book',        icon: Book },
  { name: 'pencil_line', icon: PencilLine },

  { name: 'apple',     icon: Apple },
  { name: 'droplet',   icon: Droplet },
  { name: 'coffee',    icon: Coffee },

  { name: 'house',         icon: House },
  { name: 'shirt',         icon: Shirt },
  { name: 'chef_hat',      icon: ChefHat },

  { name: 'goal',                 icon: Goal },
  { name: 'clock',                icon: Clock },
  { name: 'calendar_check',       icon: CalendarCheck },

  { name: 'moon',   icon: Moon },
  { name: 'sun',    icon: Sun },
  { name: 'heart',  icon: Heart },
];

export const TYPES = [
  { value: 'daily',  label: 'Recurring Foe',   desc: 'Returns on a schedule.',       icon: RefreshCw, bg: 'bg-green-50',  fg: 'text-green-700' },
  { value: 'habit',  label: 'Wielded Power',   desc: 'Strike whenever you choose.',   icon: Zap,     bg: 'bg-blue-50',   fg: 'text-blue-700'  },
  { value: 'todo',   label: 'One-Time Quest', desc: 'Win it once and it\'s gone.',  icon: CircleCheck,  bg: 'bg-red-50',    fg: 'text-red-700'   },
];

export const DAYS = [
  {name: 'M', value: 'monday'},
  {name: 'T', value: 'tuesday'},
  {name: 'W', value: 'wednesday'},
  {name: 'Th', value: 'thursday'},
  {name: 'F', value: 'friday'},
  {name: 'S', value: 'saturday'},
  {name: 'Su', value: 'sunday'},
];

export const DEADLINE_OPTIONS = [
  {label: '(+) Strength gain (eg. drink water)', value: 'buff'},
  {label: '(-) Curse/debuff (eg. smoking)', value: 'nerf'},
  {label: '(+-) Dual nature (eg. snacking)', value: 'none'},
];

export const DUEDATE_OPTIONS = [
  {label: 'Today', value: 'today', date: 0 },
  {label: 'Tomorrow', value: 'tomorrow', date: 1 },
  {label: 'In 3 days', value: '3days', date: 3 },
  {label: 'Next week', value: 'next_week', date: 7 },
  {label: 'Custom', value: 'custom', date: -1 },
];

export const DIFFICULTY = [
  {label: 'Easy', value: 'easy'},
  {label: 'Medium', value: 'medium'},
  {label: 'Hard', value: 'hard'},
];
