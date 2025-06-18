export interface TarotCard {
  id: number;
  name: string;
  image: string;
  meaning: string;
  category: 'major' | 'minor';
  suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
}

export const tarotCards: TarotCard[] = [
  // Major Arcana (22 cards)
  {
    id: 0,
    name: "The Fool",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    meaning: "New beginnings, innocence, spontaneity, a free spirit. The Fool represents the beginning of a journey, taking a leap of faith, and embracing new adventures with an open heart.",
    category: 'major'
  },
  {
    id: 1,
    name: "The Magician",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    meaning: "Manifestation, resourcefulness, power, inspired action. The Magician represents having the tools and ability to manifest your desires into reality through focused will and action.",
    category: 'major'
  },
  {
    id: 2,
    name: "The High Priestess",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
    meaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind. She represents inner wisdom, mystery, and the need to trust your intuition over logic.",
    category: 'major'
  },
  {
    id: 3,
    name: "The Empress",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
    meaning: "Femininity, beauty, nature, nurturing, abundance. The Empress represents fertility, creativity, and the nurturing aspects of motherhood and nature.",
    category: 'major'
  },
  {
    id: 4,
    name: "The Emperor",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
    meaning: "Authority, establishment, structure, a father figure. The Emperor represents leadership, stability, and the masculine principle of order and control.",
    category: 'major'
  },
  {
    id: 5,
    name: "The Hierophant",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
    meaning: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions. The Hierophant represents seeking spiritual guidance and following established traditions.",
    category: 'major'
  },
  {
    id: 6,
    name: "The Lovers",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg",
    meaning: "Love, harmony, relationships, values alignment. The Lovers represent deep connections, moral choices, and the union of opposites in perfect harmony.",
    category: 'major'
  },
  {
    id: 7,
    name: "The Chariot",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
    meaning: "Control, willpower, success, determination. The Chariot represents triumph through maintaining focus and determination in the face of adversity.",
    category: 'major'
  },
  {
    id: 8,
    name: "Strength",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
    meaning: "Strength, courage, persuasion, influence, compassion. This card represents inner strength, gentle control, and the power of love over force.",
    category: 'major'
  },
  {
    id: 9,
    name: "The Hermit",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
    meaning: "Soul searching, seeking inner guidance, looking inward. The Hermit represents introspection, seeking truth, and the wisdom that comes from solitude.",
    category: 'major'
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
    meaning: "Good luck, karma, life cycles, destiny, a turning point. The Wheel represents the cyclical nature of life and the role of fate in our experiences.",
    category: 'major'
  },
  {
    id: 11,
    name: "Justice",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
    meaning: "Justice, fairness, truth, cause and effect, law. Justice represents balance, accountability, and the consequences of our actions coming full circle.",
    category: 'major'
  },
  {
    id: 12,
    name: "The Hanged Man",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
    meaning: "Suspension, restriction, letting go, sacrifice. The Hanged Man represents surrender, new perspectives gained through sacrifice, and spiritual insight.",
    category: 'major'
  },
  {
    id: 13,
    name: "Death",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
    meaning: "Endings, beginnings, change, transformation, transition. Death represents the end of one phase and the beginning of another, transformation and renewal.",
    category: 'major'
  },
  {
    id: 14,
    name: "Temperance",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
    meaning: "Balance, moderation, patience, purpose. Temperance represents finding the middle ground, healing, and the blending of opposites to create harmony.",
    category: 'major'
  },
  {
    id: 15,
    name: "The Devil",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
    meaning: "Bondage, addiction, sexuality, materialism. The Devil represents being trapped by material desires, addictions, or negative patterns that limit spiritual growth.",
    category: 'major'
  },
  {
    id: 16,
    name: "The Tower",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
    meaning: "Sudden change, upheaval, chaos, revelation, awakening. The Tower represents sudden disruption that clears away illusions and false foundations.",
    category: 'major'
  },
  {
    id: 17,
    name: "The Star",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
    meaning: "Hope, faith, purpose, renewal, spirituality. The Star represents hope after hardship, spiritual guidance, and faith in the future.",
    category: 'major'
  },
  {
    id: 18,
    name: "The Moon",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
    meaning: "Illusion, fear, anxiety, subconscious, intuition. The Moon represents confusion, hidden fears, and the need to trust intuition over illusion.",
    category: 'major'
  },
  {
    id: 19,
    name: "The Sun",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
    meaning: "Happiness, success, optimism, vitality. The Sun represents joy, success, positivity, and the achievement of goals with abundant energy.",
    category: 'major'
  },
  {
    id: 20,
    name: "Judgement",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
    meaning: "Judgement, rebirth, inner calling, absolution. Judgement represents spiritual awakening, redemption, and answering a higher calling.",
    category: 'major'
  },
  {
    id: 21,
    name: "The World",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
    meaning: "Completion, accomplishment, travel, fulfillment. The World represents the successful completion of a journey and the achievement of your goals.",
    category: 'major'
  },

  // Minor Arcana - Cups (14 cards)
  {
    id: 22,
    name: "Ace of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Cups01.jpg",
    meaning: "New relationships, compassion, creativity. A new beginning in love, emotions, or spiritual matters. The start of deep emotional fulfillment.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 23,
    name: "Two of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Cups02.jpg",
    meaning: "Unified love, partnership, mutual attraction. A harmonious relationship or partnership built on mutual respect and understanding.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 24,
    name: "Three of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Cups03.jpg",
    meaning: "Celebration, friendship, creativity, community. Joy shared with others, successful collaborations, and the support of friends.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 25,
    name: "Four of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Cups04.jpg",
    meaning: "Meditation, contemplation, apathy, reevaluation. A period of introspection and considering new opportunities that may be overlooked.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 26,
    name: "Five of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cups05.jpg",
    meaning: "Loss, regret, disappointment, pessimism. Focusing on what's been lost rather than what remains. Time to move forward from grief.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 27,
    name: "Six of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/17/Cups06.jpg",
    meaning: "Revisiting the past, childhood memories, innocence, joy. Nostalgia, childhood connections, and simple pleasures from the past.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 28,
    name: "Seven of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Cups07.jpg",
    meaning: "Opportunities, choices, wishful thinking, illusion. Many options available but difficulty choosing. Beware of unrealistic fantasies.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 29,
    name: "Eight of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Cups08.jpg",
    meaning: "Disappointment, abandonment, withdrawal, escapism. Leaving behind what no longer serves you to seek deeper meaning and fulfillment.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 30,
    name: "Nine of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Cups09.jpg",
    meaning: "Contentment, satisfaction, gratitude, luxury. Emotional fulfillment and satisfaction with life's pleasures. The 'wish' card.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 31,
    name: "Ten of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Cups10.jpg",
    meaning: "Happiness, homecoming, fulfillment, emotional stability. Perfect emotional fulfillment, harmonious relationships, and family bliss.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 32,
    name: "Page of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Cups11.jpg",
    meaning: "Creative opportunities, intuitive messages, curiosity, possibility. A young person or new emotional/creative beginning. Trust your intuition.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 33,
    name: "Knight of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Cups12.jpg",
    meaning: "Romance, charm, 'Knight in shining armor', imagination. A romantic dreamer who follows their heart, sometimes impractically.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 34,
    name: "Queen of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Cups13.jpg",
    meaning: "Compassion, calm, comfort, emotional stability. A nurturing, intuitive person who provides emotional support and understanding.",
    category: 'minor',
    suit: 'cups'
  },
  {
    id: 35,
    name: "King of Cups",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Cups14.jpg",
    meaning: "Emotional balance, compassion, diplomacy. A mature person who has mastered their emotions and uses them wisely to help others.",
    category: 'minor',
    suit: 'cups'
  },

  // Minor Arcana - Wands (14 cards)
  {
    id: 36,
    name: "Ace of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Wands01.jpg",
    meaning: "Inspiration, new opportunities, growth. A burst of creative energy and new beginnings in career, creativity, or personal growth.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 37,
    name: "Two of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wands02.jpg",
    meaning: "Future planning, making decisions, leaving comfort zone. Planning for the future and considering new possibilities beyond current circumstances.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 38,
    name: "Three of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wands03.jpg",
    meaning: "Expansion, foresight, overseas opportunities. Long-term planning paying off, expansion of horizons, and leadership in new ventures.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 39,
    name: "Four of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Wands04.jpg",
    meaning: "Celebration, harmony, home, marriage. Achievement of goals, celebration of milestones, and harmony in home and relationships.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 40,
    name: "Five of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Wands05.jpg",
    meaning: "Conflict, disagreements, competition, tension. Struggles and competition that, while challenging, can lead to growth and improvement.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 41,
    name: "Six of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Wands06.jpg",
    meaning: "Success, public recognition, progress, self-confidence. Victory and recognition for your efforts. Leadership and inspiring others.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 42,
    name: "Seven of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Wands07.jpg",
    meaning: "Challenge, competition, protection, perseverance. Standing your ground against opposition. Defending your position and beliefs.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 43,
    name: "Eight of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Wands08.jpg",
    meaning: "Movement, fast paced change, action, alignment. Rapid progress, swift action, and things moving quickly toward their conclusion.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 44,
    name: "Nine of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Tarot_Nine_of_Wands.jpg",
    meaning: "Resilience, courage, persistence, test of faith. Nearly at the end of a challenging journey. Strength to overcome final obstacles.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 45,
    name: "Ten of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Wands10.jpg",
    meaning: "Burden, extra responsibility, hard work, completion. Carrying heavy responsibilities but nearing the completion of a demanding task.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 46,
    name: "Page of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Wands11.jpg",
    meaning: "Inspiration, ideas, discovery, limitless potential. A young person or new creative project full of enthusiasm and potential.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 47,
    name: "Knight of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Wands12.jpg",
    meaning: "Energy, passion, impulsive, adventure. An impulsive, energetic person who acts quickly but may lack long-term planning.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 48,
    name: "Queen of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Wands13.jpg",
    meaning: "Courage, confidence, independence, social butterfly. A confident, charismatic leader who inspires others with their enthusiasm.",
    category: 'minor',
    suit: 'wands'
  },
  {
    id: 49,
    name: "King of Wands",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Wands14.jpg",
    meaning: "Natural-born leader, vision, entrepreneur, honor. A mature leader with vision and the ability to inspire others to achieve great things.",
    category: 'minor',
    suit: 'wands'
  },

  // Minor Arcana - Swords (14 cards)
  {
    id: 50,
    name: "Ace of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Swords01.jpg",
    meaning: "Breakthrough, clarity, sharp mind. A breakthrough moment, new ideas, and mental clarity that cuts through confusion.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 51,
    name: "Two of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Swords02.jpg",
    meaning: "Difficult decisions, weighing options, indecision, stalemate. Being caught between two choices, needing to make a difficult decision.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 52,
    name: "Three of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Swords03.jpg",
    meaning: "Heartbreak, emotional pain, sorrow, grief. Deep emotional pain, heartbreak, and the need to process and heal from loss.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 53,
    name: "Four of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Swords04.jpg",
    meaning: "Rest, relaxation, meditation, contemplation. A period of rest and recovery, taking time to recharge and gain perspective.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 54,
    name: "Five of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Swords05.jpg",
    meaning: "Conflict, dishonor, defeat, betrayal. Conflict where winning comes at a cost. Consider whether victory is worth the price paid.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 55,
    name: "Six of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Swords06.jpg",
    meaning: "Transition, change, rite of passage, releasing baggage. Moving away from difficulty toward calmer waters and better times.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 56,
    name: "Seven of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Swords07.jpg",
    meaning: "Betrayal, deception, getting away with something, stealth. Someone may be acting deceptively or you need to be more strategic.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 57,
    name: "Eight of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Swords08.jpg",
    meaning: "Negative thinking, restricted freedom, imprisonment, victim mentality. Feeling trapped by circumstances or limiting beliefs.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 58,
    name: "Nine of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Swords09.jpg",
    meaning: "Anxiety, worry, fear, depression, nightmares. Mental anguish and worry, often worse than the actual situation. Seek support.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 59,
    name: "Ten of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords10.jpg",
    meaning: "Painful endings, deep wounds, betrayal, loss, crisis. Rock bottom, but also the end of a difficult cycle. Dawn is coming.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 60,
    name: "Page of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Swords11.jpg",
    meaning: "Curiosity, restlessness, mental energy. A young person or new intellectual pursuit. Eager to learn but may lack experience.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 61,
    name: "Knight of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Swords12.jpg",
    meaning: "Ambition, drive, determination, fast thinking. Quick action and direct communication, but may be impulsive or aggressive.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 62,
    name: "Queen of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords13.jpg",
    meaning: "Independence, unbiased judgement, clear boundaries. An independent thinker who values truth and clear communication above all.",
    category: 'minor',
    suit: 'swords'
  },
  {
    id: 63,
    name: "King of Swords",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Swords14.jpg",
    meaning: "Mental clarity, intellectual power, authority, truth. A clear thinker and communicator who uses intellect and logic to lead others.",
    category: 'minor',
    suit: 'swords'
  },

  // Minor Arcana - Pentacles (14 cards)
  {
    id: 64,
    name: "Ace of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Pents01.jpg",
    meaning: "Manifestation, new financial opportunity, abundance. A new opportunity for prosperity, material gain, or career advancement.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 65,
    name: "Two of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Pents02.jpg",
    meaning: "Multiple priorities, time management, prioritization, adaptability. Juggling multiple responsibilities and finding balance in chaos.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 66,
    name: "Three of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents03.jpg",
    meaning: "Collaboration, learning, implementation. Working with others to achieve shared goals. Skill development and craftsmanship.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 67,
    name: "Four of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Pents04.jpg",
    meaning: "Saving money, security, conservatism, scarcity, control. Holding tightly to resources, possibly being too conservative or fearful of loss.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 68,
    name: "Five of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Pents05.jpg",
    meaning: "Financial loss, poverty, lack mindset, isolation, worry. Financial or spiritual poverty, but help is available if you ask for it.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 69,
    name: "Six of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pents06.jpg",
    meaning: "Generosity, charity, community, sharing, gratitude. Giving and receiving in balance. Sharing wealth and resources with others.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 70,
    name: "Seven of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Pents07.jpg",
    meaning: "Long-term view, sustainable results, perseverance, investment. Pausing to assess progress and consider long-term strategy.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 71,
    name: "Eight of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Pents08.jpg",
    meaning: "Apprenticeship, repetitive tasks, mastery, skill development. Dedicating yourself to learning and mastering your craft through practice.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 72,
    name: "Nine of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Pents09.jpg",
    meaning: "Abundance, luxury, self-reliance, financial independence. Enjoying the fruits of your labor and achieving material success through hard work.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 73,
    name: "Ten of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents10.jpg",
    meaning: "Wealth, financial security, family, long-term success, contribution. Lasting wealth and security that benefits future generations.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 74,
    name: "Page of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Pents11.jpg",
    meaning: "Manifestation, financial opportunity, skill development. A young person or new opportunity for learning practical skills and building wealth.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 75,
    name: "Knight of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Pents12.jpg",
    meaning: "Hard work, productivity, routine, conservatism, reliability. A methodical, reliable person who achieves goals through steady effort.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 76,
    name: "Queen of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Pents13.jpg",
    meaning: "Nurturing, practical, providing financially, a working parent. A practical, nurturing person who provides security and comfort for others.",
    category: 'minor',
    suit: 'pentacles'
  },
  {
    id: 77,
    name: "King of Pentacles",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Pents14.jpg",
    meaning: "Financial success, business acumen, security, discipline, abundance. A successful business leader who has achieved material mastery and security.",
    category: 'minor',
    suit: 'pentacles'
  }
];

// Helper function to get a random card
export const getRandomCard = (): TarotCard => {
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  return tarotCards[randomIndex];
};