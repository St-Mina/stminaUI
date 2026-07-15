export interface SaintMinaStorySection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
}

export const saintMinaStoryAudio = {
  src: 'assets/audio/stMinaAudio.mp3',
  title: 'Listen to the story of Saint Mina',
} as const;

export const saintMinaStoryIntro =
  "Some saints are given to the Church before they are ever born, promised in answer to a mother's tears. Saint Mina was one of these.";

export const saintMinaStorySections = [
  {
    id: 'son-promised',
    title: 'A Son Promised',
    paragraphs: [
      'His father, Eudoxius, came from the city of Nikiu and served as its governor. He was a capable and honest man, and that was precisely his problem: his own brother grew jealous of him and brought charges against him before the Emperor. But God turned the injustice into a blessing. Rather than punish Eudoxius, the Emperor sent him to Africa and made him governor there, and the people came to love him, for he was merciful and God-fearing.',
      'Eudoxius and his wife, Euphemia, had everything but the one thing they longed for most. They had no children. One year, on the feast of the Virgin Mary at Attribes, Euphemia went to church and watched the other families arrive, the children dressed in their best clothes, standing close to their parents. The sight was almost too much to bear. She sighed, and standing before the icon of Saint Mary, she wept and begged the Mother of God to carry her request to her beloved Son, that He might grant her a child.',
      'Then a voice came from the icon. It said a single word: "Amen."',
      'Euphemia\'s heart leapt. She knew in that moment that the Lord had heard her. When she returned home and told her husband everything, he answered simply, "May God\'s will be done." In time the Lord gave them a son, and they named him Mina, just as the voice had spoken.',
    ],
  },
  {
    id: 'raised-for-god',
    title: 'Raised for God',
    paragraphs: [
      'His parents taught him to read and write and raised him carefully in the faith. But the family did not stay whole for long. When Mina was eleven years old, his father died at a good old age, and three years later his mother followed. Left on his own, Mina gave his life to fasting, prayer, and quiet devotion. The people so loved him, and so honored the memory of his father, that they placed him in his father\'s old position of authority. Yet the honor never pulled him away from his worship.',
    ],
  },
  {
    id: 'vision-desert',
    title: 'The Vision in the Desert',
    paragraphs: [
      'Then the world changed. The Emperor Diocletian turned his back on Christ and commanded everyone to worship idols, and across the empire believers were being put to death for the Name of the Lord. Mina walked away from his position and went out into the desert, where he spent day after day in worship, giving his whole heart to God.',
      'One day the heavens opened before him. He saw the martyrs crowned with beautiful crowns, and he heard a voice say, "He who toils for the Name of the Lord Christ shall receive these crowns." That was all Mina needed to hear. He returned to the very city he had governed and openly confessed his faith in Christ.',
    ],
  },
  {
    id: 'confession-crown',
    title: 'The Confession and the Crown',
    paragraphs: [
      'Because Mina came from a noble family, the authorities did not want to lose him. First they tried persuasion, offering him honors and expensive gifts if he would only give up his faith. When that failed, they turned to threats, and then to torture. The governor did everything in his power to break him and could not. He even sent Mina to his own brother, hoping that family influence might succeed where cruelty had failed, but that failed too.',
      'At last the governor gave the order: Mina was to be beheaded with the sword, his body burned in the fire, and his ashes scattered to the wind so that nothing would remain. But the fire did not obey. The body lay in the flames for three days and three nights and was not harmed.',
    ],
  },
  {
    id: 'sister-sea-beasts',
    title: 'The Sister and the Sea Beasts',
    paragraphs: [
      'Mina\'s sister came and paid the soldiers a great sum of money, and they let her take the body. She wrapped it in a sack woven from palm fronds and set out for Alexandria, just as her brother had advised her before his death. She boarded a ship with his body and began the voyage.',
      'Partway across the water, beasts rose up out of the sea and attacked the ship. The passengers screamed in terror. Mina\'s sister prayed to the Lord and called on her brother to intercede, and as she prayed, fire went out from his body and burned the faces of the beasts. They dove beneath the surface, and when they rose again the fire scorched them once more, until at last they sank down and did not come back up.',
    ],
  },
  {
    id: 'camel-place',
    title: 'The Camel That Chose the Place',
    paragraphs: [
      'When the ship reached Alexandria, the Patriarch himself came out with most of the city to meet it. They carried the holy body with reverence and honor, wrapped it in costly shrouds, and laid it to rest in the church with great celebration.',
      'Once the years of persecution had passed, the angel of the Lord appeared to the honorable Patriarch, Anba Athanasius the Apostolic, with an unusual instruction. The body of Saint Mina was to be placed on a camel and led out of the city, but no one was to guide the animal. They were only to follow it at a distance until it stopped at the place the Lord had chosen. So they walked behind the camel as it made its own way, until it came to a place called Lake Bayad, in the district of Mariout. There a voice was heard: "This is the place where the Lord wishes the body of his beloved Mina to be placed." They lowered the body, set it in a coffin, and laid it to rest in a beautiful garden, and many miracles began to happen there.',
    ],
  },
  {
    id: 'protector-battle',
    title: 'The Protector in Battle',
    paragraphs: [
      'Some time later, the people of Pentapolis, the five cities, rose up against the towns around Alexandria. As the people prepared to face the Berbers in battle, the governor decided to bring the body of Saint Mina along as his protector and deliverer. He took it secretly, and through the saint\'s blessing he defeated the Berbers and came home victorious.',
      'But the governor did not want to give the body back. He intended to carry it on to Alexandria instead of returning it to its resting place. On the way, they passed by Lake Bayad, and there the camel bearing the body knelt down and refused to move, no matter how much it was beaten. They shifted the body onto a second camel, and it too would not budge. Finally the governor understood: this was the Lord\'s own command. He had a coffin made from wood that would not decay, placed the silver coffin inside it, and returned the saint to his resting place. Then he asked for Mina\'s blessing and went home.',
    ],
  },
  {
    id: 'body-found',
    title: 'How the Body Was Found',
    paragraphs: [
      'When the time came for the Lord to reveal where Saint Mina\'s body lay, He did it through the humblest of means. A shepherd was tending his flock in the desert nearby. One day a sheep suffering from mange slipped down into the water of a well close to the saint\'s resting place. When it climbed out and rolled in the sand, it was healed on the spot. The shepherd was astonished. He gathered some of the sand, mixed it with water, and rubbed it on his mangy and ailing sheep, and every one of them was healed.',
    ],
  },
  {
    id: 'emperors-daughter',
    title: "The Emperor's Daughter",
    paragraphs: [
      'Word of these healings spread from country to country, until even the Emperor of Constantinople heard of them. His only daughter suffered from leprosy, and he sent her to the place where the miracles were happening. She asked the shepherd how it all came about, then took some of the sand, moistened it with water, spread it over her body, and slept there for the night. As she slept, Saint Mina appeared to her and said, "Arise early and dig in this place, and you will find my body." When she woke, she found herself completely healed. She began to dig where he had told her, and there she uncovered the holy body.',
      'She sent word to her father, and the Emperor was overjoyed. He thanked the Lord and glorified His Name, then sent men and money to build a church on that very spot. It was consecrated on the fifteenth day of the month of Baounah.',
    ],
  },
  {
    id: 'city-saint-mina',
    title: 'The City of Saint Mina',
    paragraphs: [
      'Later, during the reign of Arcadius and Honorius, a city was ordered to be built there, and crowds streamed to the church to ask for the intercession of the blessed Saint Mina. The Lord honored him with countless signs and wonders that flowed from his pure body. In time, when the Arabs came to Egypt, some of them attacked the city, and the church was torn down until only ruins were left.',
      'Centuries later the story took a new turn. When the late Pope Abba Kyrillos the Sixth was ordained Patriarch over the See of Saint Mark, he devoted himself to building a great monastery in this same region of Mariout, in the name of Saint Mina, and he spent a great deal to establish it. Today the monastery holds many churches, visited by countless Orthodox faithful who come to pray and to receive a blessing. He bought a hundred acres of land, built a fence around it, and ordained a community of monks known for their deep learning, both religious and scientific.',
    ],
  },
] as const satisfies readonly SaintMinaStorySection[];

export const saintMinaStoryClosing =
  'The intercession of Mari-Mina be with us, and glory be to our God forever. Amen.';
