/* Quote data. Each Buddha entry: [text, source]. Each Stoic entry: [text, author, source]. */
var BUDDHA = [
  ["All that we are is the result of what we have thought: it is founded on our thoughts, it is made up of our thoughts.", "Dhammapada 1"],
  ["If a man speaks or acts with a pure thought, happiness follows him, like a shadow that never leaves him.", "Dhammapada 2"],
  ["Hatred does not cease by hatred at any time. Hatred ceases by love. This is an old rule.", "Dhammapada 5"],
  ["It is good to tame the mind, which is difficult to hold in and flighty, rushing wherever it likes. A tamed mind brings happiness.", "Dhammapada 35"],
  ["Wise people shape themselves, as engineers guide water, as fletchers straighten the arrow, as carpenters shape wood.", "Dhammapada 80"],
  ["If one man conquer in battle a thousand times a thousand men, and another conquer himself, he is the greatest of conquerors.", "Dhammapada 103"],
  ["Self is the lord of self. Who else could be the lord?", "Dhammapada 160"],
  ["By oneself evil is done, by oneself one suffers. By oneself evil is left undone, by oneself one is purified. No one can purify another.", "Dhammapada 165"],
  ["Not to do any evil, to cultivate good, to purify one's mind: this is the teaching of the Buddhas.", "Dhammapada 183"],
  ["Health is the greatest gift, contentment the greatest wealth, trust the best of relations.", "Dhammapada 204"],
  ["Let a man overcome anger by love, let him overcome evil by good, let him overcome the greedy by generosity, the liar by truth.", "Dhammapada 223"],
  ["You yourselves must make the effort. The Buddhas only point the way.", "Dhammapada 276"],
  ["From meditation springs wisdom. Without meditation, wisdom is lost.", "Dhammapada 282"]
];

var STOIC = [
  ["No longer talk at all about the kind of man that a good man ought to be, but be such.", "Marcus Aurelius", "Meditations 10.16"],
  ["Such as are thy habitual thoughts, such also will be the character of thy mind, for the soul is dyed by the thoughts.", "Marcus Aurelius", "Meditations 5.16"],
  ["If it is not right, do not do it. If it is not true, do not say it.", "Marcus Aurelius", "Meditations 12.17"],
  ["The best way of avenging thyself is not to become like the wrong doer.", "Marcus Aurelius", "Meditations 6.6"],
  ["Look within. Within is the fountain of good, and it will ever bubble up, if thou wilt ever dig.", "Marcus Aurelius", "Meditations 7.59"],
  ["Begin the morning by saying to thyself: I shall meet with the busybody, the ungrateful, the arrogant, the deceitful, the envious, the unsocial.", "Marcus Aurelius", "Meditations 2.1"],
  ["Hold every hour in your grasp. Lay hold of today's task, and you will not need to depend so much upon tomorrow's.", "Seneca", "Letters to Lucilius 1"],
  ["Nothing is a better proof of a well-ordered mind than a man's ability to stop just where he is and pass some time in his own company.", "Seneca", "Letters to Lucilius 2"],
  ["We suffer more often in imagination than in reality.", "Seneca", "Letters to Lucilius 13"],
  ["He suffers more than necessary, who suffers before it is necessary.", "Seneca", "Letters to Lucilius 13"],
  ["If you live according to nature, you will never be poor. If you live according to opinion, you will never be rich.", "Seneca", "Letters to Lucilius 16"],
  ["Of things, some are in our power, and others are not.", "Epictetus", "Enchiridion 1"],
  ["Men are disturbed, not by the things which happen, but by the opinions about the things.", "Epictetus", "Enchiridion 5"],
  ["Do not seek that the things which happen should happen as you wish. Wish the things which happen to be as they are, and you will have a tranquil flow of life.", "Epictetus", "Enchiridion 8"],
  ["It is impossible to begin to learn that which a man thinks he already knows.", "Epictetus", "Discourses 2.17"]
];

var FILTERS = ["All", "Marcus Aurelius", "Seneca", "Epictetus"];
