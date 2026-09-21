

const SERVICES_DATA = {
  'inground': {
    id: 'inground',
    num: '01',
    categoryBadge: '01 • INGROUND ARCHITECTURE',
    title: 'Inground Architectural Pools',
    categoryName: 'Inground Architecture',
    subtitle: 'Seamless subterranean engineering featuring flush knife-edge perimeter overflows, concealed drainage conduits, and monolithic honed travertine terraces designed for generational stability.',
    heroImage: 'assets/pool_inground.jpg',
    metaTag: 'Laser-Leveled • ±0.02mm Weir Tolerance',
    metaOverlayTitle: 'Subterranean Hydraulics',
    metaOverlayDesc: 'Zero-turbulence dual-circuit circulation with vibration-dampened variable speed pumps.',
    specs: [
      { val: '±0.02 mm', lbl: 'Weir Level Precision' },
      { val: '3.5–11 ft', lbl: 'Dynamic Depth Range' },
      { val: 'Sub-12 dB', lbl: 'Acoustic Sound Floor' },
      { val: '25 Years', lbl: 'Structural Shell Warranty' }
    ],
    contextP1: 'Our inground architectural pools redefine conventional subterranean construction through high-tensile pneumatically placed shotcrete rated at 5,500+ PSI. By embedding concealed perimeter slot catchments directly beneath the coping stone, water reaches the exact elevation of your terrace paving, transforming your pool into a monolithic expanse of liquid glass.',
    contextP2: 'Underneath the travertine, a high-volume acoustic balancing surge tank maintains consistent hydrostatic equilibrium during both placid morning reflections and high-occupancy evening soirees. Every pipeline is insulated with acoustic elastomeric wraps to prevent pump vibration from transmitting into your residence.',
    calloutTitle: 'Zero-Settlement Geotechnical Engineering',
    calloutDesc: 'Every inground pool is mapped using deep core geotechnical analysis, engineered with structural grade beams to withstand seismic expansion and expansive clay soils.',
    blueprintTable: [
      { param: 'Shell Engineering', val: '5,500 PSI Pneumatic Shotcrete with Grade 60 Rebar' },
      { param: 'Overflow Architecture', val: 'Continuous 8mm Subterranean Slot Perimeter' },
      { param: 'Filtration Matrix', val: 'Dual Pentair Quad D.E. + Commercial UV-Ozone loop' },
      { param: 'Surge Capacity', val: '3,800-Gallon Underground Self-Balancing Reservoir' },
      { param: 'Coping & Terrace', val: '30mm Honed Roman Travertine / Flamed Basalt' },
      { param: 'Turnover Efficiency', val: '2.8 Hours full body turnover at sub-12dB acoustics' }
    ],
    blueprintCode: 'DWG-REF: AW-2026-ING-01',
    whyPillars: [
      {
        index: '01',
        title: 'Architectural Unity',
        desc: 'Zero-threshold transition between interior living rooms, covered loggias, and pool water creates unbroken spatial sightlines.'
      },
      {
        index: '02',
        title: 'Generational Longevity',
        desc: 'Engineered with double-curtain rebar and sulfate-resistant crystalline waterproofing guaranteed for a quarter-century.'
      },
      {
        index: '03',
        title: 'Whisper-Quiet Hydraulics',
        desc: 'Variable frequency commercial pumps located in subterranean soundproof bunkers keep pump noise below ambient night breezes.'
      },
      {
        index: '04',
        title: 'Mineral Therapeutic Water',
        desc: 'Advanced medical-grade ozone sanitization allows crystal purity with less chlorine than natural municipal drinking water.'
      }
    ],
    pricingTiers: [
      {
        name: 'Essential Estate',
        desc: 'Precision subterranean inground pool for refined suburban courtyards.',
        price: '$195,000+',
        duration: '8–11 Weeks',
        isFeatured: false,
        inclusions: [
          'Up to 36 ft x 16 ft Monolithic Shell',
          'Concealed perimeter slot overflow system',
          'Roman travertine coping stone & waterline tile',
          'Pentair variable-speed eco-circulation',
          'Automated salt-chlorine & LED illumination',
          '25-Year structural shell warranty'
        ]
      },
      {
        name: 'Signature Architectural',
        desc: 'Our most requested edition with bespoke spa and integrated sun shelf.',
        price: '$285,000+',
        duration: '11–14 Weeks',
        isFeatured: true,
        inclusions: [
          'Up to 50 ft x 22 ft Custom Dimension Shell',
          'Integrated 360° hydrotherapy spa sanitarium',
          'Baja shelf with submerged umbrella anchors',
          'Commercial UV + Ozone low-chemical sterilization',
          'Italian Bisazza glass mosaic perimeter inlay',
          'Smart Home Crestron/Lutron automation',
          '25-Year turnkey warranty + 3-yr white-glove service'
        ]
      },
      {
        name: 'Presidential Monolith',
        desc: 'Uncompromising engineering for multi-acre coastal and hillside estates.',
        price: '$450,000+',
        duration: '14–18 Weeks',
        isFeatured: false,
        inclusions: [
          'Custom parametric footprint exceeding 65 ft',
          'Integrated sunken cocktail bar with underwater seating',
          'Subterranean automated slatted safety cover',
          'Dual commercial titanium high-efficiency heat pumps',
          'Direct quarry-selected flamed granite paving',
          'Dedicated Project Architect & VIP Priority Scheduling'
        ]
      }
    ],
    faqs: [
      {
        q: 'How does the flush knife-edge overflow maintain water level in heavy rain?',
        a: 'The continuous perimeter slot drains directly into a subterranean surge equalization tank equipped with automated electronic optical level sensors and high-volume gravitational overflow storm bypass valves.'
      },
      {
        q: 'Can this inground pool be heated for winter swimming?',
        a: 'Yes. Every inground installation incorporates dual-source high-recovery titanium heat exchange systems capable of elevating water temperature from 50°F to 86°F in under 4 hours.'
      },
      {
        q: 'What site preparation is required before excavation?',
        a: 'AURA WATERS oversees all preliminary tasks: geotechnical borehole drilling, utility location scanning, tree root impact reports, and city engineering submissions. You do not need to coordinate third-party contractors.'
      },
      {
        q: 'How often does the subterranean surge chamber require service?',
        a: 'The chamber is equipped with self-cleaning cyclonic debris filters and automated high-pressure wash nozzles. Preventative maintenance is included in our annual atelier service program.'
      }
    ],
    ctaBadge: 'FOUNDATIONAL ARCHITECTURE',
    ctaHeadline: 'Commission Your Inground Architectural Pool',
    ctaSub: 'Connect with our Senior Architectural Director for a private on-site topographical feasibility analysis and 3D parametric masterplan.'
  },

  'above-ground': {
    id: 'above-ground',
    num: '02',
    categoryBadge: '02 • GLASS CANTILEVER',
    title: 'Above-Ground & Cantilever Pools',
    categoryName: 'Above-Ground & Cantilever',
    subtitle: 'Elevated structural installations boasting transparent structural acrylic observation panels integrated into multi-tiered Brazilian Ipe hardwood surrounds.',
    heroImage: 'assets/pool_aboveground.jpg',
    metaTag: 'Structural Acrylic • 4-Inch Optical Clarity',
    metaOverlayTitle: 'Extreme Grade Engineering',
    metaOverlayDesc: 'Post-tensioned cantilevered reinforced caissons anchored into 45-degree bedrock.',
    specs: [
      { val: '4.0 Inch', lbl: 'Optical Acrylic Glazing' },
      { val: '45° Slope', lbl: 'Seismic Grade Rating' },
      { val: '3,200 psi', lbl: 'Cantilever Tensile Yield' },
      { val: '25 Years', lbl: 'Structural Warranty' }
    ],
    contextP1: 'Engineered specifically for steep hillsides, coastal cliffs, and properties where subterranean excavation is impractical or unviable, our elevated cantilever pools transform complex topography into an architectural tour-de-force. Supported by post-tensioned reinforced caissons, the pool platform appears to hover weightlessly above natural contours.',
    contextP2: 'The signature element is our seamless structural acrylic viewing wall: a 4-inch thick, museum-grade cast acrylic panel bonded directly into a precision stainless-steel perimeter rebate. The result is an underwater aquarium effect that frames panoramic city lights or ocean horizons without visual obstruction.',
    calloutTitle: 'Hillside Caisson Anchoring',
    calloutDesc: 'Deep bedrock micropiles and seismic grade beams anchor elevated vessels, providing total safety and architectural drama on otherwise unbuildable land.',
    blueprintTable: [
      { param: 'Foundation System', val: 'Drilled Reinforced Concrete Caissons to Solid Bedrock' },
      { param: 'Observation Glazing', val: '100mm Monolithic Cast Optical Grade Acrylic' },
      { param: 'Terrace Material', val: 'FSC-Certified Brazilian Ipe / Thermal Ash Timber' },
      { param: 'Seismic Isolation', val: 'Multi-Directional Elastomeric Bearing Pads' },
      { param: 'Thermal Retention', val: 'R-14 Full-Shell Polyurethane Rigid Cavity Insulation' },
      { param: 'Equipment Integration', val: 'Sub-Deck Acoustic Vibration-Isolated Mechanical Pod' }
    ],
    blueprintCode: 'DWG-REF: AW-2026-ABV-02',
    whyPillars: [
      {
        index: '01',
        title: 'Unlock Sloped Properties',
        desc: 'Converts challenging drop-offs and hillside terrain into prime estate entertainment space that dramatically elevates property appraisal value.'
      },
      {
        index: '02',
        title: 'Visual Glass Transparency',
        desc: 'Underwater acrylic walls create a breathtaking kinetic focal point from lower garden terraces and indoor guest suites.'
      },
      {
        index: '03',
        title: 'Integrated Terrace Decks',
        desc: 'Seamless architectural cohesion with custom steel-framed Brazilian Ipe decking, flush glass balustrades, and concealed access hatches.'
      },
      {
        index: '04',
        title: 'Rapid Pre-Engineered Turnaround',
        desc: 'Pre-fabricated modular caisson systems reduce on-site structural disturbance and shorten construction timelines by up to 25%.'
      }
    ],
    pricingTiers: [
      {
        name: 'Highland Essential',
        desc: 'Elevated steel-reinforced pool for moderate slope environments.',
        price: '$245,000+',
        duration: '10–13 Weeks',
        isFeatured: false,
        inclusions: [
          'Up to 34 ft x 14 ft Elevated Reinforced Shell',
          'Concrete grade beam foundation with 4 micropiles',
          'Single 8-ft wide structural acrylic viewing window',
          'Wrap-around Brazilian Ipe hardwood sun deck',
          'Pentair IntelliTouch smart circulation suite',
          '25-Year structural frame & shell guarantee'
        ]
      },
      {
        name: 'Cantilever Signature',
        desc: 'Our flagship dramatic cantilever with extended glass viewing wall.',
        price: '$365,000+',
        duration: '13–16 Weeks',
        isFeatured: true,
        inclusions: [
          'Up to 48 ft x 18 ft Suspended Cantilever Shell',
          'Up to 14-ft cantilever projection over sloped terrain',
          '16-ft seamless 4-inch acrylic observation wall',
          'Multi-level architectural timber & stone terracing',
          'Integrated spillover spa with frameless glass edge',
          'Automated RGBW fiber-optic underwater accent lighting',
          'Comprehensive geotechnical & civil engineering filings'
        ]
      },
      {
        name: 'Cliffside Sovereign',
        desc: 'Extreme-grade structural masterpiece for high-altitude bluffs.',
        price: '$580,000+',
        duration: '16–22 Weeks',
        isFeatured: false,
        inclusions: [
          'Full-perimeter structural glass aquarium surround',
          'Deep drilled rock socket caissons up to 35 ft depth',
          'Suspended steel skydeck with glass balustrade system',
          'Sub-deck luxury pool house and mechanical suite',
          'Whisper titanium heating and chiller climate system',
          'VIP Master Pools Guild Project Director on site'
        ]
      }
    ],
    faqs: [
      {
        q: 'Will the acrylic panel scratch or yellow over time?',
        a: 'Never. We utilize UV-stabilized polymethyl methacrylate (PMMA) cast acrylic engineered for public aquariums. It includes a 30-year non-yellowing optical clarity guarantee and can be buffed underwater to remove surface micro-scuffs.'
      },
      {
        q: 'How does an elevated pool handle earthquakes or seismic shock?',
        a: 'The vessel sits on heavy-duty elastomeric seismic isolation dampers and drilled concrete caissons tied directly into bedrock, engineered to absorb multi-axis seismic loads without stress fractures.'
      },
      {
        q: 'Can the Brazilian Ipe deck withstand harsh direct sun and chlorine?',
        a: 'Yes. Brazilian Ipe has an extreme Janka hardness rating of 3,680 and natural rot resistance. We treat it with marine UV penetrative sealants and install stainless steel concealed fasteners.'
      },
      {
        q: 'Are permits more complex for elevated cantilever pools?',
        a: 'Yes, but our civil engineering team handles the complete submission: soils core analysis, 3D finite element stress analysis, and municipal coastal commission hearings.'
      }
    ],
    ctaBadge: 'ELEVATED ARCHITECTURE',
    ctaHeadline: 'Commission Your Cantilever Glass Pool',
    ctaSub: 'Harness the full dramatic potential of your hillside property with an engineered structural masterpiece.'
  },

  'custom': {
    id: 'custom',
    num: '03',
    categoryBadge: '03 • SCULPTURAL FORM',
    title: 'Custom Sculptural Pools',
    categoryName: 'Custom Sculptural',
    subtitle: 'One-of-a-kind aquatic masterworks featuring organic parametric curves, sunken cocktail bars, elevated spillover hydrotherapy spas, and automated gas fire features.',
    heroImage: 'assets/pool_custom.jpg',
    metaTag: 'Parametric Geometry • Hand-Carved Shotcrete',
    metaOverlayTitle: 'Organic Fluidity',
    metaOverlayDesc: 'Dual-zoned hydrotherapy spa with submerged swim-up wet bar and automated fire bowls.',
    specs: [
      { val: 'Unlimited', lbl: 'Parametric Geometry' },
      { val: '360° Spill', lbl: 'Hydrotherapy Spa' },
      { val: '180,000 BTU', lbl: 'Gas Fire Calderas' },
      { val: '25 Years', lbl: 'Turnkey Shell Warranty' }
    ],
    contextP1: 'Free from rectilinear constraints, our custom sculptural pools are conceived as monumental outdoor art installations. Every curve is parametrically modeled in computational 3D software to harmonize with the architectural language of your estate and the natural sightlines of the surrounding landscape.',
    contextP2: 'These masterworks effortlessly combine social celebration with secluded wellness: integrated submerged swim-up bar stools carved from solid travertine, cantilevered Baja tanning shelves, elevated circular spillover spas, and automated gas fire bowls that ignite along the water’s edge at twilight with a single touch.',
    calloutTitle: 'Handcrafted Sculptural Rebar Armatures',
    calloutDesc: 'Master steel artisans hand-bend complex three-dimensional rebar cages on site, ensuring absolute organic flow and structural equilibrium before dense pneumatic application.',
    blueprintTable: [
      { param: 'Armature Design', val: 'Parametrically Bent Grade 60 Dual-Curtain Steel' },
      { param: 'Interior Surface', val: 'Pebble Radiance Blend with Genuine Mother of Pearl' },
      { param: 'Integrated Amenities', val: 'Swim-Up Wet Bar + 8-Seat Flush Spa Sanitarium' },
      { param: 'Fire Integration', val: 'Electronic Automated Stainless Gas Burners (250 PSI)' },
      { param: 'Automation Suite', val: 'Crestron / Savant Full Pool & Lighting Matrix' },
      { param: 'Water Heating', val: 'Triple Titanium High-Recovery Whisper Heat Pumps' }
    ],
    blueprintCode: 'DWG-REF: AW-2026-CUS-03',
    whyPillars: [
      {
        index: '01',
        title: 'Unrivaled Individuality',
        desc: 'No two sculptural pools are ever duplicated. Your commission is an exclusive architectural copyright tailored exclusively to your estate.'
      },
      {
        index: '02',
        title: 'Integrated Social Venues',
        desc: 'Submerged swim-up stone bar stools, recessed champagne buckets, and shallow Baja solariums create the ultimate luxury resort atmosphere.'
      },
      {
        index: '03',
        title: 'Elemental Fire & Water',
        desc: 'Automated gas fire bowls and linear flame trenches cast hypnotic golden reflections across mirror-still night waters.'
      },
      {
        index: '04',
        title: 'Complete Sensory Hydrotherapy',
        desc: 'Custom-positioned reflexology jets and heated ergonomic lounges soothe muscle fatigue with precision high-flow water therapy.'
      }
    ],
    pricingTiers: [
      {
        name: 'Sculptural Oasis',
        desc: 'Organic freeform pool with integrated elevated spillover spa.',
        price: '$275,000+',
        duration: '10–13 Weeks',
        isFeatured: false,
        inclusions: [
          'Up to 42 ft Freeform Organic Footprint',
          'Elevated 8-ft circular hydrotherapy spa',
          'Baja solarium lounge with bubbler fountains',
          'Natural stone coping and Pebble Radiance plaster',
          'Smart automated controls with wireless touch panel',
          '25-Year structural shell warranty'
        ]
      },
      {
        name: 'Resort Atelier',
        desc: 'Our iconic edition featuring swim-up wet bar and automated fire calderas.',
        price: '$395,000+',
        duration: '13–17 Weeks',
        isFeatured: true,
        inclusions: [
          'Up to 58 ft Parametric Multilevel Footprint',
          'Submerged granite swim-up bar with 4 stone stools',
          'Pair of automated architectural gas fire calderas',
          'Italian iridescent Bisazza glass waterline mosaic',
          'Dual commercial UV + Ozone sanitization system',
          'Landscape integration and custom water cascades',
          '3-Year full concierge maintenance package'
        ]
      },
      {
        name: 'Curated Masterwork',
        desc: 'Monumental private lagoon estate with private island & grottos.',
        price: '$650,000+',
        duration: '18–24 Weeks',
        isFeatured: false,
        inclusions: [
          'Unrestricted footprint and custom multi-zone topography',
          'Natural stone walk-in cavern grotto and kinetic waterfall',
          'Submerged underwater acoustic concert audio system',
          'Full outdoor kitchen & poolside fire lounge integration',
          'Fiber-optic constellation floor replicating birth dates',
          'Dedicated Master Artisan Sculptor assigned to project'
        ]
      }
    ],
    faqs: [
      {
        q: 'How are the organic curves modeled and formed on site?',
        a: 'We use proprietary 3D laser GPS layout coordinates to stake the site, followed by hand-bent structural steel armatures and triple-layered pneumatic shotcrete hand-troweled by Master Pools Guild artisans.'
      },
      {
        q: 'Can the swim-up bar have electrical outlets and beer taps?',
        a: 'Yes. We engineer code-compliant dry service conduits underneath the pool floor to supply refrigerated draft towers, glass rinsers, and USB power ports securely isolated from water.'
      },
      {
        q: 'Are the fire bowls automated or manually lit?',
        a: 'All our fire systems are equipped with 12V electronic hot-surface ignitions with flame-sensing safety thermocouples. You can ignite or extinguish flames via your smartphone or wall keypads.'
      },
      {
        q: 'What plaster finish gives the water that Caribbean sapphire hue?',
        a: 'We blend micro-pebbles with genuine imported abalone shells and French cobalt crystals to refract sunlight into luminous deep aqua tones.'
      }
    ],
    ctaBadge: 'SCULPTURAL LUXURY',
    ctaHeadline: 'Commission Your Custom Sculptural Pool',
    ctaSub: 'Collaborate with our design ateliers to sculpt a bespoke aquatic masterpiece that reflects your personal aesthetic identity.'
  },

  'infinity': {
    id: 'infinity',
    num: '04',
    categoryBadge: '04 • INFINITY HORIZON',
    title: 'Vanishing Infinity Edge Pools',
    categoryName: 'Infinity Cantilever',
    subtitle: 'Precision-engineered vanishing horizons that visually merge with oceans, horizons, and dramatic valley views via hydrodynamic acoustic catch basins.',
    heroImage: 'assets/hero_infinity.jpg',
    metaTag: 'Sub-10dB Drop • ±0.01mm Weir Crest',
    metaOverlayTitle: 'The Vanishing Crest',
    metaOverlayDesc: 'Hydrodynamic surge balancing reservoir prevents water level fluctuations even in coastal winds.',
    specs: [
      { val: 'Up to 85 ft', lbl: 'Single Weir Crest' },
      { val: '±0.01 mm', lbl: 'Laser Tolerance' },
      { val: 'Sub-10 dB', lbl: 'Acoustic Spill' },
      { val: '25 Years', lbl: 'Structural Shell Warranty' }
    ],
    contextP1: 'A vanishing infinity edge represents the pinnacle of aquatic geometry. By precisely leveling the rear weir wall to within hundredths of a millimeter, water flows over the edge in an unbroken laminar film, creating the optical illusion that your pool spills directly into the sea or sky.',
    contextP2: 'The invisible secret to a whisper-quiet infinity edge is our proprietary acoustic catch basin. Rather than allowing water to splash noisily into a concrete trough, our parabolic curved walls guide the overflow into a submerged collection basin lined with sound-dampening acoustic baffles, ensuring total tranquility.',
    calloutTitle: 'Laser-Guided Hydraulic Calibration',
    calloutDesc: 'We utilize computerized digital levels and variable-frequency overflow pumps to calibrate the water crest, allowing you to fine-tune spill thickness from a gentle sheet to a dramatic cascade.',
    blueprintTable: [
      { param: 'Weir Wall Tolerance', val: 'Digital Laser Leveling to ±0.01 mm True Level' },
      { param: 'Catch Basin Trough', val: 'Parabolic Hydro-Acoustic Catchment Chamber' },
      { param: 'Balancing Reservoir', val: '4,500-Gallon Underground Thermal Buffer Tank' },
      { param: 'Water-Spill Acoustics', val: 'Sub-10dB Whisper Laminar Flow Technology' },
      { param: 'Weir Cladding', val: 'Honed Jet Mist Granite / Bookmatched Porcelain' },
      { param: 'Wind Compensation', val: 'Automated Anemometer Variable-Flow Pump Modulation' }
    ],
    blueprintCode: 'DWG-REF: AW-2026-INF-04',
    whyPillars: [
      {
        index: '01',
        title: 'The Ultimate Horizon View',
        desc: 'Eliminates all visual boundaries between your terrace and the panoramic ocean or canyon vista beyond.'
      },
      {
        index: '02',
        title: 'Acoustic Serenity',
        desc: 'Engineered hydro-baffles ensure the sound of falling water remains soothing and whisper-quiet without mechanical noise.'
      },
      {
        index: '03',
        title: 'Wind-Proof Hydrodynamics',
        desc: 'Integrated wind sensors automatically modulate overflow pumps during gusty conditions to eliminate evaporative splash loss.'
      },
      {
        index: '04',
        title: 'Dual Architectural Facade',
        desc: 'The exterior weir wall acts as a stunning waterfall and stone feature when viewed from lower gardens and terraced lawns.'
      }
    ],
    pricingTiers: [
      {
        name: 'Horizon Sovereign',
        desc: 'Single-side vanishing edge pool for coastal and valley view properties.',
        price: '$295,000+',
        duration: '11–14 Weeks',
        isFeatured: false,
        inclusions: [
          'Up to 40 ft Vanishing Weir Crest Wall',
          'Concealed parabolic acoustic catchment trough',
          '3,000-gallon subterranean surge storage chamber',
          'Pentair variable-speed balance pump automation',
          'Honed basalt or granite weir coping tile',
          '25-Year structural concrete shell guarantee'
        ]
      },
      {
        name: 'Pacific Cantilever',
        desc: 'Our signature edition featuring extended multi-sided vanishing weirs.',
        price: '$420,000+',
        duration: '14–18 Weeks',
        isFeatured: true,
        inclusions: [
          'Up to 65 ft Multi-Sided Infinity Horizon Crest',
          'Integrated zero-edge perimeter spa with separate weir',
          'Automated wind-speed surge modulation technology',
          'Italian Bisazza glass mosaic weir wall cladding',
          'Commercial titanium dual-loop heating & cooling',
          'Smart Home Crestron integration with remote monitoring',
          '3-Year full concierge chemical & equipment maintenance'
        ]
      },
      {
        name: 'Olympus Infinity Estate',
        desc: 'Monumental 360° infinity cantilever hovering over extreme terrain.',
        price: '$680,000+',
        duration: '18–26 Weeks',
        isFeatured: false,
        inclusions: [
          'Continuous 80+ ft curved or multi-tiered infinity crests',
          'Suspended cantilevered structural concrete support piles',
          'Submerged underwater observation portals beneath the weir',
          'Automated hydraulic thermal vanishing covers',
          'Private quarry-selected bookmatched stone cladding',
          'Dedicated Master Pools Guild Principal supervision'
        ]
      }
    ],
    faqs: [
      {
        q: 'Does wind blow water off the infinity edge during storms?',
        a: 'We install automated digital anemometers that measure wind speed in real time. If gusts exceed set thresholds, the system dials back variable-speed pumps to maintain a thinner, stable sheet with zero blowoff.'
      },
      {
        q: 'How much water does an infinity pool lose to evaporation?',
        a: 'Because our catch basins are fully shaded and enclosed with subterranean surge tanks, evaporative losses are comparable to standard pools and fully compensated by automated electronic auto-fill valves.'
      },
      {
        q: 'Can the weir wall be cladded with glass or natural stone?',
        a: 'Yes. We commonly clad the exterior vertical weir in honed Zimbabwe black granite, Italian Bisazza iridescent glass mosaic, or monolithic slabs of flamed quartzite.'
      },
      {
        q: 'How does water get pumped back up from the lower basin?',
        a: 'A dedicated low-RPM, high-efficiency commercial variable-speed pump draws water from the subterranean surge reservoir through cyclonic filters and returns it smoothly to the main pool.'
      }
    ],
    ctaBadge: 'HORIZON ARCHITECTURE',
    ctaHeadline: 'Commission Your Vanishing Infinity Pool',
    ctaSub: 'Transform your estate’s horizon into an extraordinary living canvas with a laser-calibrated vanishing edge masterwork.'
  },

  'knife-edge': {
    id: 'knife-edge',
    num: '05',
    categoryBadge: '05 • SLOT PERIMETER',
    title: 'Knife-Edge 360° Perimeter Pools',
    categoryName: 'Slot Perimeter',
    subtitle: 'The water surface sits precisely flush with adjacent limestone terrace paving, spilling seamlessly into a razor-thin 8mm hidden slot perimeter like a liquid glass mirror.',
    heroImage: 'assets/gallery_knife_edge.jpg',
    metaTag: '8mm Slot Drain • 99.4% Flat Optical Mirror',
    metaOverlayTitle: 'Liquid Glass Mirror',
    metaOverlayDesc: 'Zero visible coping slope creates absolute stillness and uninterrupted reflections.',
    specs: [
      { val: '8 mm', lbl: 'Slot Width' },
      { val: '99.4%', lbl: 'Flat Optical Index' },
      { val: '360°', lbl: 'Continuous Perimeter' },
      { val: '25 Years', lbl: 'Hydraulics Guarantee' }
    ],
    contextP1: 'Regarded as the most demanding discipline in modern aquatic engineering, a 360-degree knife-edge pool elevates water to the exact level of the surrounding patio pavers. Water quietly vanishes into a hidden 8mm slot drain concealed beneath the edge of the stone terrace, leaving no visible gutter, slope, or coping lip.',
    contextP2: 'The result is a surface of breathtaking stillness that behaves like a dark obsidian mirror, reflecting clouds, architectural pavilions, and evening stars. Because water spills continuously around all four sides, surface debris is swept away instantly, preserving pristine crystal purity at all times.',
    calloutTitle: 'Zero-Tolerance Slot Fabrication',
    calloutDesc: 'Every coping slab is waterjet-machined to exacting 1mm tolerances and mounted on stainless-steel leveling jacks to maintain a perfectly uniform 8mm slot drain around the entire perimeter.',
    blueprintTable: [
      { param: 'Slot Dimension', val: '8mm Precision Concealed Slot with Removable Cleanouts' },
      { param: 'Under-Slot Gutter', val: '316L Stainless Steel Dual-Sealed Catchment Channel' },
      { param: 'Leveling Assembly', val: 'Micrometric Stainless Coping Jack Screws' },
      { param: 'Surface Stillness', val: 'Laminar Floor Inlets with Hydro-Acoustic Dampening' },
      { param: 'Terrace Material', val: 'Direct-Imported Roman Navona Travertine / Pietra Serena' },
      { param: 'Surface Debris Clearing', val: '100% Perimeter Skimming within 90 Seconds' }
    ],
    blueprintCode: 'DWG-REF: AW-2026-KNF-05',
    whyPillars: [
      {
        index: '01',
        title: 'Perfect Architectural Mirror',
        desc: 'The flush water plane acts as a flawless reflecting pool that multiplies the architectural geometry of your residence.'
      },
      {
        index: '02',
        title: 'Zero Visible Coping Lip',
        desc: 'Eliminates traditional raised pool edges for an uninterrupted, flush transition between stone terrace and water.'
      },
      {
        index: '03',
        title: 'Instant 360° Surface Skimming',
        desc: 'Because leaves and pollen are caught on all four sides simultaneously, the pool surface remains spotless without manual netting.'
      },
      {
        index: '04',
        title: 'Ultra-Modern Minimalist Ethos',
        desc: 'The purest visual expression of water in contemporary architecture, favored by world-renowned minimalist architects.'
      }
    ],
    pricingTiers: [
      {
        name: 'Reflecting Minimalist',
        desc: 'Flush knife-edge pool for contemporary courtyard residences.',
        price: '$310,000+',
        duration: '12–15 Weeks',
        isFeatured: false,
        inclusions: [
          'Up to 38 ft x 16 ft Monolithic Shell',
          '360° Concealed 8mm slot perimeter system',
          'Waterjet-cut honed travertine terrace slabs',
          'Underground acoustic surge compensation reservoir',
          'Automated electronic optical level controller',
          '25-Year structural shell warranty'
        ]
      },
      {
        name: 'Monolithic Mirror Signature',
        desc: 'Our premier knife-edge installation with flush integrated spa.',
        price: '$440,000+',
        duration: '15–19 Weeks',
        isFeatured: true,
        inclusions: [
          'Up to 52 ft x 20 ft Full-Perimeter Knife Edge Shell',
          'Flush knife-edge hydrotherapy spa with concealed weir',
          '316L Marine stainless steel leveling jack framework',
          'Italian Bisazza dark glass mosaic mirror floor',
          'Medical-grade Ozone + UV secondary disinfection',
          'Smartphone Crestron/Savant automation system',
          '3-Year full atelier maintenance and chemical service'
        ]
      },
      {
        name: 'Atelier Obsidian Estate',
        desc: 'Unprecedented liquid glass mirror spanning multi-terraced grounds.',
        price: '$710,000+',
        duration: '20–28 Weeks',
        isFeatured: false,
        inclusions: [
          'Monumental 65+ ft footprint with multi-level reflecting pools',
          'Submerged automated walk-on hydraulic glass covers',
          'Custom bookmatched granite coping with integral slot lighting',
          'Dual commercial titanium heat-pump heating and chillers',
          'Subterranean walk-in mechanical gallery with museum lighting',
          'Direct personal supervision by Chief Technical Principal'
        ]
      }
    ],
    faqs: [
      {
        q: 'How do you clean leaves or debris out of the 8mm slot?',
        a: 'The slot is positioned directly over a removable 316L stainless-steel catch channel equipped with high-pressure automated flush ports and discreet removable stone access lids every 15 feet.'
      },
      {
        q: 'Can bathers walk on the stone right up to the edge safely?',
        a: 'Yes. The coping stone is engineered with micro-etched non-slip textures (ANSI DCOF > 0.65), providing reliable grip even when wet without compromising the honed aesthetic.'
      },
      {
        q: 'What happens when multiple people jump into the pool at once?',
        a: 'Displaced water spills into the slot channel and flows by gravity into our high-capacity subterranean surge tank. The water level returns to flush perfection within 45 seconds.'
      },
      {
        q: 'Does a knife-edge pool cost more than an infinity pool?',
        a: 'Knife-edge pools require slot channel fabrication and micrometric leveling around all four sides rather than one, making the hydraulic engineering more exacting, but delivering incomparable stillness.'
      }
    ],
    ctaBadge: 'MINIMALIST PRECISION',
    ctaHeadline: 'Commission Your Knife-Edge Mirror Pool',
    ctaSub: 'Experience the purest fusion of architecture and water with an 8mm slot perimeter engineering marvel.'
  },

  'fire-lounge': {
    id: 'fire-lounge',
    num: '06',
    categoryBadge: '06 • FIRE & WATER',
    title: 'Sunken Fire Calderas & Lounges',
    categoryName: 'Sunken Fire & Water',
    subtitle: 'An immersive sunken dry lounge enveloped entirely by pool waters, equipped with radiant gas firepits, submerged acrylic glazing, and discreet acoustic soundscapes.',
    heroImage: 'assets/gallery_fire_lounge.jpg',
    metaTag: 'Submerged Dry Lounge • 180,000 BTU Burners',
    metaOverlayTitle: 'Elemental Caldera',
    metaOverlayDesc: 'Dual-barrier marine subterranean waterproofing with gravity sump safety systems.',
    specs: [
      { val: '12–16 Seats', lbl: 'Lounge Capacity' },
      { val: '180k BTU', lbl: 'Automated Gas Burner' },
      { val: '3-Layer', lbl: 'Marine Waterproofing' },
      { val: '25 Years', lbl: 'Structure & Shell' }
    ],
    contextP1: 'Our sunken fire calderas create an unforgettable sensory sanctuary where guests descend below water level into an intimate dry lounge encircled entirely by shimmering water. Looking outward, the pool’s surface sits precisely at eye level, offering an immersive aquatic perspective previously found only on superyachts.',
    contextP2: 'At the heart of the caldera rests a custom-fabricated gas fire feature delivering up to 180,000 BTU of radiant warmth, framed by weather-resistant custom upholstery, flush stone cocktail tables, and integrated outdoor sound systems. Multi-layer elastomeric waterproofing and automated sump backups ensure bone-dry security under all circumstances.',
    calloutTitle: 'Redundant Marine Waterproofing',
    calloutDesc: 'Constructed like a submarine hull with crystalline waterproofing concrete additives, external bituminous membranes, and dual automated sump ejector pumps with battery backups.',
    blueprintTable: [
      { param: 'Hull Construction', val: 'Cast-in-Place Shotcrete with Crystalline Xypex Additive' },
      { param: 'Exterior Membrane', val: 'Double-Layer Polyurea Elastomeric Cold-Applied Coating' },
      { param: 'Fire Mechanism', val: 'Electronic Ignition Stainless Steel Crossfire Burner' },
      { param: 'Drainage Matrix', val: 'Dual Sub-Floor Gravity Drains + Automated Sump Pumps' },
      { param: 'Seating Upholstery', val: 'Quick-Dry Marine Core with Sunbrella Haute Couture Fabrics' },
      { param: 'Acoustics & Lighting', val: 'Bespoke Sub-Bench Sonance Audio & Step LED Wash' }
    ],
    blueprintCode: 'DWG-REF: AW-2026-CAL-06',
    whyPillars: [
      {
        index: '01',
        title: 'Eye-Level Water Perspective',
        desc: 'Sitting below the pool surface allows you and your guests to experience water from a magical, intimate viewpoint.'
      },
      {
        index: '02',
        title: 'Year-Round Twilight Entertaining',
        desc: 'High-output radiant gas flames provide cozy thermal warmth for late-night conversations in autumn and winter.'
      },
      {
        index: '03',
        title: 'Architectural Centerpiece',
        desc: 'Serves as an extraordinary visual anchor in the evening, illuminating the center of the pool with hypnotic golden flames.'
      },
      {
        index: '04',
        title: 'Triple-Safety Engineering',
        desc: 'Equipped with dual sump pumps, emergency backup power, and optical rain sensors to guarantee dry luxury.'
      }
    ],
    pricingTiers: [
      {
        name: 'Caldera Essential',
        desc: 'Submerged fire pit integrated into new or existing luxury pool footprint.',
        price: '$285,000+',
        duration: '11–14 Weeks',
        isFeatured: false,
        inclusions: [
          '6-to-8 Person Sunken Dry Lounge Shell',
          '120,000 BTU Stainless automated gas burner',
          'Double-barrier crystalline marine waterproofing',
          'Travertine cantilever access steps and coping',
          'Dual automated safety sump pump system',
          '25-Year structural concrete shell warranty'
        ]
      },
      {
        name: 'The Sunken Sanctuary',
        desc: 'Our signature full-immersion caldera with wrap-around seating & audio.',
        price: '$410,000+',
        duration: '14–18 Weeks',
        isFeatured: true,
        inclusions: [
          '12-to-16 Person Architectural Sunken Lounge',
          '180,000 BTU Crossfire brass burner with lava stone / glass',
          'Full-perimeter flush acrylic pool viewing windows',
          'Custom marine upholstery with quick-dry reticulated foam',
          'Sub-bench marine audio system with subwoofer',
          'Smartphone fire ignition and dimmable step lighting',
          '3-Year concierge maintenance and winterization coverage'
        ]
      },
      {
        name: 'The Sovereign Archipelago',
        desc: 'Monumental private island caldera with underwater glass walk-through tunnel.',
        price: '$660,000+',
        duration: '18–26 Weeks',
        isFeatured: false,
        inclusions: [
          'Island fire caldera accessible via sunken stepping stones',
          'Submerged underwater glass viewing walls on all 4 sides',
          'Integrated cocktail wet bar with refrigerated wine cellar',
          'Automated retracting weather canopy for rainy evenings',
          'Dedicated Master Pools Guild Engineering Project Lead'
        ]
      }
    ],
    faqs: [
      {
        q: 'What prevents pool water from overflowing into the sunken lounge?',
        a: 'The lounge walls feature a raised splash coping combined with an outer continuous perimeter gutter that catches surface chop. In the event of heavy rainfall, dual high-volume sub-floor sump pumps evacuate moisture instantly.'
      },
      {
        q: 'What happens during a power failure when it rains?',
        a: 'All our sunken calderas include a commercial uninterrupted battery backup system (UPS) that powers the dual sump pumps for up to 72 hours continuously.'
      },
      {
        q: 'Can the fire pit be converted between propane and natural gas?',
        a: 'Yes. We engineer the underground gas conduits with oversized piping capable of supporting both high-pressure natural gas lines and commercial bulk propane supplies.'
      },
      {
        q: 'Do the cushions need to be taken inside every night?',
        a: 'Our upholstery is crafted from marine-grade Sunbrella fabrics with reticulated open-cell foam that drains within minutes. Custom magnetic fitted all-weather covers are included for seasonal storage.'
      }
    ],
    ctaBadge: 'ELEMENTAL ARCHITECTURE',
    ctaHeadline: 'Commission Your Sunken Fire Caldera',
    ctaSub: 'Bring the primal magic of fire and water into your backyard with an engineered submerged social sanctuary.'
  },

  'renovation': {
    id: 'renovation',
    num: '07',
    categoryBadge: '07 • HERITAGE REVIVAL',
    title: 'Architectural Renovation & Stone',
    categoryName: 'Heritage Renovation',
    subtitle: 'Complete architectural transformation of existing pools — structural shell re-engineering, Italian mosaic resurfacing, titanium heating conversions, and stone colonnades.',
    heroImage: 'assets/project_courtyard.jpg',
    metaTag: 'Italian Travertine • +48% Heat Recovery',
    metaOverlayTitle: 'Architectural Re-Engineering',
    metaOverlayDesc: 'Transform outdated gunite pools into zero-edge modern estate centerpieces.',
    specs: [
      { val: '+48%', lbl: 'Thermal Energy Recovery' },
      { val: 'Quarry-Direct', lbl: 'Roman Travertine' },
      { val: 'Zero-VOC', lbl: 'Crystalline Waterproofing' },
      { val: '20 Years', lbl: 'Surface & Shell Warranty' }
    ],
    contextP1: 'Many historic estates feature dated, energy-inefficient gunite pools with failing plaster and noisy hydraulic equipment. Our architectural renovation atelier strips outdated shells down to sound structural concrete, expands or reshapes geometry, and re-engineers the hydraulic network to meet modern ultra-luxury standards.',
    contextP2: 'We replace deteriorating copings with monolithic slabs of direct-imported Roman travertine, install whisper-quiet variable speed pumps, and resurface shells in French river pebble or hand-laid Bisazza glass mosaics. The finished commission looks and functions like a brand-new multi-million-dollar architectural build.',
    calloutTitle: 'Non-Destructive Shell Diagnostics',
    calloutDesc: 'We perform ground-penetrating radar (GPR) scans and ultrasonic shell thickness tests before construction to verify structural integrity and identify underground voids.',
    blueprintTable: [
      { param: 'Shell Re-Engineering', val: 'Ultrasonic GPR Scan + High-Yield Shotcrete Doweling' },
      { param: 'Hydraulic Modernization', val: 'Conversion to Variable Speed Pentair IntelliFlo Matrix' },
      { param: 'Waterproofing Underlayment', val: 'Polymer-Modified Crystalline Waterproof Slurry' },
      { param: 'Finish Transformation', val: 'Italian Bisazza Glass Mosaic / River Pebble PebbleSheen' },
      { param: 'Energy Efficiency', val: 'Full Titanium Heat Pump Retrofit (+48% Energy Savings)' },
      { param: 'Automation Upgrade', val: 'Full Smartphone Lutron/Crestron Remote Integration' }
    ],
    blueprintCode: 'DWG-REF: AW-2026-RNV-07',
    whyPillars: [
      {
        index: '01',
        title: 'Preserve Existing Permits',
        desc: 'Renovating within an existing footprint avoids lengthy coastal commission approvals and setback zoning restrictions.'
      },
      {
        index: '02',
        title: 'Substantial Capital Efficiency',
        desc: 'Re-engineering existing structural shotcrete shells delivers modern luxury aesthetics at 30–40% lower cost than full demolition.'
      },
      {
        index: '03',
        title: 'Drastic Energy Savings',
        desc: 'Modern whisper-quiet variable-speed pumps and titanium heat exchangers slash monthly operating costs by up to 48%.'
      },
      {
        index: '04',
        title: 'Dramatic Visual Rebirth',
        desc: 'Replaces drab 1990s coping and plaster with museum-grade travertine slabs and shimmering iridescent waterline mosaics.'
      }
    ],
    pricingTiers: [
      {
        name: 'Atelier Refacing',
        desc: 'Complete surface, coping, and waterline tile renewal.',
        price: '$145,000+',
        duration: '6–8 Weeks',
        isFeatured: false,
        inclusions: [
          'Full hydro-demolition of existing plaster finish',
          'Quarry-direct Roman travertine coping replacement',
          'Premium PebbleSheen mineral aggregate resurfacing',
          'Designer waterline porcelain or glass tile',
          'LED multicolor underwater illumination replacement',
          '15-Year finish and coping warranty'
        ]
      },
      {
        name: 'Complete Architectural Transformation',
        desc: 'Our flagship overhaul: re-shaping, adding spa/shelf, and full hydraulics.',
        price: '$260,000+',
        duration: '8–12 Weeks',
        isFeatured: true,
        inclusions: [
          'Structural shell enlargement and deep-end conversion',
          'Addition of integrated Baja tanning shelf with bubblers',
          'New raised hydrotherapy spa with stone spillover',
          'Full equipment room replacement with variable speed pumps',
          'Eco-smart titanium heat pump and Ozone/UV sanitization',
          'Smartphone Crestron/Lutron automation conversion',
          '20-Year structural and mechanical warranty'
        ]
      },
      {
        name: 'Historic Estate Renaissance',
        desc: 'Total masterplan conversion to modern flush knife-edge or infinity edge.',
        price: '$420,000+',
        duration: '12–16 Weeks',
        isFeatured: false,
        inclusions: [
          'Conversion of standard coping into flush 360° knife-edge slot',
          'Complete terrace repaving with honed Italian travertine',
          'Full-interior Bisazza hand-placed glass mosaic installation',
          'New subterranean surge tank and balancing mechanics',
          'Pool house and outdoor kitchen MEP modernization',
          'Turnkey Project Principal assigned directly on site'
        ]
      }
    ],
    faqs: [
      {
        q: 'Can an older pool really be converted to a modern knife-edge or infinity edge?',
        a: 'Yes. By saw-cutting the existing bond beam and doweling in new high-strength reinforced concrete with epoxy rebar, we can reshape the top elevation to install flush knife-edge slots or cantilever vanishing weirs.'
      },
      {
        q: 'How long does a full pool transformation take?',
        a: 'A typical surface and equipment modernization requires 6 to 8 weeks, while full structural reshaping and spa additions take 8 to 12 weeks.'
      },
      {
        q: 'Do we have to re-apply for municipal permits if we keep the shell?',
        a: 'In most municipalities, renovating within the existing pool footprint requires only minor MEP trade permits, avoiding the 4-to-6 month environmental reviews required for new excavations.'
      },
      {
        q: 'How do you test if the old concrete shell is structurally sound?',
        a: 'We conduct non-destructive ultrasonic pulse velocity tests and compressive core sampling to confirm the concrete PSI exceeds 3,500 before any structural modifications commence.'
      }
    ],
    ctaBadge: 'HERITAGE TRANSFORMATION',
    ctaHeadline: 'Modernize Your Existing Estate Pool',
    ctaSub: 'Unlock modern architectural luxury, Whisper acoustics, and radical energy efficiency from your existing pool vessel.'
  },

  'landscaping': {
    id: 'landscaping',
    num: '08',
    categoryBadge: '08 • BIOPHILIC WATERSCAPE',
    title: 'Waterscape Living & Landscaping',
    categoryName: 'Waterscape & Living',
    subtitle: 'Holistic exterior estate integration: kinetic cascades, submerged Baja solarium loungers, nightscape bioluminescent optics, and climate-native botanical plantings.',
    heroImage: 'assets/project_tropical.jpg',
    metaTag: 'Biophilic Design • Sub-Aqua Fiber Optics',
    metaOverlayTitle: 'Holistic Sanctuary',
    metaOverlayDesc: 'Seamless synergy between living pavilion, reflection lagoons, and botanical gardens.',
    specs: [
      { val: '360°', lbl: 'Biophilic Integration' },
      { val: 'Fibre-Optic', lbl: 'Starry Night Floor' },
      { val: 'Climate Native', lbl: 'Botanical Curation' },
      { val: '25 Years', lbl: 'Waterscape Warranty' }
    ],
    contextP1: 'True luxury living does not end at the pool’s edge. Our waterscape living atelier designs and builds the complete surrounding estate ecosystem: kinetic reflection ponds, cascading stone water walls, submerged Baja tanning islands, custom shade cabanas, and climate-native botanical gardens.',
    contextP2: 'At dusk, the estate transforms via low-voltage fiber-optic nightscaping. Hundreds of pin-point fiber-optic stars embedded in the pool floor illuminate to mirror astronomical constellations, while gentle warm uplights wash over specimen olive trees and stone colonnades, creating an enchanting evening resort ambiance.',
    calloutTitle: 'Total Exterior Masterplanning',
    calloutDesc: 'Our landscape architects, lighting designers, and structural engineers work as a single unified team, ensuring seamless MEP, stone, and drainage coordination across your entire grounds.',
    blueprintTable: [
      { param: 'Botanical Curation', val: 'Specimen Mediterranean Olives, Date Palms, Climate Natives' },
      { param: 'Kinetic Water Features', val: 'Low-Turbulence Cast Bronze Sheet Waterfall Weir' },
      { param: 'Nightscape Lighting', val: 'Sub-Aqua Starfield Fiber-Optics + 2700K Architectural LEDs' },
      { param: 'Terrace Paving', val: 'Large-Format Flamed Basalt with Integrated Grass Joints' },
      { param: 'Irrigation & Drainage', val: 'Smart Weather-Calibrated Sub-Surface Drip Matrix' },
      { param: 'Outdoor Living MEP', val: 'Concealed Gas, Power, and Data Conduits for Cabanas' }
    ],
    blueprintCode: 'DWG-REF: AW-2026-LND-08',
    whyPillars: [
      {
        index: '01',
        title: 'Single-Source Atelier',
        desc: 'Eliminates friction between pool builders and landscape contractors by delivering the entire exterior environment under one roof.'
      },
      {
        index: '02',
        title: 'Starry Night Celestial Floor',
        desc: 'Precision fiber optics embedded in the pool floor create a shimmering celestial reflection of the night sky.'
      },
      {
        index: '03',
        title: 'Harmonious Indoor-Outdoor Flow',
        desc: 'Unbroken transitions from interior living rooms through covered loggias to open-air water pavilions.'
      },
      {
        index: '04',
        title: 'Sustainable Botanical Palette',
        desc: 'Specimen trees and flora selected for drought tolerance and low litter, keeping pool water effortlessly pristine.'
      }
    ],
    pricingTiers: [
      {
        name: 'Courtyard Oasis',
        desc: 'Integrated pool, stone terrace, and specimen botanical landscaping.',
        price: '$290,000+',
        duration: '10–13 Weeks',
        isFeatured: false,
        inclusions: [
          'Up to 38 ft Architectural Pool with Baja Solarium',
          '1,500 sq.ft of large-format limestone or travertine terrace',
          'Specimen tree plantings and automated drip irrigation',
          'Architectural 2700K low-voltage evening lighting suite',
          'Smart system controls for pool and landscape features',
          '25-Year structural shell warranty'
        ]
      },
      {
        name: 'Resort Living Masterplan',
        desc: 'Our complete estate experience: pool, water cascades, outdoor kitchen & lounge.',
        price: '$480,000+',
        duration: '14–18 Weeks',
        isFeatured: true,
        inclusions: [
          'Up to 55 ft Multi-Level Pool with kinetic water cascade wall',
          'Fiber-optic Starry Night celestial floor with 300+ light points',
          '3,000 sq.ft custom stonework with integrated fire pit lounge',
          'Poolside luxury cabana structure with concealed audio & heaters',
          'Complete estate botanical curation and specimen flora',
          'Crestron automated scene programming (Day, Sunset, Twilight)',
          '3-Year full estate maintenance and horticultural care'
        ]
      },
      {
        name: 'Private Island Sanctuary',
        desc: 'Comprehensive multi-acre estate waterscape and exterior architecture.',
        price: '$790,000+',
        duration: '20–30 Weeks',
        isFeatured: false,
        inclusions: [
          'Interconnected swimming lagoons, reflection canals & bridges',
          'Full outdoor kitchen, swim-up bar, and sunken fire caldera',
          'Custom steel-framed cantilevered pool pavilion with glass roof',
          'Private quarry-selected boulder formations and natural waterfalls',
          'Turnkey Master Architect & Horticultural Director on site'
        ]
      }
    ],
    faqs: [
      {
        q: 'Do leaves and debris from landscape trees dirty the pool water?',
        a: 'Our horticulturalists select low-shedding specimen varieties (such as fruitless olives, pygmy date palms, and boxwoods) planted at strategic windward distances, paired with continuous perimeter skimming.'
      },
      {
        q: 'How are the fiber-optic star points installed in the pool floor?',
        a: 'Individual optical glass fibers are run through conduit manifolds prior to the plaster application. They carry pure light without heat or electrical voltage, making them 100% safe in water.'
      },
      {
        q: 'Can the irrigation system use pool overflow water?',
        a: 'Yes, with our low-chemical mineral or ozone sanitization systems, treated backwash and rainwater runoff can be diverted to subterranean irrigation cisterns for garden watering.'
      },
      {
        q: 'Who manages the permits for both pool and landscape structures?',
        a: 'AURA WATERS submits a single consolidated civil masterplan covering pool engineering, grading, drainage, retaining walls, gas lines, and electrical permits.'
      }
    ],
    ctaBadge: 'BIOPHILIC LIVING',
    ctaHeadline: 'Commission Your Waterscape Living Estate',
    ctaSub: 'Immerse your residence in total harmony with nature, water, and timeless architectural craftsmanship.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  
  const urlParams = new URLSearchParams(window.location.search);
  let activeServiceId = urlParams.get('service');

  if (!activeServiceId || !SERVICES_DATA[activeServiceId]) {
    activeServiceId = 'inground';
  }

  
  renderSwitcherTabs(activeServiceId);

  
  renderServiceContent(activeServiceId);

  
  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('service') || 'inground';
    if (SERVICES_DATA[id]) {
      renderSwitcherTabs(id);
      renderServiceContent(id);
    }
  });
});

