const PLANTS = [
  { name: 'Monstera Deliciosa', fact: 'Its leaves develop holes to withstand heavy rain and wind in tropical forests.', emoji: '🌿' },
  { name: 'Venus Flytrap', fact: 'It can count — it needs 2 touches within 20 seconds to snap shut.', emoji: '🪤' },
  { name: 'Bamboo', fact: 'Some species can grow 91cm in a single day — the fastest growing plant on Earth.', emoji: '🎋' },
  { name: 'Baobab Tree', fact: 'Can store up to 120,000 litres of water in its trunk to survive droughts.', emoji: '🌳' },
  { name: 'Corpse Flower', fact: 'Blooms only once every 7-10 years and smells like rotting flesh to attract insects.', emoji: '🌸' },
  { name: 'Welwitschia', fact: 'Some specimens are over 1,500 years old and only ever grow 2 leaves.', emoji: '🌵' },
  { name: 'Sundew', fact: 'Its sticky tentacles move to wrap around insects within seconds of contact.', emoji: '☀️' },
]

export default function PlantOfDay() {
  const plant = PLANTS[new Date().getDay() % PLANTS.length]
  return (
    <div className="potd glass">
      <div className="potd-label">🌟 Plant of the Day</div>
      <div className="potd-content">
        <span className="potd-emoji">{plant.emoji}</span>
        <div>
          <div className="potd-name">{plant.name}</div>
          <div className="potd-fact">{plant.fact}</div>
        </div>
      </div>
    </div>
  )
}