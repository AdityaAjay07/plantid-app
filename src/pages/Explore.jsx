import { useState, useEffect } from 'react'

const KERALA_PLANTS = [
  { name: 'Hibiscus', scientific: 'Hibiscus rosa-sinensis', emoji: '🌺', color: '#E24B4A', family: 'Malvaceae', origin: 'Tropical Asia', climate: 'Tropical', water: 'Daily', sunlight: 'Full sun', soil: 'Well-drained loamy', toxic: false, description: 'The hibiscus is Kerala\'s most iconic flower, found in every garden and temple. Its vibrant red blooms are offered in worship and used in Ayurvedic medicine for hair care.', facts: ['Used in Ayurveda for hair growth', 'State flower of Malaysia', 'Blooms last only one day', 'Edible — used in herbal teas'], tags: ['Common', 'Medicinal', 'Ornamental'] },
  { name: 'Coconut Palm', scientific: 'Cocos nucifera', emoji: '🌴', color: '#1D9E75', family: 'Arecaceae', origin: 'Indo-Pacific', climate: 'Tropical coastal', water: 'Moderate', sunlight: 'Full sun', soil: 'Sandy loam', toxic: false, description: 'Kerala literally means "Land of Coconuts". Every part of the coconut palm is used — from the fruit for cooking and drinking, to the leaves for thatching, and the wood for furniture.', facts: ['Kerala\'s state tree', 'Used in over 200 products', 'Takes 6-10 years to first fruit', 'Can live for 100 years'], tags: ['Endemic', 'Edible', 'Cultural'] },
  { name: 'Tulsi', scientific: 'Ocimum tenuiflorum', emoji: '🌿', color: '#639922', family: 'Lamiaceae', origin: 'Indian Subcontinent', climate: 'Tropical', water: 'Moderate', sunlight: 'Full to partial sun', soil: 'Fertile well-drained', toxic: false, description: 'Holy Basil is sacred in Hindu culture and found in almost every Kerala household. It has powerful medicinal properties used in Ayurveda for centuries.', facts: ['Sacred in Hinduism', 'Natural mosquito repellent', 'Boosts immunity', 'Anti-bacterial properties'], tags: ['Sacred', 'Medicinal', 'Common'] },
  { name: 'Banana', scientific: 'Musa paradisiaca', emoji: '🍌', color: '#EF9F27', family: 'Musaceae', origin: 'Southeast Asia', climate: 'Tropical humid', water: 'Regular', sunlight: 'Full sun', soil: 'Rich moist loam', toxic: false, description: 'Kerala is famous for its many varieties of banana. The Nendran banana is especially prized. Banana leaves are used as plates for traditional feasts called Sadya.', facts: ['Kerala has 40+ banana varieties', 'Banana is a herb not a tree', 'Nendran banana is a GI product', 'Leaves used for Onam Sadya'], tags: ['Edible', 'Cultural', 'Endemic'] },
  { name: 'Jackfruit', scientific: 'Artocarpus heterophyllus', emoji: '🌳', color: '#BA7517', family: 'Moraceae', origin: 'Western Ghats', climate: 'Tropical', water: 'Moderate', sunlight: 'Full sun', soil: 'Deep well-drained', toxic: false, description: 'The jackfruit is Kerala\'s state fruit and the world\'s largest tree-borne fruit. It is used in many traditional dishes and is popular worldwide as a meat substitute.', facts: ['Kerala\'s state fruit', 'World\'s largest tree fruit', 'Popular vegan meat substitute', 'Seeds are edible when roasted'], tags: ['State Fruit', 'Edible', 'Endemic'] },
  { name: 'Neem', scientific: 'Azadirachta indica', emoji: '🍃', color: '#3B6D11', family: 'Meliaceae', origin: 'Indian Subcontinent', climate: 'Tropical dry', water: 'Low', sunlight: 'Full sun', soil: 'Any well-drained', toxic: false, description: 'Neem is called the "village pharmacy" in India. Every part of the neem tree has medicinal value used in Ayurvedic medicine for over 4,000 years.', facts: ['Used for 4000+ years in Ayurveda', 'Natural pesticide', 'All parts are medicinal', 'Purifies air effectively'], tags: ['Medicinal', 'Ayurvedic', 'Common'] },
  { name: 'Black Pepper', scientific: 'Piper nigrum', emoji: '⚫', color: '#444441', family: 'Piperaceae', origin: 'Kerala, India', climate: 'Tropical humid', water: 'Regular', sunlight: 'Partial shade', soil: 'Rich humus-rich', toxic: false, description: 'Kerala is the birthplace of black pepper, the "King of Spices". It was so valuable it was used as currency and drove European exploration of spice trade routes.', facts: ['Native to Kerala\'s Western Ghats', 'Once used as currency', 'Drove European spice trade', 'World\'s most traded spice'], tags: ['Spice', 'Endemic', 'Historic'] },
  { name: 'Cardamom', scientific: 'Elettaria cardamomum', emoji: '🌱', color: '#5DCAA5', family: 'Zingiberaceae', origin: 'Western Ghats', climate: 'Tropical highland', water: 'High', sunlight: 'Partial shade', soil: 'Rich well-drained', toxic: false, description: 'Cardamom is the "Queen of Spices" and Kerala\'s Idukki district is famous for its cardamom plantations filling the hills with sweet fragrance.', facts: ['Queen of Spices', 'Idukki is cardamom capital', 'Third most expensive spice', 'Used in Ayurvedic medicine'], tags: ['Spice', 'Endemic', 'Highland'] },
  { name: 'Turmeric', scientific: 'Curcuma longa', emoji: '🟡', color: '#EF9F27', family: 'Zingiberaceae', origin: 'South Asia', climate: 'Tropical', water: 'Regular', sunlight: 'Partial shade', soil: 'Loamy well-drained', toxic: false, description: 'Known as the "Golden Spice", turmeric is used in every Kerala kitchen and is a cornerstone of Ayurvedic healing with powerful anti-inflammatory properties.', facts: ['Contains curcumin — powerful anti-inflammatory', 'Used in Kerala for 4000+ years', 'Natural antiseptic', 'Used in traditional ceremonies'], tags: ['Spice', 'Medicinal', 'Cultural'] },
  { name: 'Aloe Vera', scientific: 'Aloe barbadensis miller', emoji: '🌵', color: '#9FE1CB', family: 'Asphodelaceae', origin: 'Arabian Peninsula', climate: 'Tropical dry', water: 'Low', sunlight: 'Full sun', soil: 'Sandy well-drained', toxic: false, description: 'Aloe Vera is widely grown across Kerala for its incredible medicinal properties. The gel inside its thick leaves soothes burns and treats skin conditions.', facts: ['Gel soothes sunburns instantly', '99% water inside the leaf', 'Used in Ayurveda for centuries', 'Boosts immune system'], tags: ['Medicinal', 'Common', 'Ayurvedic'] },
  { name: 'Jasmine', scientific: 'Jasminum sambac', emoji: '🤍', color: '#D3D1C7', family: 'Oleaceae', origin: 'South Asia', climate: 'Tropical', water: 'Regular', sunlight: 'Full sun', soil: 'Well-drained fertile', toxic: false, description: 'Jasmine is deeply woven into Kerala culture. Women wear jasmine garlands in their hair, and the flowers are used in religious offerings.', facts: ['Symbol of love and purity', 'Used in perfumes worldwide', 'Blooms at night', 'Sacred in Hindu rituals'], tags: ['Cultural', 'Ornamental', 'Sacred'] },
  { name: 'Moringa', scientific: 'Moringa oleifera', emoji: '🌾', color: '#639922', family: 'Moringaceae', origin: 'South Asia', climate: 'Tropical dry', water: 'Low', sunlight: 'Full sun', soil: 'Sandy loam', toxic: false, description: 'Known as the "Miracle Tree", Moringa is packed with nutrients and used in Kerala cuisine and medicine. Drumstick pods are a staple in Kerala sambar.', facts: ['Called the Miracle Tree', 'Has 7x more vitamin C than oranges', 'Drumstick curry is a Kerala staple', 'Every part is edible or medicinal'], tags: ['Medicinal', 'Edible', 'Common'] },
  { name: 'Ginger', scientific: 'Zingiber officinale', emoji: '🫚', color: '#BA7517', family: 'Zingiberaceae', origin: 'South Asia', climate: 'Tropical humid', water: 'Regular', sunlight: 'Partial shade', soil: 'Loamy moist', toxic: false, description: 'Ginger is a staple of Kerala cuisine and Ayurvedic medicine. It grows abundantly in Kerala\'s humid climate and is used in everything from tea to curries.', facts: ['Used in Ayurveda for 5000 years', 'Kerala is a top ginger producer', 'Natural remedy for nausea', 'Anti-inflammatory properties'], tags: ['Spice', 'Medicinal', 'Edible'] },
  { name: 'Lotus', scientific: 'Nelumbo nucifera', emoji: '🪷', color: '#D4537E', family: 'Nelumbonaceae', origin: 'Asia', climate: 'Tropical', water: 'Aquatic', sunlight: 'Full sun', soil: 'Muddy aquatic', toxic: false, description: 'The sacred lotus is found in Kerala\'s many ponds, lakes and backwaters. It holds deep spiritual significance in Hinduism and Buddhism, symbolizing purity and enlightenment.', facts: ['National flower of India', 'Roots and seeds are edible', 'Rises from mud symbolizing purity', 'Flowers close at night'], tags: ['Sacred', 'Cultural', 'Ornamental'] },
  { name: 'Peepal Tree', scientific: 'Ficus religiosa', emoji: '🌳', color: '#3B6D11', family: 'Moraceae', origin: 'Indian Subcontinent', climate: 'Tropical', water: 'Moderate', sunlight: 'Full sun', soil: 'Any well-drained', toxic: false, description: 'The sacred Peepal tree is worshipped across Kerala and India. Buddha attained enlightenment under a Peepal tree. It is one of the longest living trees, sometimes over 3000 years old.', facts: ['Buddha attained enlightenment under it', 'Can live for 3000+ years', 'Releases oxygen at night', 'Sacred in Hindu and Buddhist traditions'], tags: ['Sacred', 'Cultural', 'Medicinal'] },
  { name: 'Bamboo', scientific: 'Bambusoideae', emoji: '🎋', color: '#639922', family: 'Poaceae', origin: 'Asia', climate: 'Tropical humid', water: 'Moderate', sunlight: 'Full to partial sun', soil: 'Well-drained fertile', toxic: false, description: 'Bamboo grows abundantly in Kerala\'s forests and is used extensively in construction, handicrafts and cooking. Kerala\'s tribal communities have deep knowledge of bamboo use.', facts: ['Fastest growing plant on Earth', 'Stronger than steel by weight', 'Used in tribal handicrafts', 'Some species flower only once in 120 years'], tags: ['Endemic', 'Cultural', 'Common'] },
]