function renderSwitcherTabs(activeId) {
  const container = document.getElementById('service-tabs-container');
  if (!container) return;

  container.innerHTML = '';

  Object.values(SERVICES_DATA).forEach(service => {
    const tab = document.createElement('a');
    tab.className = `srv-tab-pill ${service.id === activeId ? 'active' : ''}`;
    tab.href = `service detail.html?service=${service.id}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', service.id === activeId ? 'true' : 'false');
    tab.setAttribute('data-service-id', service.id);

    tab.innerHTML = `
      <span class="srv-tab-num">${service.num}</span>
      <span>${service.title}</span>
    `;

    
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      switchService(service.id);
    });

    container.appendChild(tab);
  });
}

function switchService(serviceId) {
  if (!SERVICES_DATA[serviceId]) return;

  
  const newUrl = `service detail.html?service=${serviceId}`;
  window.history.pushState({ service: serviceId }, '', newUrl);

  
  document.querySelectorAll('.srv-tab-pill').forEach(pill => {
    const isCurrent = pill.getAttribute('data-service-id') === serviceId;
    pill.classList.toggle('active', isCurrent);
    pill.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
  });

  
  renderServiceContent(serviceId);

  
  const heroSection = document.getElementById('service-hero');
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderServiceContent(serviceId) {
  const data = SERVICES_DATA[serviceId];
  if (!data) return;

  
  document.title = `${data.title} &bull; Architectural Services | AURA WATERS`;

  
  setText('bc-current-title', data.title);
  setHTML('dhero-category-badge', `<span class="eyebrow-beacon" aria-hidden="true"></span>${data.categoryBadge}`);
  setText('dhero-title', data.title);
  setText('dhero-subtitle', data.subtitle);

  
  const heroImg = document.getElementById('dhero-img');
  if (heroImg) {
    heroImg.src = data.heroImage;
    heroImg.alt = data.title;
  }
  setText('dhero-media-tag', data.metaTag);
  setText('dhero-meta-title', data.metaOverlayTitle);
  setText('dhero-meta-desc', data.metaOverlayDesc);

  
  const specsContainer = document.getElementById('dhero-specs-container');
  if (specsContainer) {
    specsContainer.innerHTML = data.specs.map(s => `
      <div class="srv-dspec-item">
        <span class="srv-dspec-val">${s.val}</span>
        <span class="srv-dspec-lbl">${s.lbl}</span>
      </div>
    `).join('');
  }

  
  setText('context-narrative-p1', data.contextP1);
  setText('context-narrative-p2', data.contextP2);
  setText('context-callout-title', data.calloutTitle);
  setText('context-callout-desc', data.calloutDesc);

  const bpTable = document.getElementById('context-blueprint-table');
  if (bpTable) {
    bpTable.innerHTML = data.blueprintTable.map(row => `
      <div class="srv-bp-row">
        <span class="srv-bp-param">${row.param}</span>
        <span class="srv-bp-val">${row.val}</span>
      </div>
    `).join('');
  }
  setText('context-bp-code', data.blueprintCode);

  
  setText('why-subtitle', `Strategic engineering advantages that make ${data.title} an enduring investment for premier residences.`);
  const whyContainer = document.getElementById('why-pillars-container');
  if (whyContainer) {
    whyContainer.innerHTML = data.whyPillars.map(p => `
      <div class="srv-why-card">
        <div class="srv-why-index">${p.index}</div>
        <h3 class="srv-why-title">${p.title}</h3>
        <p class="srv-why-desc">${p.desc}</p>
      </div>
    `).join('');
  }

  
  setText('pricing-subtitle', `Transparent, fixed-price turnkey investment tiers for ${data.title}. All proposals include complete permits, excavation, and structural warranty.`);
  const pricingContainer = document.getElementById('pricing-tiers-container');
  if (pricingContainer) {
    pricingContainer.innerHTML = data.pricingTiers.map(tier => `
      <div class="srv-ptier-card ${tier.isFeatured ? 'featured' : ''}">
        ${tier.isFeatured ? '<div class="srv-ptier-featured-ribbon">Most Commissioned</div>' : ''}
        <div class="srv-ptier-header">
          <h3 class="srv-ptier-name">${tier.name}</h3>
          <p class="srv-ptier-desc">${tier.desc}</p>
          <div class="srv-ptier-price-row">
            <span class="srv-ptier-amount">${tier.price}</span>
          </div>
          <span class="srv-ptier-duration">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
            Turnkey: ${tier.duration}
          </span>
        </div>
        <ul class="srv-ptier-list">
          ${tier.inclusions.map(inc => `<li><span class="srv-check">&#10003;</span><span>${inc}</span></li>`).join('')}
        </ul>
        <button class="btn ${tier.isFeatured ? 'btn-primary' : 'btn-secondary'} srv-ptier-btn" onclick="selectPricingTier('${data.title.replace(/'/g, "\\'")}', '${tier.name.replace(/'/g, "\\'")}', '${tier.price}')">
          <span>Select Tier &amp; Request Masterplan</span>
        </button>
      </div>
    `).join('');
  }

  
  setText('faqs-subtitle', `Detailed engineering and maintenance answers tailored specifically for ${data.title}.`);
  const faqsContainer = document.getElementById('detail-faqs-container');
  if (faqsContainer) {
    faqsContainer.innerHTML = data.faqs.map((faq, idx) => `
      <div class="faq-item">
        <button class="faq-trigger" aria-expanded="false" id="dfaq-btn-${idx}">
          <span class="faq-question">${faq.q}</span>
          <span class="faq-icon" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span>
        </button>
        <div class="faq-panel" id="dfaq-panel-${idx}">
          <p class="faq-answer">${faq.a}</p>
        </div>
      </div>
    `).join('');

    
    initDetailFaqAccordion();
  }

  
  setText('cta-badge', data.ctaBadge);
  setText('cta-headline', data.ctaHeadline);
  setText('cta-sub', data.ctaSub);
}

function initDetailFaqAccordion() {
  const faqItems = document.querySelectorAll('#detail-faqs-container .faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          const t = other.querySelector('.faq-trigger');
          const p = other.querySelector('.faq-panel');
          if (t) t.setAttribute('aria-expanded', 'false');
          if (p) p.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 32 + 'px';
      }
    });
  });
}

function triggerServiceQuote() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('service') || 'inground';
  const service = SERVICES_DATA[serviceId];

  if (typeof openQuoteModal === 'function') {
    openQuoteModal(service ? service.title : 'Architectural Commission');
  }

  
  const select = document.getElementById('quote-type');
  if (select && service) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().includes(service.title.toLowerCase()) ||
          service.title.toLowerCase().includes(select.options[i].text.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function selectPricingTier(serviceName, tierName, price) {
  if (typeof openQuoteModal === 'function') {
    openQuoteModal(`${serviceName} — ${tierName} (${price})`);
  }

  const notes = document.getElementById('quote-notes');
  if (notes) {
    notes.value = `Inquiring about ${serviceName} under the ${tierName} tier (${price}).`;
  }

  const select = document.getElementById('quote-type');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) ||
          serviceName.toLowerCase().includes(select.options[i].text.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}
