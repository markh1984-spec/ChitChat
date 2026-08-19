export interface Interest {
  id: string
  label: string
  emoji: string
  category: string
}

export const INTEREST_CATEGORIES = [
  'Outdoors & Nature',
  'Arts & Making',
  'Games & Puzzles',
  'Food & Drink',
  'Music & Performance',
  'Fitness & Sport',
  'Learning & Mind',
  'Community & Volunteering',
  'Home & Collecting',
  'Animals & Family',
] as const

export const INTERESTS: Interest[] = [
  // Outdoors & Nature
  { id: 'gardening', label: 'Gardening', emoji: '🌷', category: 'Outdoors & Nature' },
  { id: 'walking', label: 'Walking Groups', emoji: '🚶', category: 'Outdoors & Nature' },
  { id: 'birdwatching', label: 'Birdwatching', emoji: '🐦', category: 'Outdoors & Nature' },
  { id: 'fishing', label: 'Fishing', emoji: '🎣', category: 'Outdoors & Nature' },
  { id: 'wildlife', label: 'Wildlife Watching', emoji: '🦌', category: 'Outdoors & Nature' },
  { id: 'sailing', label: 'Sailing', emoji: '⛵', category: 'Outdoors & Nature' },
  { id: 'kayaking', label: 'Kayaking', emoji: '🛶', category: 'Outdoors & Nature' },
  { id: 'camping', label: 'Camping', emoji: '🏕️', category: 'Outdoors & Nature' },
  { id: 'hiking', label: 'Hillwalking', emoji: '🥾', category: 'Outdoors & Nature' },
  { id: 'climbing', label: 'Climbing', emoji: '🧗', category: 'Outdoors & Nature' },
  { id: 'allotment', label: 'Allotment & Growing Veg', emoji: '🥕', category: 'Outdoors & Nature' },
  { id: 'flower_arranging', label: 'Flower Arranging', emoji: '💐', category: 'Outdoors & Nature' },
  { id: 'beekeeping', label: 'Beekeeping', emoji: '🐝', category: 'Outdoors & Nature' },
  { id: 'composting', label: 'Composting', emoji: '♻️', category: 'Outdoors & Nature' },
  { id: 'stargazing', label: 'Stargazing', emoji: '🌌', category: 'Outdoors & Nature' },
  { id: 'astronomy', label: 'Astronomy', emoji: '🔭', category: 'Outdoors & Nature' },

  // Arts & Making
  { id: 'crafts', label: 'Arts & Crafts', emoji: '🎨', category: 'Arts & Making' },
  { id: 'photography', label: 'Photography', emoji: '📷', category: 'Arts & Making' },
  { id: 'painting', label: 'Painting', emoji: '🖌️', category: 'Arts & Making' },
  { id: 'pottery', label: 'Pottery', emoji: '🏺', category: 'Arts & Making' },
  { id: 'knitting', label: 'Knitting', emoji: '🧶', category: 'Arts & Making' },
  { id: 'sewing', label: 'Sewing', emoji: '🧵', category: 'Arts & Making' },
  { id: 'woodworking', label: 'Woodworking', emoji: '🪚', category: 'Arts & Making' },
  { id: 'quilting', label: 'Quilting', emoji: '🪡', category: 'Arts & Making' },
  { id: 'calligraphy', label: 'Calligraphy', emoji: '🖋️', category: 'Arts & Making' },
  { id: 'papercraft', label: 'Papercraft', emoji: '📜', category: 'Arts & Making' },
  { id: 'jewellery_making', label: 'Jewellery Making', emoji: '💍', category: 'Arts & Making' },
  { id: 'scrapbooking', label: 'Scrapbooking', emoji: '📔', category: 'Arts & Making' },
  { id: 'poetry', label: 'Poetry', emoji: '✍️', category: 'Arts & Making' },
  { id: 'writing', label: 'Writing', emoji: '📝', category: 'Arts & Making' },
  { id: 'art_gallery', label: 'Gallery Visits', emoji: '🖼️', category: 'Arts & Making' },

  // Games & Puzzles
  { id: 'cards', label: 'Cards & Board Games', emoji: '🃏', category: 'Games & Puzzles' },
  { id: 'chess', label: 'Chess', emoji: '♟️', category: 'Games & Puzzles' },
  { id: 'bowling', label: 'Bowling', emoji: '🎳', category: 'Games & Puzzles' },
  { id: 'darts', label: 'Darts', emoji: '🎯', category: 'Games & Puzzles' },
  { id: 'snooker', label: 'Snooker', emoji: '🎱', category: 'Games & Puzzles' },
  { id: 'pub_quiz', label: 'Pub Quiz', emoji: '🧠', category: 'Games & Puzzles' },
  { id: 'jigsaw_puzzles', label: 'Jigsaw Puzzles', emoji: '🧩', category: 'Games & Puzzles' },
  { id: 'crossword', label: 'Crosswords', emoji: '📰', category: 'Games & Puzzles' },
  { id: 'sudoku', label: 'Sudoku', emoji: '🔢', category: 'Games & Puzzles' },
  { id: 'mahjong', label: 'Mahjong', emoji: '🀄', category: 'Games & Puzzles' },
  { id: 'backgammon', label: 'Backgammon', emoji: '🎲', category: 'Games & Puzzles' },
  { id: 'scrabble', label: 'Scrabble', emoji: '🔤', category: 'Games & Puzzles' },

  // Food & Drink
  { id: 'cooking', label: 'Cooking', emoji: '🍳', category: 'Food & Drink' },
  { id: 'baking', label: 'Baking', emoji: '🧁', category: 'Food & Drink' },
  { id: 'wine_tasting', label: 'Wine Tasting', emoji: '🍷', category: 'Food & Drink' },
  { id: 'beer_tasting', label: 'Beer Tasting', emoji: '🍺', category: 'Food & Drink' },
  { id: 'coffee', label: 'Coffee', emoji: '☕', category: 'Food & Drink' },
  { id: 'tea', label: 'Tea', emoji: '🍵', category: 'Food & Drink' },
  { id: 'cheese_making', label: 'Cheese Making', emoji: '🧀', category: 'Food & Drink' },
  { id: 'brewing', label: 'Home Brewing', emoji: '⚗️', category: 'Food & Drink' },

  // Music & Performance
  { id: 'music', label: 'Live Music', emoji: '🎵', category: 'Music & Performance' },
  { id: 'theatre', label: 'Theatre', emoji: '🎭', category: 'Music & Performance' },
  { id: 'cinema', label: 'Cinema', emoji: '🎬', category: 'Music & Performance' },
  { id: 'opera', label: 'Opera', emoji: '🎼', category: 'Music & Performance' },
  { id: 'singing', label: 'Singing', emoji: '🎤', category: 'Music & Performance' },
  { id: 'choir', label: 'Choir', emoji: '🎶', category: 'Music & Performance' },
  { id: 'guitar', label: 'Guitar', emoji: '🎸', category: 'Music & Performance' },
  { id: 'piano', label: 'Piano', emoji: '🎹', category: 'Music & Performance' },
  { id: 'dancing', label: 'Dancing', emoji: '💃', category: 'Music & Performance' },
  { id: 'square_dancing', label: 'Square Dancing', emoji: '🤠', category: 'Music & Performance' },
  { id: 'karaoke', label: 'Karaoke', emoji: '🎙️', category: 'Music & Performance' },
  { id: 'bell_ringing', label: 'Bell Ringing', emoji: '🔔', category: 'Music & Performance' },

  // Fitness & Sport
  { id: 'swimming', label: 'Swimming', emoji: '🏊', category: 'Fitness & Sport' },
  { id: 'yoga', label: 'Yoga', emoji: '🧘', category: 'Fitness & Sport' },
  { id: 'tai_chi', label: 'Tai Chi', emoji: '☯️', category: 'Fitness & Sport' },
  { id: 'cycling', label: 'Cycling', emoji: '🚴', category: 'Fitness & Sport' },
  { id: 'running', label: 'Running', emoji: '🏃', category: 'Fitness & Sport' },
  { id: 'tennis', label: 'Tennis', emoji: '🎾', category: 'Fitness & Sport' },
  { id: 'table_tennis', label: 'Table Tennis', emoji: '🏓', category: 'Fitness & Sport' },
  { id: 'badminton', label: 'Badminton', emoji: '🏸', category: 'Fitness & Sport' },
  { id: 'golf', label: 'Golf', emoji: '⛳', category: 'Fitness & Sport' },
  { id: 'rowing', label: 'Rowing', emoji: '🚣', category: 'Fitness & Sport' },
  { id: 'archery', label: 'Archery', emoji: '🏹', category: 'Fitness & Sport' },
  { id: 'fencing', label: 'Fencing', emoji: '🤺', category: 'Fitness & Sport' },
  { id: 'martial_arts', label: 'Martial Arts', emoji: '🥋', category: 'Fitness & Sport' },
  { id: 'horse_riding', label: 'Horse Riding', emoji: '🐴', category: 'Fitness & Sport' },
  { id: 'meditation', label: 'Meditation', emoji: '🕉️', category: 'Fitness & Sport' },

  // Learning & Mind
  { id: 'history', label: 'Local History', emoji: '🏛️', category: 'Learning & Mind' },
  { id: 'reading', label: 'Book Club', emoji: '📚', category: 'Learning & Mind' },
  { id: 'tech', label: 'Learning Tech', emoji: '💻', category: 'Learning & Mind' },
  { id: 'language_learning', label: 'Learning a Language', emoji: '🗣️', category: 'Learning & Mind' },
  { id: 'genealogy', label: 'Family History', emoji: '🌳', category: 'Learning & Mind' },
  { id: 'local_politics', label: 'Local Affairs', emoji: '🗳️', category: 'Learning & Mind' },
  { id: 'environmental', label: 'Environmental Issues', emoji: '🌍', category: 'Learning & Mind' },

  // Community & Volunteering
  { id: 'volunteering', label: 'Volunteering', emoji: '🤝', category: 'Community & Volunteering' },
  { id: 'church_group', label: 'Faith Group', emoji: '⛪', category: 'Community & Volunteering' },
  { id: 'charity_shop', label: 'Charity Shop Work', emoji: '🛍️', category: 'Community & Volunteering' },
  { id: 'food_bank', label: 'Food Bank Support', emoji: '🥫', category: 'Community & Volunteering' },
  { id: 'neighbourhood_watch', label: 'Neighbourhood Watch', emoji: '👀', category: 'Community & Volunteering' },

  // Home & Collecting
  { id: 'model_trains', label: 'Model Trains', emoji: '🚂', category: 'Home & Collecting' },
  { id: 'coin_collecting', label: 'Coin Collecting', emoji: '🪙', category: 'Home & Collecting' },
  { id: 'stamp_collecting', label: 'Stamp Collecting', emoji: '📮', category: 'Home & Collecting' },
  { id: 'antiques', label: 'Antiques', emoji: '🕰️', category: 'Home & Collecting' },
  { id: 'classic_cars', label: 'Classic Cars', emoji: '🚙', category: 'Home & Collecting' },
  { id: 'motorcycling', label: 'Motorcycling', emoji: '🏍️', category: 'Home & Collecting' },

  // Animals & Family
  { id: 'grandkids', label: 'Grandparenting', emoji: '👨‍👩‍👧', category: 'Animals & Family' },
  { id: 'travel', label: 'Day Trips & Travel', emoji: '🚗', category: 'Animals & Family' },
  { id: 'dog_walking', label: 'Dog Walking', emoji: '🐕', category: 'Animals & Family' },
  { id: 'cat_care', label: 'Cat Care', emoji: '🐈', category: 'Animals & Family' },
]

export function getInterest(id: string): Interest | undefined {
  return INTERESTS.find(i => i.id === id)
}