function WikiImage({ name, color, emoji, className }) {
  const [imgUrl, setImgUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchImage() {
      try {
        const resp = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
          { headers: { 'Accept': 'application/json' } }
        )
        const data = await resp.json()
        if (data.thumbnail?.source) {
          setImgUrl(data.thumbnail.source)
        }
      } catch (e) {}
      finally { setLoading(false) }
    }
    fetchImage()
  }, [name])

  return (
    <div className={`wiki-img-wrap ${className || ''}`}
      style={{ background: `linear-gradient(135deg, ${color}33, ${color}55)` }}>
      {loading && <div className="wiki-img-loading"><div className="wiki-spinner" /></div>}
      {imgUrl && <img src={imgUrl} alt={name} className="wiki-img" onError={() => setImgUrl(null)} />}
      {!loading && !imgUrl && <div className="wiki-img-fallback">{emoji}</div>}
    </div>
  )
}

export default function Explore() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const allTags = ['All', 'Medicinal', 'Edible', 'Spice', 'Cultural', 'Endemic', 'Sacred', 'Ayurvedic', 'Ornamental']

  const filtered = KERALA_PLANTS.filter(p => {
    const matchTag = filter === 'All' || p.tags.includes(filter)
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.scientific.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  return (
    <div className="explore-page">
      {selected
        ? <PlantDetail plant={selected} onBack={() => setSelected(null)} />
        : <>
            <div className="explore-header">
              <h1>Explore Kerala Flora 🌴</h1>
              <p>Discover the rich plant life of God's Own Country</p>
              <input
                className="explore-search"
                placeholder="🔍 Search plants..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="filter-row">
                {allTags.map(t => (
                  <button key={t} className={`filter-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="explore-grid">
              {filtered.map((plant, i) => (
                <div key={i} className="explore-card glass" onClick={() => setSelected(plant)}
                  style={{ animationDelay: `${i * 0.06}s` }}>
                  <WikiImage name={plant.scientific} color={plant.color} emoji={plant.emoji} className="explore-card-img-wrap" />
                  <div className="explore-card-emoji-float">{plant.emoji}</div>
                  <div className="explore-card-body">
                    <div className="explore-card-name">{plant.name}</div>
                    <div className="explore-card-sci">{plant.scientific}</div>
                    <div className="explore-card-tags">
                      {plant.tags.map((t, j) => <span key={j} className="explore-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
      }
    </div>
  )
}

function PlantDetail({ plant, onBack }) {
  return (
    <div className="plant-detail fade-in">
      <button className="btn back-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Explore
      </button>
      <div className="detail-layout">
        <div className="detail-left">
          <WikiImage name={plant.scientific} color={plant.color} emoji={plant.emoji} className="detail-img-wrap-wiki" />
          <div className="detail-tags-row">
            {plant.tags.map((t, i) => <span key={i} className="explore-tag">{t}</span>)}
          </div>
        </div>
        <div className="detail-right">
          <h1 className="detail-name">{plant.name}</h1>
          <div className="detail-sci">{plant.scientific}</div>
          <p className="detail-desc">{plant.description}</p>
          <div className="detail-info-grid">
            <DetailChip label="Family" value={plant.family} />
            <DetailChip label="Origin" value={plant.origin} />
            <DetailChip label="Climate" value={plant.climate} />
            <DetailChip label="Toxic" value={plant.toxic ? '⚠️ Yes' : '✅ No'} />
          </div>
          <div className="detail-section-title">Care Guide</div>
          <div className="detail-care-row">
            <CareItem icon="💧" label="Water" value={plant.water} />
            <CareItem icon="☀️" label="Sunlight" value={plant.sunlight} />
            <CareItem icon="🪴" label="Soil" value={plant.soil} />
          </div>
          <div className="detail-section-title">Did You Know</div>
          <ul className="detail-facts">
            {plant.facts.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

function DetailChip({ label, value }) {
  return (
    <div className="detail-chip glass">
      <div className="chip-label">{label}</div>
      <div className="chip-value">{value}</div>
    </div>
  )
}

function CareItem({ icon, label, value }) {
  return (
    <div className="care-item glass">
      <div className="care-icon">{icon}</div>
      <div className="care-label">{label}</div>
      <div className="care-value">{value}</div>
    </div>
  )
}